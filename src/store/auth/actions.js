import * as types from './actionTypes';
import api from '@services/travelcarma-api'

export function login(email, password){
  return dispatch=>{
    dispatch({type:types.AUTH_LOGIN, status:types.LOADING})
    api.login(email, password, (error, result)=>{
      dispatch({type:types.AUTH_LOGIN, status:error?types.FAILED:types.SUCCESS, error, result})
    })
  }
}

export function logout(){
  return dispatch=>{
    api.logout()
    dispatch({type:types.AUTH_LOGOUT})
  }
}

export function register(data){
  return dispatch=>{
    dispatch({type:types.AUTH_REGISTER, status:types.LOADING})
    api.register(data, (error, result)=>{
      dispatch({type:types.AUTH_LOGOUT, status:error?types.FAILED:types.SUCCESS, error, result})
    })
  }
}

export function forgotPassword(email){
  return dispatch=>{
    dispatch({type:types.AUTH_LOGIN, status:types.LOADING})
    api.register(data, (error, result)=>{
      dispatch({type:types.AUTH_FORGOT, status:error?types.FAILED:types.SUCCESS, error, result})
    })
  }
}
