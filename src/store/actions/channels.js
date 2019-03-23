import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com"
});

export const fetch_channels = () => {
  return async dispatch => {
    try {
      const res = await instance.get("/channels/");
      const channels = res.data;
      dispatch({
        type: actionTypes.FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      dispatch(setErrors(error.response.data));
      // console.error(error);
    }
  };
};

export const add_channel = (name, closeModal) => {
  return async dispatch => {
    try {
      const res = await instance.post("/channels/create/", name);
      const channel = res.data;
      closeModal();
      dispatch({
        type: actionTypes.ADD_CHANNEL,
        payload: channel
      });
    } catch (error) {
      dispatch(setErrors(error.response.data));
      // console.error(error);
    }
  };
};
