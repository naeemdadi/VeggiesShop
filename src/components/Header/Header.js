import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { sidebarOpen } from "../../store/actions/actionCreators/addToCartAction";
import {
  signInOpen,
  signInTestUser,
  userSignOut,
} from "../../store/actions/actionCreators/signInAction";
import { filteredProducts } from "../../store/actions/actionCreators/productsListAction";

import "./Header.css";

const Header = (props) => {
  const history = useHistory();

  const cartInfo = useSelector((state) => state.cart.cartData);
  const searchTerm = useSelector((state) => state.searchFilter);

  const { totalQuantity, cartTotal } = cartInfo;

  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = userSignIn;

  let user;

  if (userInfo && userInfo.userName) {
    user = userInfo.userName.split(" ");
  }

  return (
    <header
      className={
        history.location.pathname === "/orders" ? "row header-checkout" : "row"
      }
    >
      <div>
        <Link className="brand" to="/">
          VeggiesShop
        </Link>
      </div>
      {history.location.pathname === "/" ? (
        <div className="searchbox">
          <input
            type="text"
            name="search"
            className="searchinput"
            value={searchTerm}
            onChange={(e) =>
              dispatch(filteredProducts(e.target.value.toLowerCase()))
            }
            placeholder="Search for product..."
          />
        </div>
      ) : null}

      <div className="btn btnmain__header">
        {userInfo ? (
          <div className="dropdown">
            {userInfo.userName &&
            (userInfo.userName || cart.customerAddress.name) ? (
              <Link to="#">
                {user[0] || cart.customerAddress.name}
                <i className="fa fa-angle-down"></i>
              </Link>
            ) : (
              <Link to="#">
                {userInfo.phone}
                <i className="fa fa-angle-down"></i>
              </Link>
            )}
            <div className="dropdown-content">
              <Link to="/orders">Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="#" onClick={() => dispatch(userSignOut())}>
                Sign Out
              </Link>
            </div>
          </div>
        ) : (
          <div className="dropdown">
            <Link to="#" onClick={() => dispatch(signInOpen())}>
              <i className="fa fa-user-o"></i>
            </Link>
            <div className="dropdown-content">
              <Link to="#" onClick={() => dispatch(signInOpen())}>
                Sign In
              </Link>
              <Link to="#" onClick={() => dispatch(signInTestUser())}>
                Test User Sign In
              </Link>
            </div>
          </div>
        )}
        {!totalQuantity ? (
          <div className="header__cart" onClick={() => dispatch(sidebarOpen())}>
            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            <p className="mycart__header">My Cart</p>
          </div>
        ) : (
          <div className="header__cart" onClick={() => dispatch(sidebarOpen())}>
            <p className="quantity__counter">{totalQuantity}</p>
            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            <p className="mycartprice__header">&#8377;{cartTotal}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
