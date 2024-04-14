import { useEffect, useRef, useState } from 'react';
import './components/styles/app.css';
import Indicator from './components/Indicator';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from './components/Dropdown';
import axios from 'axios';

function App() {
  const [indicators, setIndicators] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [isDropdownOpen, setIsDropdownOpen] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
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
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Store selected coords relative to image in state variable
      setSelectedCoordinates({ x, y });

      // Makes sure dropdown doesn't fall off the screen
      const dropdownY =
        event.clientY + 300 > rect.bottom ? event.pageY - 350 : event.pageY;

      const dropdownX =
        event.clientX + 200 > rect.right ? event.pageX - 200 : event.pageX + 40;
      createIndicator(event.pageX, event.pageY);
      console.log('X/Y', x, y);
      showDropdown(dropdownX, dropdownY);
    }
  }

  return (
    <>
      <div className="image-container">
        <img
          onClick={handleOnImageClick}
          className="image"
          ref={imgRef}
          src="https://i.imgur.com/qnHGiJ8.jpeg"
        />
        {isDropdownOpen && (
          <Dropdown
            x={dropdownPosition.x}
            y={dropdownPosition.y}
            selectedCoordinates={selectedCoordinates}
            characters={characters}
          />
        )}
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
      </div>
    </>
  );
}

export default App;
