import PropTypes from 'prop-types';

export default function Level({ imgRef, handleOnImageClick }) {
  return (
    <div className="image-container">
      <img
        onClick={handleOnImageClick}
        className="image"
        ref={imgRef}
        src={`https://res.cloudinary.com/dhjzutfu9/image/upload/v1723020373/level1_aublme.jpg`}
      />
    </div>
  );
}

Level.propTypes = {
  imgRef: PropTypes.object,
  handleOnImageClick: PropTypes.func,
};
