import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sidebarClose } from "../../store/actions/actionCreators/addToCartAction";
import SidebarItem from "./SidebarItem";

const SidebarDesign = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="sidebar__header">
        <h4>My Cart</h4>
        <p onClick={() => dispatch(sidebarClose())}>&#10006;</p>
      </div>
      {props.vegetablesCart.length === 0 ? (
        <>
          <div className="sidebar__empty">
            <h6>No items in your cart</h6>
            <p>Your favourite items are just a click away</p>
          </div>
          <Link
            to="/"
            className="sidebar__shopping"
            onClick={() => dispatch(sidebarClose())}
          >
            Start Shopping
          </Link>
        </>
      ) : (
        <>
          <div className="sidebar__main">
            {props.vegetablesCart.map((vegetable) => (
              <SidebarItem key={vegetable._id} vegetable={vegetable} />
            ))}
          </div>
          <Link
            to="/checkout"
            className="sidebar__shopping sidebar__checkout"
            onClick={() => dispatch(sidebarClose())}
          >
            <p>Proceed to Checkout</p>
            <p className="final__cart--value">&#8377;{props.cartTotal}</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default SidebarDesign;
