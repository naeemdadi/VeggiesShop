import * as actionTypes from "../actionTypes/addToCartTypes";

export const purchasingState = (productId) => (dispatch, getState) => {
  const data = getState().products;

  const product = data.vegetables.find((x) => x._id === productId);

  dispatch({
    type: actionTypes.PURCHASING_STATE,
    payload: product,
    id: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartData));
};

export const incrementItem = (productId) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.INCREMENT_ITEM,
    id: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartData));
};

export const decrementItem = (productId) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.DECREMENT_ITEM,
    id: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartData));
};

export const sendCustomerAddress = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SEND_CUSTOMER_ADDRESS,
    payload: data,
  });
  localStorage.setItem("customerAddress", JSON.stringify(data));
};

export const sidebarOpen = () => {
  return {
    type: actionTypes.SIDEBAR_OPEN,
  };
};

export const sidebarClose = () => {
  return {
    type: actionTypes.SIDEBAR_CLOSE,
  };
};
