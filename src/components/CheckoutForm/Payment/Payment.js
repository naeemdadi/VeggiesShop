import React, { useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOrderDetails } from "../../../store/actions/actionCreators/orderAction";
import ErrorBox from "../../ErrorBox/ErrorBox";
import LoadingBox from "../../LoadingBox/LoadingBox";

import "./Payment.css";
import axios from "axios";

const Payment = (props) => {
  const cart = useSelector((state) => state.cart);

  const newOrder = useSelector((state) => state.newOrder);
  const { loading, success, error } = newOrder;

  const { taxes, shipping, totalPay, dollars } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      document.body.appendChild(script);
    };
  }, []);

  const successPaymentHandler = () => {
    dispatch(
      sendOrderDetails({
        orderItems: cart.cartData.vegetablesCart,
        customerAddress: cart.customerAddress,
        cartTotal: cart.cartData.cartTotal,
        taxes: taxes,
        shippingPrice: shipping,
        totalPrice: totalPay,
        isPaid: true,
      })
    );
  };

  useEffect(() => {
    if (success) {
      props.history.push("/orders");
    }
  }, [success, props.history]);

  return (
    <div className={`checkout-step ${props.paymentStep}`}>
      <span className="checkout-step__number">3</span>
      <span className="checkout-step__name" data-test-id="payment-title">
        Payment
      </span>
      <div className="checkout-step__body checkout-step__body--payment-step">
        <div className="payment--details">
          <div>
            <p>Total Price: </p>
            <p>{cart.cartData.cartTotal}&#8377;</p>
          </div>
          <div>
            <p>Shipping: </p>
            <p>{shipping === 0 ? "Free" : { shipping }}</p>
          </div>
          <div>
            <p>Taxes: </p>
            <p>{taxes}&#8377;</p>
          </div>
        </div>
        <div className="payment--total">
          <p>Total Pay: </p>
          <p>{totalPay}&#8377;</p>
        </div>
        <PayPalButton
          amount={dollars.toFixed(2)}
          onSuccess={successPaymentHandler}
        />
        {loading && <LoadingBox></LoadingBox>}
        {error && <ErrorBox varient="error">{error}</ErrorBox>}
      </div>
    </div>
  );
};

export default withRouter(Payment);
