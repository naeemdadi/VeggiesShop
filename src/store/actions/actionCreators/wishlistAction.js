import axios from "axios";
import * as actionTypes from "../actionTypes/wishlistTypes";

export const addToWishlist = (id) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.WISHLIST_CREATE_REQUEST });

  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.post(
      "/api/wishlist",
      { id },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: actionTypes.WISHLIST_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.WISHLIST_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getWishlist = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_WISHLIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/wishlist/mywishlist", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionTypes.GET_WISHLIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_WISHLIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.WISHLIST_REMOVE_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.delete("/api/wishlist/remove", {
      data: { id },
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionTypes.WISHLIST_REMOVE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.WISHLIST_REMOVE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
