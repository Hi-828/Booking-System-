import * as types from "./actionTypes";

const initialState = {
  internetConnection:true,
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_INTERNET_CONNECTION_STATUS:
      return {
        ...state,
        types:types.SET_INTERNET_CONNECTION_STATUS,
        internetConnection: action.value
      }
    default:
      return state;
  }
}
