import * as types from './actionTypes';


export function setInternetConnection(status){
  return dispatch=>{
    dispatch({type:types.SET_INTERNET_CONNECTION_STATUS, value:status})
  }
}
