import React from 'react';
import "./FavoritesModal.scss";
import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';

const FavoritesModal = ({ favorites }) => {
  return (
    <div className='favorites-modal'>
      <h5 className='favorites-modal-title fw-5 fs-15 font-manrope text-center'>Recently Added Favorites</h5>
      {
        (favorites?.length > 0) ? (
          <div className='favorites-modal-list grid'>
            {
              favorites.map(favorite => (
                <div className='favorites-modal-item grid align-center font-manrope py-2' key={favorite.id}>
                  <div className='favorites-modal-item-img'>
                    <img src={favorite?.thumbnail} alt="" className='img-cover' />
                  </div>
                  <div className='favorites-modal-item-title fs-13 font-manrope text-capitalize'>{favorite?.title}</div>
                  <div className='favorites-modal-item-price text-orange fs-14 fw-6'>
                    {formatPrice(favorite?.discountedPrice)}
                  </div>
                </div>
              ))
            }

            <div className='text-capitalize view-favorites-btn bg-orange fs-15 font-manrope text-center'>View My Favorites</div>
          </div>) : (
          <div className='flex flex-column align-center justify-center favorites-modal-empty'>
            <img src={shopping_cart} alt="" className='' />
            <h6 className='text-dark fw-4'>No favorites yet</h6>
          </div>
        )
      }
    </div>
  )
}

export default FavoritesModal;
