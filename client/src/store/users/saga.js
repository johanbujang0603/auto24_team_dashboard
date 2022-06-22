import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import {
  GET_ALL_USERS,
  ADD_NEW_USER,
} from "./actionType";

import {
  getAllUsersSuccess,
  getAllUsersFail,
  addNewUserSuccess,
  addNewUserFail,
} from "./action";

//Include Both Helper File with needed methods
import {
  getUserList,
  postUser,
} from "../../helpers/backend_helper";

function* getAllUsers() {
  try {
    const response = yield call(getUserList);
    yield put(getAllUsersSuccess(response));
  } catch (error) {
    yield put(getAllUsersFail(error));
  }
}

function* addNewUser({ payload: userData }) {
  try {
    const response = yield call(postUser(userData));
    yield put(addNewUserSuccess(response));
  } catch (error) {
    yield put(addNewUserFail(error));
  }
}

export function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USERS, getAllUsers);
}

export function *watchAddNewUser() {
  yield takeEvery(ADD_NEW_USER, addNewUser);
}

function* usersSaga() {
  yield all([
    fork(watchGetAllUsers),
    fork(watchAddNewUser),
  ]);
}

export default usersSaga;
