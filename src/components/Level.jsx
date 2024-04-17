import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Level({ imgRef, handleOnImageClick }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          'https://where-is-character-back-end-production.up.railway.app/level1',
          {
            responseType: 'blob',
            signal: controller.signal,
            withCredentials: true,
          }
        );

        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        throw new Error('Error fetching image: please try again later');
      }
    };

    fetchImage();

    return () => {
      controller.abort();
      console.log('Fetching aborted');
    };
  }, []);

  return (
    <div className="image-container">
      <img
        onClick={handleOnImageClick}
        className="image"
        ref={imgRef}
        src={imageSrc}
      />
    </div>
  );
}

Level.propTypes = {
  imgRef: PropTypes.object,
  handleOnImageClick: PropTypes.func,
};
