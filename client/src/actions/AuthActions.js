import axios from "axios";
import { returnErrors, clearErrors } from "./ErrorActions";
import { tokenConfig } from "./tokenConfig";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./Types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  //****** Refer tokenConfig.js ***************************/
  /********* Since it is used in login, register and other actions a seperate file is made */

  //   //get token from localStorage
  //   const token = getState().auth.token;

  //   // header

  //   const config = {
  //     header: {
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   //If token, add to headers
  //   if (token) {
  //     config.headers["x-auth-token"] = token; // this adds one more field to config.header object "x-auth-token " = token from local storage
  //   }

  axios
    .get("/api/auth/user", tokenConfig(getState)) //earlier, we are using only config folder in place of tokenConfig(getState)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const register = ({ name, email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({ name, email, password });
  axios
    .post("/api/register", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({ email, password });
  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
