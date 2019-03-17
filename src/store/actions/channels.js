import * as actionTypes from "./actionTypes";
// import { setErrors } from "./errors";
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
      console.error(error);
    }
  };
};

export const add_channel = (name, closeModal) => {
  return async dispatch => {
    try {
      const res = await instance.post("/channels/create/", name);
      const channel = res.data;
      dispatch({
        type: actionTypes.ADD_CHANNEL,
        payload: channel
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
};
