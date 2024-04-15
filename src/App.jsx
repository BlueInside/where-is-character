import { useEffect, useRef, useState } from 'react';
import './components/styles/app.css';
import Indicator from './components/Indicator';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from './components/Dropdown';
import axios from 'axios';
import CharacterMarker from './components/CharacterMarker';
import FlashMessage from './components/FlashMessage';
import Level from './components/Level';

function App() {
  const [indicators, setIndicators] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [isDropdownOpen, setIsDropdownOpen] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [guessedCharacters, setGuessedCharacters] = useState([]);
  const [serverMessage, setServerMessage] = useState('');
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`http://localhost:3000/characters`, { signal: controller.signal })

      .then((res) => {
        if (res.status >= 400) throw new Error('Server response is not ok');
        const characters = res.data.characters;
        setCharacters(characters);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('click', closeDropdown);

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  });

  function markCharacter(character) {
    // Return if character already been marked
    if (guessedCharacters.some((c) => c.name === character.name)) return;

    setGuessedCharacters((prevValues) => [
      ...prevValues,
      {
        id: character._id,
        name: character.name,
        x: markerCoordinates.x,
        y: markerCoordinates.y,
      },
    ]);
  }

  // Close dropdown if clicked outside image
  function closeDropdown(e) {
    if (e.target !== imgRef.current) {
      setIsDropdownOpen(false);
    }
  }

  function showDropdown(x, y) {
    setDropdownPosition({ x, y });
    setIsDropdownOpen(true);
  }

  function createIndicator(x, y) {
    const id = uuidv4();
    const newIndicator = { x, y, id };
    let newIndicatorsArray = [...indicators];
    newIndicatorsArray.push(newIndicator);

    setIndicators(newIndicatorsArray);
  }

  function deleteIndicator() {
    let indicatorsArray = [...indicators];
    indicatorsArray.shift(); // Remove indicator in FIFO order
    setIndicators(indicatorsArray);
  }

  function handleOnImageClick(event) {
    if (event.target) {
      const rect = event.target.getBoundingClientRect();

      // Calculate normalized coordinates relative to the image
      let x = event.clientX;
      let y = event.clientY;

      // Adjust for scroll position
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      // Coordinates relative to the image
      x = x + scrollX;
      y = y + scrollY;
      setMarkerCoordinates({ x, y });

      // Normalized Coordinates
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      const imageX = (x / rect.width).toFixed(3) * 1000;
      const imageY = (y / rect.height).toFixed(3) * 1000;
      console.log(imageX, imageY);
      // Store selected normalized coords
      setSelectedCoordinates({ x: imageX, y: imageY });

      // Makes sure dropdown doesn't fall off the screen
      const dropdownY =
        event.clientY + 300 > rect.bottom ? event.pageY - 350 : event.pageY;

      const dropdownX =
        event.clientX + 200 > rect.right ? event.pageX - 200 : event.pageX + 40;
      createIndicator(event.pageX, event.pageY); // Creates indicator where user clicked

      showDropdown(dropdownX, dropdownY);
    }
  }

  return (
    <>
      <FlashMessage
        message={serverMessage}
        setServerMessage={(message) => {
          setServerMessage(message);
        }}
      />
      <Level handleOnImageClick={handleOnImageClick} imgRef={imgRef} />
      {isDropdownOpen && (
        <Dropdown
          x={dropdownPosition.x}
          y={dropdownPosition.y}
          selectedCoordinates={selectedCoordinates}
          characters={characters}
          markCharacter={(character) => {
            markCharacter(character);
          }}
          setServerMessage={(message) => {
            setServerMessage(message);
          }}
        />
      )}
      {guessedCharacters.map((character) => (
        <CharacterMarker key={character.id} x={character.x} y={character.y} />
      ))}
      {indicators.map((indicator) => (
        <Indicator
          key={indicator.id}
          x={indicator.x}
          y={indicator.y}
          deleteIndicator={() => {
            deleteIndicator(indicator.id);
          }}
        />
      ))}
    </>
  );
}

export default App;
