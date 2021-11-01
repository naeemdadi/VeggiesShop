import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PhoneInput from './PhoneInput';
import VerifyOtp from './VerifyOtp';
import SignInSuccess from './SignInSuccess';

import './StepForm.css';

const StepForm = (props) => {

    const [state, setState] = useState({
        phone: '',
        hash: '',
        otp: ''
    })
    const [step, setStep] = useState(1);

    const data = useSelector(state => state.userSignIn);

    const handleChange = (input) => (e) => {
        setState({...state, [input]: e.target.value.replace(/\D/, '')})
    }
    const hashHandleChange = (hash) => {
        setState({...state, hash: hash})
    }
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    }
    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    }
    
    const {phone, hash, otp} = state;
    const value = {phone, hash, otp};

    switch(step) {
        case 1: return <PhoneInput nextStep={nextStep} handleChange={handleChange} hashHandleChange={hashHandleChange} value={value} />
        case 2: return <VerifyOtp nextStep={nextStep} hashHandleChange={hashHandleChange} prevStep={prevStep} userSignIn={data} handleChange={handleChange} value={value} />
        case 3: return <SignInSuccess userSignIn={data} />
        default: return <PhoneInput nextStep={nextStep} handleChange={handleChange} hashHandleChange={hashHandleChange} value={value} />
    }
}

export default StepForm;