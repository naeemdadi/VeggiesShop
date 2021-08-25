import axios from "axios";
import * as actionTypes from "../actionTypes/productsListTypes";

const vegetablesList = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.VEGETABLE_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(
      "https://veggiesecom.herokuapp.com//api/products"
    );

    if (localStorage.getItem("cartItems")) {
      const products = getState().cart.cartData.vegetablesCart;

      data.map((item) => {
        products.map((product) => {
          const index = data.findIndex((x) => x._id === product._id);
          data[index] = product;
          return data;
        });
        return data;
      });
    }

    dispatch({
      type: actionTypes.VEGETABLE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.VEGETABLE_LIST_FAIL, payload: error.message });
  }
};

export const filteredProducts = (value) => (dispatch) => {
  dispatch({
    type: actionTypes.VEGETABLE_FILTER_SEARCH,
    payload: value,
  });
};

export default vegetablesList;
