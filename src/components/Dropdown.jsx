import PropTypes from 'prop-types';
import './styles/dropdown.css';
export default function Dropdown({ x, y }) {
  const style = {
    position: `absolute`,
    left: `${x}px`,
    top: `${y}px`,
  };

  return (
    <div style={style} className="dropdown">
      <p>Character 1</p>
      <p>Character 2</p>
      <p>Character 3</p>
    </div>
  );
}

Dropdown.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
