import React from 'react';
import './FavoriteMessage.scss';
import { correct } from '../../utils/images';

const FavoriteMessage = () => {
  return (
    <div className="favorite-message text-center">
      <div className="favorite-message-icon">
        <img src={correct} alt="" />
      </div>
      <h6 className="text-white fs-14 fw-5">An item has been added to your shopping favorites</h6>
    </div>
  );
};

export default FavoriteMessage;