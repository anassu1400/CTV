import * as actionTypes from "./actionTypes";
// import { setErrors } from "./errors";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com"
});
export const loading = () => {
  return {
    type: actionTypes.SET_MESSAGES_LOADING
  };
};
export const fetch_messages = channelID => {
  return async dispatch => {
    try {
      const res = await instance.get(`/channels/${channelID}`);
      const messages = res.data;
      console.log(messages);
      dispatch({
        type: actionTypes.FETCH_MESSAGES,
        payload: messages
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const send_message = (channelID, message) => {
  return async dispatch => {
    try {
      const res = await instance.post(`/channels/${channelID}/send/`, message);
      const msg = res.data;
      console.log(msg);
      dispatch({
        type: actionTypes.SEND_MESSAGE,
        payload: msg
      });
    } catch (error) {
      console.log(error);
    }
  };
};
