import PropTypes from 'prop-types';
import './styles/characterMarker.css';
export default function CharacterMarker({ x, y }) {
  const style = {
    left: `${x - 15}px`,
    top: `${y - 25}px`,
  };

  return <div style={style} className="character-marker"></div>;
}

CharacterMarker.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
