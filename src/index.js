import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import productListReducer, {
  searchFilterReducer,
} from "./store/reducer/productsListReducer";
import cartReducer from "./store/reducer/cartReducer";
import {
  orderReducer,
  orderDetailsReducer,
} from "./store/reducer/orderReducer";
import userSignIn from "./store/reducer/userSignIn";
import {
  getWishlistReducer,
  removeFromWishlist,
  wishlistReducer,
} from "./store/reducer/wishlistReducer";
import axios from "axios";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  products: productListReducer,
  cart: cartReducer,
  userSignIn,
  newOrder: orderReducer,
  orderDetails: orderDetailsReducer,
  wishlist: wishlistReducer,
  fullWishlist: getWishlistReducer,
  removeFromWishlist,
  searchFilter: searchFilterReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
