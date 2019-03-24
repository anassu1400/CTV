import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  messages: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
        loading: false
      };

    case actionTypes.SEND_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
        // loading: false
      };
    case actionTypes.SET_MESSAGES_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        messages: []
      };
    default:
      return state;
  }
};

export default reducer;
