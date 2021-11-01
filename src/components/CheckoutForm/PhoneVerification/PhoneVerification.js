import React from 'react';
import { useDispatch } from 'react-redux';
import { signInOpen } from '../../../store/actions/actionCreators/signInAction';

import './PhoneVerification.css';

const PhoneVerification = (props) => {

    const dispatch = useDispatch();

    return (
        <div className={props.checkOutStep}>
            <span className="checkout-step__number">1</span>
            <span className="checkout-step__name" data-test-id="logged-in-number-title">Phone Number
                Verification</span>
            <div className="checkout-step__body">
                <section className="checkout-login">
                    <div className="checkout-login__msg">We need your phone number so that we can update you about
                        your order.</div>
                    <div className="login__body">
                        <button className="btn submit__btn" onClick={() => dispatch(signInOpen())}>LogIn/SignUp</button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PhoneVerification;
