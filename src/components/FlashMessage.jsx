import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles/flashMessage.css';

export default function FlashMessage({
  message,
  duration = 2000,
  setServerMessage,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setServerMessage('');
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, setServerMessage]);

  if (message)
    return (
      <div
        className="flash-message"
        style={{ display: isVisible ? 'flex' : 'none' }}
      >
        <p className="flash-message-text">{message}</p>
      </div>
    );
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  duration: PropTypes.number,
  setServerMessage: PropTypes.func,
};
