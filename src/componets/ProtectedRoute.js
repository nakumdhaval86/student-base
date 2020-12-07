import React from "react";
import { isEmpty } from "react-redux-firebase";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.firebase.auth);

  return !isEmpty(auth) ? (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
