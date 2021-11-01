import React from 'react';
import Loader from "react-loader-spinner";

const LoadingBox = () => {
    return (
        <div className="row center">
            <Loader type="MutatingDots" color="#6A983C" height={120} width={120} /> Loading...
        </div>
    )
}

export default LoadingBox;