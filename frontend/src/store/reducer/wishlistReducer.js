import * as actionTypes from "../actions/actionTypes/wishlistTypes";
import * as userActionTypes from "../actions/actionTypes/signInTypes";

const initialState = {};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WISHLIST_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.WISHLIST_CREATE_SUCCESS:
      return { loading: false, success: true, wishlist: action.payload };
    case actionTypes.WISHLIST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_WISHLIST_REQUEST:
      return { loading: true };
    case actionTypes.GET_WISHLIST_SUCCESS:
      return { loading: false, wishlist: action.payload };
    case actionTypes.GET_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    case userActionTypes.USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const removeFromWishlist = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.WISHLIST_REMOVE_REQUEST:
      return { loading: true };
    case actionTypes.WISHLIST_REMOVE_SUCCESS:
      return { loading: false, wishlist: action.payload };
    case actionTypes.WISHLIST_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
