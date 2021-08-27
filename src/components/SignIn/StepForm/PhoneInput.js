import React from "react";
import axios from "axios";

const PhoneInput = ({ value, handleChange, hashHandleChange, nextStep }) => {
  const next = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/sendOTP", {
        phone: `${value.phone}`,
      })
      .then((res) => {
        hashHandleChange(res.data.hash);
      })
      .catch((err) => {
        console.error(err);
      });

    nextStep();
  };

  return (
    <div className="sendotp">
      <button
        onClick={nextStep}
        className="back-button"
        style={{ left: "unset", right: "15px" }}
      >
        Next
      </button>
      <h2 className="heading__signin">Phone Number Verification</h2>
      <div className="login__user">
        <h3>
          Enter your phone number to
          <br /> Login/Sign up
        </h3>
        <form>
          <div className="login-phone">
            <input
              type="tel"
              maxLength="10"
              pattern="[0-9]*"
              name="phonenumber"
              className="login-phone__input"
              value={value.phone}
              onChange={handleChange("phone")}
            />
          </div>
          <button
            className="login-button"
            onClick={next}
            disabled={value.phone.length < 10}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhoneInput;
