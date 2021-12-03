import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCustomerAddress } from "../../../store/actions/actionCreators/addToCartAction";
import { sendCustomerName } from "../../../store/actions/actionCreators/signInAction";
import ErrorBox from "../../ErrorBox/ErrorBox";
import LoadingBox from "../../LoadingBox/LoadingBox";

import { stateData } from "../stateData";

import "./DeliveryAddress.css";

const DeliveryAddress = (props) => {
  const customerAddress = useSelector((state) => state.cart.customerAddress);

  const user = useSelector((state) => state.userSignIn);
  const dispatch = useDispatch();

  const { loading, userInfo, error } = user;

  const userName = () => {
    if (userInfo) {
      return userInfo.userName;
    } else if (customerAddress) {
      return customerAddress.userName;
    } else {
      return "";
    }
  };

  const [userData, setUserData] = useState({
    name: userName(),
    flatNumber: customerAddress.flatNumber ? customerAddress.flatNumber : "",
    streetName: customerAddress.streetName ? customerAddress.streetName : "",
    locality: customerAddress.locality ? customerAddress.locality : "",
    state: customerAddress.state ? customerAddress.state : "",
    city: customerAddress.city ? customerAddress.city : "",
  });

  const [index, setIndex] = useState(0);

  const handleChange = (input) => (e) => {
    if (input === "state") {
      let index = stateData.states.findIndex((x) => x.code === e.target.value);
      setIndex(index);
    }

    setUserData({
      ...userData,
      [input]:
        input !== "name" ? e.target.value.replace(/ /g, "") : e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sendCustomerAddress(userData));
    if (userData.name !== userInfo.userName) {
      dispatch(sendCustomerName(userData.name));
    }
  };

  return (
    <div className={`checkout-step ${props.checkoutStep}`}>
      <span className="checkout-step__number">2</span>
      <span
        className="checkout-step__name"
        data-test-id="delivery-address-title"
      >
        Delivery Address
      </span>

      {userInfo && !(props.checkoutStep === "checkout-step--active") && (
        <button
          onClick={props.addressChange}
          className="btn delivery_change-btn"
          data-test-id="address-change-button submit__btn"
        >
          Change
        </button>
      )}

      <div className="checkout-step__body">
        <div className="new-delivery-address-wrapper">
          <form className="new-delivery-address" onSubmit={onFormSubmit}>
            <div className="new-delivery-address__form-sub">
              <div className="new-delivery-address__form-row">
                <div>Name</div>
                <div className="display--table full-width">
                  <div className="display--table-cell vertical-align--bottom">
                    <label
                      htmlFor="name"
                      className="new-delivery-address__label"
                    >
                      <input
                        type="text"
                        placeholder="First &amp; Last Name"
                        maxLength="70"
                        id="name"
                        onChange={handleChange("name")}
                        value={userData.name}
                        required
                        className="input new-delivery-address__name"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="new-delivery-address__form-row">
                <label
                  htmlFor="addressLine1"
                  className="new-delivery-address__label"
                >
                  <div>Flat / House / Office No.</div>
                  <input
                    type="text"
                    id="addressLine1"
                    onChange={handleChange("flatNumber")}
                    value={userData.flatNumber}
                    className="input"
                    required
                  />
                </label>
              </div>
              <div className="new-delivery-address__form-row">
                <label
                  htmlFor="addressLine2"
                  className="new-delivery-address__label"
                >
                  <div>Street / Society / Office Name</div>
                  <input
                    type="text"
                    id="addressLine2"
                    onChange={handleChange("streetName")}
                    value={userData.streetName}
                    className="input"
                    required
                  />
                </label>
              </div>
              <div className="new-delivery-address__form-row">
                <label
                  htmlFor="addressLine3"
                  className="new-delivery-address__label"
                >
                  <div>Locality</div>
                  <input
                    type="text"
                    id="addressLine3"
                    onChange={handleChange("locality")}
                    value={userData.locality}
                    className="input"
                    required
                  />
                </label>
              </div>
              <div className="new-delivery-address__form-row">
                <label
                  htmlFor="addressLine4"
                  className="new-delivery-address__label"
                >
                  <div>State</div>
                  <select
                    id="addressLine4"
                    onChange={handleChange("state")}
                    value={userData.state}
                    className="input"
                    required
                  >
                    {stateData.states.map((state) => {
                      return (
                        <option
                          value={state.code}
                          key={state.code}
                          defaultValue={state.code}
                        >
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="new-delivery-address__form-row">
                <label
                  htmlFor="addressLine5"
                  className="new-delivery-address__label"
                >
                  <div>City</div>
                  <select
                    id="addressLine5"
                    onChange={handleChange("city")}
                    value={userData.city}
                    className="input"
                    required
                  >
                    {stateData.states[index].districts.map((district) => {
                      return (
                        <option
                          value={district.name}
                          key={district.id}
                          defaultValue={district.name}
                        >
                          {district.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div>
                <button
                  className="btn new-delivery-address__btn flush--left submit__btn"
                  type="submit"
                  disabled={
                    !userData.name ||
                    !userData.flatNumber ||
                    !userData.streetName ||
                    !userData.locality ||
                    !userData.state ||
                    !userData.city
                  }
                >
                  Continue
                </button>
                {loading && <LoadingBox></LoadingBox>}
                {error && <ErrorBox varient="error">{error}</ErrorBox>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
