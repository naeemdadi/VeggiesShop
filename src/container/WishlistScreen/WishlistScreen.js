import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { AddItemPrimary } from "../../components/Buttons/AddItem";
import { RemoveItemPrimary } from "../../components/Buttons/RemoveItem";
import { purchasingState } from "../../store/actions/actionCreators/addToCartAction";
import { removeFromWishlist } from "../../store/actions/actionCreators/wishlistAction";

const WishlistScreen = ({ productData, wishlist }) => {
  const dispatch = useDispatch();
  useSelector((state) => state.cart);

  const product = productData.find((x) => x._id === wishlist.product);

  return (
    <div key={product._id} className="card">
      <Link
        to={{
          pathname: `/product/${product._id}`,
          state: {
            modal: true,
          },
        }}
      >
        <img src={product.image} alt={product.name} className="medium" />
      </Link>
      <div className="cardBody">
        <Link
          to={{
            pathname: `/product/${product._id}`,
            state: {
              modal: true,
            },
          }}
        >
          <h2>{product.name}</h2>
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="quantity">{product.unit}</div>
          <i
            className="fa fa-heart"
            onClick={() => dispatch(removeFromWishlist(product._id))}
          ></i>
        </div>

        <div className="priceCart">
          <div className="price">&#8377;{product.price}</div>
          {!product.purchasing ? (
            <button
              onClick={() => dispatch(purchasingState(product._id))}
              className="cartbtn"
            >
              Add to Cart
            </button>
          ) : (
            <div className="btnpurchasing">
              <RemoveItemPrimary product={product} />
              <p className="quantityCounter">{product.quantity}</p>
              <AddItemPrimary product={product} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(WishlistScreen);
