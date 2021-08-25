import axios from "axios";
import * as actionTypes from "../actionTypes/signInTypes";

export const signin = (phone, hash, otp) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_SIGNIN_REQUEST,
    payload: { phone, hash, otp },
  });
  try {
    const { data } = await axios.post("/api/users/verifyOTP", {
      phone,
      hash,
      otp,
    });
    dispatch({
      type: actionTypes.USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signInTestUser = () => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_SIGNIN_REQUEST,
  });
  try {
    const { data } = await axios.post("/api/users/testuser");
    dispatch({
      type: actionTypes.USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendCustomerName = (name) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.SEND_NAME_REQUEST, payload: name });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/users/username",
      { name },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: actionTypes.SEND_NAME_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.SEND_NAME_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const userSignOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("customerAddress");

  dispatch({
    type: actionTypes.USER_SIGNOUT,
  });
};

export const signInOpen = () => {
  return {
    type: actionTypes.SIGNIN_OPEN,
  };
};

export const signInClose = () => {
  return {
    type: actionTypes.SIGNIN_CLOSE,
  };
};
