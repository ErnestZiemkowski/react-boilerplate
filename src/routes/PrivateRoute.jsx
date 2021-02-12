/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "consts";
import ROUTE from ".";

// eslint-disable-next-line import/prefer-default-export
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(ACCESS_TOKEN) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: ROUTE.LOGIN.HOME, state: { from: props.location } }}
        />
      )
    }
  />
);
