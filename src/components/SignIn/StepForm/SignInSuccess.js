import React from 'react';
import { useDispatch } from 'react-redux';
import { signInClose } from '../../../store/actions/actionCreators/signInAction';

const SignInSuccess = ({userSignIn}) => {

    const dispatch = useDispatch();

    const success = () => {
        dispatch(signInClose());
    }

    return (
        <div className="sendotp">
            <h2>{userSignIn.userInfo.message}</h2>
            <button className="success-button" onClick={success}>Ok</button>
        </div>
    )
}

export default SignInSuccess;