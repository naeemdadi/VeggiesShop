import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../../store/actions/actionCreators/signInAction";

const VerifyOTP = ({
  nextStep,
  prevStep,
  handleChange,
  hashHandleChange,
  value,
  userSignIn,
}) => {
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();

  const verify = (e) => {
    e.preventDefault();

    dispatch(signin(value.phone, value.hash, value.otp));
  };

  useEffect(() => {
    if (userSignIn.userInfo) {
      nextStep();
    }
  }, [userSignIn, dispatch, nextStep]);

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  const resend = (e) => {
    e.preventDefault();

    axios
      .post("api/users/sendOTP", {
        phone: `${value.phone}`,
      })
      .then((res) => {
        hashHandleChange(res.data.hash);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="sendotp">
      <button onClick={back} className="back-button">
        Back
      </button>
      <h2 className="heading__signin">Phone Number Verification</h2>
      <div className="login__user">
        <h3>
          Enter 4 digit code sent to your phone
          <br /> {value?.phone ? `+91${value.phone}` : null}
        </h3>
        <form>
          <div className="otp-phone">
            <input
              type="tel"
              maxLength="4"
              pattern="[0-9]*"
              name="otp"
              className="otp-phone__input"
              value={value.otp}
              onChange={handleChange("otp")}
            />
          </div>
          <button
            className="otp-button"
            onClick={verify}
            disabled={value.phone.length < 4}
          >
            Verify
          </button>
          <button onClick={resend} className="resend-button">
            Resend Code
          </button>
          {userSignIn.error ? (
            <p className="alert-error alert__text--center">
              {userSignIn.error}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
