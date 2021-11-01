import * as actionTypes from "../actions/actionTypes/productsListTypes";

const initialState = {
  loading: true,
  vegetables: [],
};

const productsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VEGETABLE_LIST_REQUEST:
      return { loading: true };
    case actionTypes.VEGETABLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        vegetables: action.payload,
      };
    case actionTypes.VEGETABLE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchFilterReducer = (state = "", action) => {
  switch (action.type) {
    case actionTypes.VEGETABLE_FILTER_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default productsListReducer;
