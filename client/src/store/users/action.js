import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  ADD_NEW_USER,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAIL,
} from "./actionType";


export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});

export const getAllUsersSuccess = data => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: data,
});

export const getAllUsersFail = error => ({
  type: GET_ALL_USERS_FAIL,
  payload: error,
});

export const addNewUser = userData => ({
  type: ADD_NEW_USER,
  payload: userData,
});

export const addNewUserSuccess = data => ({
  type: ADD_NEW_USER_SUCCESS,
  payload: data,
});

export const addNewUserFail = error => ({
  type: ADD_NEW_USER_FAIL,
  payload: error,
});