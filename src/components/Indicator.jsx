import './styles/indicator.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Indicator({ x, y, deleteIndicator }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      deleteIndicator();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [deleteIndicator]);

  const width = 26;
  const height = 26;
  const style = {
    border: `1px solid black`,
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `50%`,
    opacity: `80%`,
    position: 'absolute',
    left: `${x - width / 2}px`,
    top: `${y - width / 2}px`,
  };

  return <div style={style} className="indicator"></div>;
}

Indicator.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  deleteIndicator: PropTypes.func,
};
