import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    return JSON.parse(localStorage.getItem('favorites'));
  } else {
    return [];
  }
}

const storeInLocalStorage = (data) => {
  localStorage.setItem('favorites', JSON.stringify(data));
}

const initialState = {
  favorites: fetchFromLocalStorage(),
  itemsCount: 0,
  isFavoritesMessageOn: false
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const isItemInFavorites = state.favorites.find(item => item.id === action.payload.id);

      if (isItemInFavorites) {
        const tempFavorites = state.favorites.map(item => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;

            return {
              ...item, quantity: tempQty, totalPrice: tempTotalPrice
            }
          } else {
            return item;
          }
        });

        state.favorites = tempFavorites;
        storeInLocalStorage(state.favorites);
      } else {
        state.favorites.push(action.payload);
        storeInLocalStorage(state.favorites);
      }
    },

    removeFromFavorites: (state, action) => {
      const tempFavorites = state.favorites.filter(item => item.id !== action.payload);
      state.favorites = tempFavorites;
      storeInLocalStorage(state.favorites);
    },

    clearFavorites: (state) => {
      state.favorites = [];
      storeInLocalStorage(state.favorites);
    },

    getFavoritesTotal: (state) => {
      state.itemsCount = state.favorites.length;
    },

    toggleFavoritesQty: (state, action) => {
      const tempFavorites = state.favorites.map(item => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;

          if (action.payload.type === "INC") {
            tempQty++;
            if (tempQty === item.stock) tempQty = item.stock;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      state.favorites = tempFavorites;
      storeInLocalStorage(state.favorites);
    },

    setFavoritesMessageOn: (state) => {
      state.isFavoritesMessageOn = true;
    },

    setFavoritesMessageOff: (state) => {
      state.isFavoritesMessageOn = false;
    }
  }
});

export const { addToFavorites, setFavoritesMessageOff, setFavoritesMessageOn, getFavoritesTotal, toggleFavoritesQty, clearFavorites, removeFromFavorites } = favoritesSlice.actions;
export const getAllFavorites = (state) => state.favorites.favorites;
export const getFavoritesItemsCount = (state) => state.favorites.itemsCount;
export const getFavoritesMessageStatus = (state) => state.favorites.isFavoritesMessageOn;


export default favoritesSlice.reducer;
