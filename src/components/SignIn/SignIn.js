import React from 'react';
import Modal from 'react-modal';
import 'animate.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInClose } from '../../store/actions/actionCreators/signInAction';
import StepForm from './StepForm/StepForm';

import './SignIn.css';

Modal.setAppElement('#root')

const SignIn = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.userSignIn);

    const { signInOpen } = data;

    return (
        <Modal
            style={{
                overlay: {
                    background: 'rgba(0, 0, 0, 0.5)'
                }
            }}
            className="signInModal"
            isOpen={signInOpen}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={600}
            onRequestClose={() => dispatch(signInClose())}
            >
            <StepForm />
        </Modal>
    )
}

export default SignIn;