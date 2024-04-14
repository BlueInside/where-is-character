import { useEffect, useRef, useState } from 'react';
import './components/styles/app.css';
import Indicator from './components/Indicator';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from './components/Dropdown';

function App() {
  const [indicators, setIndicators] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [isDropdownOpen, setIsDropdownOpen] = useState([]);
  const imgRef = useRef(null);

  // Close dropdown if clicked outside image
  function closeDropdown(e) {
    if (e.target !== imgRef.current) {
      setIsDropdownOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', closeDropdown);

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  });

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
      // const x = event.clientX - rect.left;
      // const y = event.clientY - rect.top;

      console.log(event.clientX + 50 > rect.right, rect.right);
      // Makes sure it doesn't fall off the screen
      const dropdownY =
        event.clientY + 140 > rect.bottom ? event.pageY - 150 : event.pageY;

      const dropdownX =
        event.clientX + 140 > rect.right ? event.pageX - 100 : event.pageX + 40;
      createIndicator(event.pageX, event.pageY);
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
          <Dropdown x={dropdownPosition.x} y={dropdownPosition.y} />
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
