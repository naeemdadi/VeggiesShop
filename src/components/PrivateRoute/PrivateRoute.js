import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to={{ pathname: "/", state: props.location }} />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
