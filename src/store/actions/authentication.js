import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com"
});

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    const decodedUser = jwt_decode(token);
    localStorage.setItem("myToken", token);
    return setCurrentUser(decodedUser);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    return setCurrentUser();
  }
};

export const checkForExpiredToken = () => {
  const token = localStorage.getItem("myToken");
  if (token) {
    const now = Date.now() / 1000;
    const user = jwt_decode(token);
    if (user.exp >= now) {
      return setAuthToken(token);
    }
  }
  return logout();
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("/login/", userData);
      let token = response.data.token;
      dispatch(setAuthToken(token));
      history.replace("/");
    } catch (error) {
      console.error("My Error ", error);
      dispatch(setErrors(error));
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("/signup/", userData);
      let token = response.data.token;
      dispatch(login(token));
      history.replace("/");
    } catch (error) {
      console.error(error);
      dispatch(setErrors(error));
    }
  };
};

export const logout = () => setAuthToken();
const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
