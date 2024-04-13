import { useState } from 'react';
import './components/styles/app.css';
import Indicator from './components/Indicator';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [indicators, setIndicators] = useState([]);

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

      createIndicator(event.pageX, event.pageY);
    }
  }

  return (
    <>
      <div className="image-container">
        <img
          onClick={handleOnImageClick}
          className="image"
          src="https://i.imgur.com/qnHGiJ8.jpeg"
        />
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
