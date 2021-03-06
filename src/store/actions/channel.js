import * as actionTypes from "./actionTypes";
// import { setErrors } from "./errors";
import axios from "axios";
import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com"
});

export let prevTimeStamp = "";

export const loading = () => {
  return {
    type: actionTypes.SET_MESSAGES_LOADING
  };
};

export const clearTS = () => {
  prevTimeStamp = "";
};

export let msgs = [];

export const clearMsgs = () => {
  console.log("clearing messages....");
  return {
    type: actionTypes.CLEAR_MESSAGES
  };
};

export const fetch_messages = (channelID, scroll) => {
  return async (dispatch, getState) => {
    try {
      const res = await instance.get(
        `/channels/${channelID}/?latest=${prevTimeStamp}`
      );
      const messages = res.data;
      dispatch(setErrors([]));
      // console.log(messages);
      if (messages.length) {
        prevTimeStamp = messages[messages.length - 1].timestamp;
        // console.log("hey ", prevTimeStamp);
      }
      console.log("msgs from ballll ", getState().chnl.messages);
      if (
        !messages.some(
          msg => !!getState().chnl.messages.find(mg => mg.id === msg.id)
        )
      ) {
        console.log("this fonud smth ");
        dispatch({
          type: actionTypes.FETCH_MESSAGES,
          payload: messages.map(msg =>
            msg.message.includes("򹷍쪬w󀆬񪉭")
              ? {
                  ...msg,
                  message: msg.message.replace("򹷍쪬w󀆬񪉭", ""),
                  type: "asciified"
                }
              : { ...msg, type: "message" }
          )
        });
        scroll("latestMessage");
      }
    } catch (error) {
      dispatch(setErrors(error.response.data));
      // console.error(error);
    }
  };
};

export const send_message = (channelID, message) => {
  return async dispatch => {
    try {
      await instance.post(`/channels/${channelID}/send/`, {
        message: message.message
      });
      // const msg = res.data;
      dispatch(setErrors([]));
    } catch (error) {
      dispatch(setErrors(error.response.data));
      // console.error(error);
    }
  };
};
