import PropTypes from 'prop-types';
import './styles/dropdown.css';
import axios from 'axios';
export default function Dropdown({ x, y, characters, selectedCoordinates }) {
  const style = {
    position: `absolute`,
    left: `${x}px`,
    top: `${y}px`,
  };

  function handleCharacterSelection(selectedCharacter) {
    const { x, y } = selectedCoordinates;

    axios
      .post(
        'http://localhost:3000/validate',
        {
          name: selectedCharacter.name,
          xCoordinate: x,
          yCoordinate: y,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        const message = res.data.message.replace('_', ' ');
        console.log(message);
      })

      .catch((error) => {
        console.error(error.response.data.error);
      });
  }

  return (
    <div style={style} className="dropdown">
      {characters &&
        characters.map((character) => (
          <p
            className="dropdown-item"
            key={character._id}
            onClick={() => {
              handleCharacterSelection(character);
            }}
          >
            <img className="dropdown-icon" src={character.image} />
            {character.name.replace('_', ' ')}
          </p>
        ))}
    </div>
  );
}

Dropdown.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  characters: PropTypes.arrayOf(PropTypes.object),
  selectedCoordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};
