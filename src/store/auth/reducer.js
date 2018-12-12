import * as types from "./actionTypes";

const initialState = {
  isLoggedIn: false,
  type: types.NONE,
  status: types.NONE,
  result: null,
  error: null,
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        type:types.AUTH_LOGIN,
        status: action.status,
        isLoggedIn: action.status == types.SUCCESS,
        result: action.result,
        error: action.error,
      }
    case types.AUTH_LOGOUT:
      return {
        ...state,
        type:types.AUTH_LOGOUT,
        status: types.NONE,
        isLoggedIn: false,
      }
    case types.AUTH_REGISTER:
      return{
        ...state,
        type:types.AUTH_REGISTER,
        result: action.result,
        error: action.error,
      }
    case types.AUTH_FORGOT:
      return{
        ...state,
        type:types.AUTH_FORGOT,
        result: action.result,
        error: action.error,
      }
    default:
      return state;
  }
}
