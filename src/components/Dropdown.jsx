import PropTypes from 'prop-types';
import './styles/dropdown.css';
export default function Dropdown({ x, y, characters }) {
  const style = {
    position: `absolute`,
    left: `${x}px`,
    top: `${y}px`,
  };

  return (
    <div style={style} className="dropdown">
      {characters &&
        characters.map((character) => (
          <p className="dropdown-item" key={character._id}>
            <img className="dropdown-icon" src={character.image} />
            {character.name}
          </p>
        ))}
    </div>
  );
}

Dropdown.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  characters: PropTypes.arrayOf(PropTypes.object),
};
