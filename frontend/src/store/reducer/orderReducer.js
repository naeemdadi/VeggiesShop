import * as actionTypes from "../actions/actionTypes/orderTypes";

const initialState = {};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, payload: action.payload };
    case actionTypes.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_ORDER_REQUEST:
      return { loading: true };
    case actionTypes.USER_ORDER_SUCCESS:
      return { loading: false, orderHistory: action.payload };
    case actionTypes.USER_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
