import * as actionTypes from "../actions/actionTypes/signInTypes";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  signInOpen: false,
};

const userSignIn = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case actionTypes.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case actionTypes.USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SEND_NAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SEND_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {
          ...state.userInfo,
          userName: action.payload,
        },
      };
    case actionTypes.SEND_NAME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SIGNIN_OPEN:
      return {
        ...state,
        signInOpen: true,
      };
    case actionTypes.SIGNIN_CLOSE:
      return {
        ...state,
        signInOpen: false,
      };
    case actionTypes.USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export default userSignIn;
