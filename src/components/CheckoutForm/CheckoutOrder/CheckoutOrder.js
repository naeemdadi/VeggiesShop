import React from "react";
import { useSelector } from "react-redux";

import "./CheckoutOrder.css";

const CheckoutOrder = () => {
  const cart = useSelector((state) => state.cart);

  const { cartData } = cart;

  return (
    <div className="checkout-right display--none@mobile">
      <div>
        <div className="checkout-right__section checkout-right__section--cart">
          <div>
            <div>
              <div className="checkout-cart__box">
                <span className="checkout-cart__title display--inline-block">
                  My Cart
                </span>
                <span className="float-right" data-test-id="no-of-items">
                  {cartData.totalQuantity} items
                </span>
                <div className="clear"></div>
              </div>
              <div>
                {cartData.vegetablesCart.map((product, i) => {
                  return (
                    <div className="checkout-cart__item" key={i}>
                      <div className="checkout-cart__item-count display--table-cell">
                        {product.quantity}
                      </div>
                      <div className="checkout-cart__img-box display--table-cell">
                        <div className="img-loader__wrapper__wrapper">
                          <div className="img-loader__wrapper">
                            <img
                              className="img-loader__img img-loader__img--shown "
                              alt={product.name}
                              src={product.image}
                            />
                            <span className="img-loader__placeholder img-loader__placeholder--circle img-loader__img img-loader__img--hidden "></span>
                          </div>
                        </div>
                      </div>
                      <div className="checkout-cart__item-name-box vertical-align--top display--table-cell">
                        <div
                          className="checkout-cart__item-name"
                          data-test-id="product-name"
                        >
                          {product.name}
                        </div>
                        <div className="checkout-cart__item-unit">
                          {product.unit}
                        </div>
                        <span
                          className="checkout-cart__item-price weight--semibold"
                          data-test-id="checkout-item-price"
                        >
                          <span>₹{product.price}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div class="clear"></div>
  );
};

export default CheckoutOrder;
