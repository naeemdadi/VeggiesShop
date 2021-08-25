import axios from "axios";
import * as actionTypes from "../actionTypes/orderTypes";

export const sendOrderDetails = (order) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.ORDER_CREATE_REQUEST, payload: order });

  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    localStorage.removeItem("cartItems");
    dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: actionTypes.CLEAR_CART });
  } catch (err) {
    dispatch({
      type: actionTypes.ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const userOrderDetails = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.USER_ORDER_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/myorders", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionTypes.USER_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.USER_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
