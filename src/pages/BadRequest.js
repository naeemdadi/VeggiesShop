import React from 'react';
import ErrorBox from '../components/ErrorBox/ErrorBox'
import { Link } from 'react-router-dom';

const BadRequest = () => {
    return (
        <ErrorBox>You hit 404. Go to <Link to="/" style={{ textDecoration: "underline", color: "red"}}>Home</Link></ErrorBox>
    )
}

export default BadRequest;
