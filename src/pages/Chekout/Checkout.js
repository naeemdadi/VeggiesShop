import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PhoneVerification from "../../components/CheckoutForm/PhoneVerification/PhoneVerification";
import DeliveryAddress from "../../components/CheckoutForm/DeliveryAddress/DeliveryAddess";
import Payment from "../../components/CheckoutForm/Payment/Payment";
import "./Checkout.css";
import CheckOutOrder from "../../components/CheckoutForm/CheckoutOrder/CheckoutOrder";

import "./Checkout.css";

const Checkout = (props) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const cart = useSelector((state) => state.cart);

  const [checkoutStep, setCheckoutStep] = useState("");
  const [paymentStep, setPaymentStep] = useState("");

  if (cart.cartData.totalQuantity === 0) {
    props.history.push("/");
  }

  const taxes = (cart.cartData.cartTotal * 5) / 100;

  const shipping = 0;

  const totalPay = cart.cartData.cartTotal + shipping + taxes;

  const dollars = cart.cartData.cartTotal * 0.013;

  useEffect(() => {
    if (userInfo && Object.keys(cart.customerAddress).length !== 0) {
      setCheckoutStep("checkout-step--complete");
    } else if (userInfo) {
      setCheckoutStep("checkout-step--active");
    }
  }, [userInfo, cart.customerAddress]);

  useEffect(() => {
    if (userInfo && cart.customerAddress) {
      setPaymentStep("checkout-step--active");
    }
    if (checkoutStep === "checkout-step--active") {
      setPaymentStep("");
    }
  }, [userInfo, cart.customerAddress, checkoutStep]);

  const addressChange = () => {
    setCheckoutStep("checkout-step--active");
  };

  return (
    <div className="checkout-wrapper wrapper">
      <div className="checkout">
        {userInfo ? (
          <PhoneVerification checkOutStep="checkout-step checkout-step--complete" />
        ) : (
          <PhoneVerification checkOutStep="checkout-step checkout-step--active" />
        )}
        <DeliveryAddress
          checkoutStep={checkoutStep}
          addressChange={addressChange}
        />
        <Payment
          paymentStep={paymentStep}
          taxes={taxes}
          totalPay={totalPay}
          shipping={shipping}
          dollars={dollars}
        />
      </div>
      <CheckOutOrder />
    </div>
  );
};

export default Checkout;
