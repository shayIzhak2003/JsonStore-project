import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites, toggleFavoritesQty, clearFavorites } from '../../store/favoritesSlice';
import { formatPrice } from '../../utils/helpers';
import FavoritesModal from '../../components/FavoritesModal/FavoritesModal';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const removeFromFavoritesHandler = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  const clearFavoritesHandler = () => {
    dispatch(clearFavorites());
  };

  const toggleFavoritesQtyHandler = (productId, type) => {
    dispatch(toggleFavoritesQty({ id: productId, type }));
  };

  return (
    <div className="favorites bg-whitesmoke">
      <div className="container">
        <div className="favorites-table">
          <div className="favorites-thead bg-white">
            <div className="favorites-th flex fw-6 font-manrope fs-15">
              <div className="favorites-thd">
                <span className="favorites-thtxt">S.N.</span>
              </div>
              <div className="favorites-thd">
                <span className="favorites-thtxt">Product</span>
              </div>
              <div className="favorites-thd">
                <span className="favorites-thtxt">Unit Price</span>
              </div>
              <div className="favorites-thd">
                <span className="favorites-thtxt">Quantity</span>
              </div>
              <div className="favorites-thd">
                <span className="favorites-thtxt">Total Price</span>
              </div>
              <div className="favorites-thd">
                <span className="favorites-thtxt">Actions</span>
              </div>
            </div>
          </div>

          <div className="favorites-tbody bg-white">
            {favorites.map((favorite, idx) => (
              <div className="favorites-ctr py-4" key={favorite?.id}>
                <div className="favorites-ctd">
                  <span className="favorites-thtxt">{idx + 1}</span>
                </div>
                <div className="favorites-ctd">
                  <span className="favorites-thtxt">{favorite?.title}</span>
                </div>
                <div className="favorites-ctd">
                  <span className="favorites-thtxt">{formatPrice(favorite?.discountedPrice)}</span>
                </div>
                <div className="favorites-ctd">
                  <div className="qty-change flex align-center">
                    <button
                      type="button"
                      className="qty-decrease flex align-center justify-center"
                      onClick={() => toggleFavoritesQtyHandler(favorite?.id, 'DEC')}
                    >
                      <i className="fas fa-minus"></i>
                    </button>

                    <div className="qty-value flex align-center justify-center">{favorite?.quantity}</div>

                    <button
                      type="button"
                      className="qty-increase flex align-center justify-center"
                      onClick={() => toggleFavoritesQtyHandler(favorite?.id, 'INC')}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="favorites-ctd">
                  <span className="favorites-thtxt text-orange fw-5">{formatPrice(favorite?.totalPrice)}</span>
                </div>

                <div className="favorites-ctd">
                  <button
                    type="button"
                    className="delete-btn text-dark"
                    onClick={() => removeFromFavoritesHandler(favorite?.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="favorites-cfoot flex align-start justify-between py-3 bg-white">
            <div className="favorites-cfoot-l">
              <button
                type="button"
                className="clear-favorites-btn text-danger fs-15 text-uppercase fw-4"
                onClick={clearFavoritesHandler}
              >
                <i className="fas fa-trash"></i>
                <span className="mx-1">Clear Favorites</span>
              </button>
            </div>

            <div className="favorites-cfoot-r flex flex-column justify-end">
              <FavoritesModal favorites={favorites} />

              {/* You can add more content here as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
