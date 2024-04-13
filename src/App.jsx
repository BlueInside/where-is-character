import { useRef } from 'react';
import './components/styles/app.css';

function App() {
  const imageRef = useRef(null);

  function handleOnImageClick(event) {
    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log('X coordinate relative to the image:', x);
    console.log('Y coordinate relative to the image:', y);
  }

  return (
    <>
      <div className="image-container">
        <img
          onClick={handleOnImageClick}
          ref={imageRef}
          className="image"
          src="https://i.imgur.com/qnHGiJ8.jpeg"
        />
      </div>
    </>
  );
}

export default App;
