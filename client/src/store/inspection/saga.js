import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import {
  SUBMIT_VEHICLE_PHOTOS,
  SUBMIT_VEHICLE_DETAILS,
  SUBMIT_VEHICLE_INSPECTION,
  SUBMIT_WORK_NEED,
  SUBMIT_SCHEMA_INSPECTION,
  SUBMIT_COMMENTS,
  GET_CAR_MAKES,
  GET_CAR_MODELS,
} from "./actionType";

import {
  ApiResponseSuccess,
  ApiResponseError,
  submitVehiclePhotosSuccess,
  submitVehiclePhotosFail,
  submitVehicleDetailsSuccess,
  submitVehicleDetailsFail,
  submitVehicleInspectionSuccess,
  submitVehicleInspectionFail,
  submitWorkNeedSuccess,
  submitWorkNeedFail,
  submitSchemaInspectionSuccess,
  submitSchemaInspectionFail,
  submitCommentsSuccess,
  submitCommentsFail,
  getCarMakesSuccess,
  getCarMakesFail,
  getCarModelsSuccess,
  getCarModelsFail,
} from "./action";

//Include Both Helper File with needed methods
import {
  uploadVehiclePhotos,
  postVehicleDetails,
  postVehicleInspection,
  postWorkNeed,
  postSchemaInspection,
  postComments,
  getCarMakesList,
  getCarModelsList,
} from "../../helpers/backend_helper";

function* submitVehiclePhotos({ payload: vehiclePhotos }) {
  try {
    const response = yield call(uploadVehiclePhotos, vehiclePhotos);
    yield put(submitVehiclePhotosSuccess(response));
  } catch (error) {
    yield put(submitVehiclePhotosFail(error));
  }
}

function* submitVehicleDetails({ payload: details }) {
  try {
    const response = yield call(postVehicleDetails, details);
    yield put(submitVehicleDetailsSuccess(response));
  } catch (error) {
    yield put(submitVehicleDetailsFail(error));
  }
}

function* submitVehicleInspection({ payload: data }) {
  try {
    const response = yield call(postVehicleInspection, data);
    yield put(submitVehicleInspectionSuccess(response));
  } catch (error) {
    yield put(submitVehicleInspectionFail(error));
  }
}

function* submitWorkNeed({ payload: data }) {
  try {
    const response = yield call(postWorkNeed, data);
    yield put(submitWorkNeedSuccess(response));
  } catch (error) {
    yield put(submitWorkNeedFail(error));
  }
}

function* submitSchemaInspection({ payload: data }) {
  try {
    const response = yield call(postSchemaInspection, data);
    yield put(submitSchemaInspectionSuccess(response));
  } catch (error) {
    yield put(submitSchemaInspectionFail(error));
  }
}

function* submitComments({ payload: data }) {
  try {
    const response = yield call(postComments, data);
    yield put(submitCommentsSuccess(response));
  } catch (error) {
    yield put(submitCommentsFail(error));
  }
}


function* getCarMakes() {
  try {
    const response = yield call(getCarMakesList);
    yield put(getCarMakesSuccess(response));
  } catch (error) {
    yield put(getCarMakesFail(error));
  }
}

function* getCarModels({ payload: makeId }) {
  try {
    const response = yield call(getCarModelsList, makeId);
    yield put(getCarModelsSuccess(response));
  } catch (error) {
    yield put(getCarModelsFail(error));
  }
}

export function* watchSubmitVehiclePhotos() {
  yield takeEvery(SUBMIT_VEHICLE_PHOTOS, submitVehiclePhotos);
}

export function* watchSubmitVehicleDetails() {
  yield takeEvery(SUBMIT_VEHICLE_DETAILS, submitVehicleDetails);
}

export function* watchSubmitVehicleInspection() {
  yield takeEvery(SUBMIT_VEHICLE_INSPECTION, submitVehicleInspection);
}

export function* watchSubmitWorkNeed() {
  yield takeEvery(SUBMIT_WORK_NEED, submitWorkNeed);
}

export function* watchSubmitSchemaInspection() {
  yield takeEvery(SUBMIT_SCHEMA_INSPECTION, submitSchemaInspection);
}

export function* watchSubmitComments() {
  yield takeEvery(SUBMIT_COMMENTS, submitComments);
}

export function* watchGetCarMakes() {
  yield takeEvery(GET_CAR_MAKES, getCarMakes);
}

export function* watchGetCarModels() {
  yield takeEvery(GET_CAR_MODELS, getCarModels);
}

function* inspectionSaga() {
  yield all([
    fork(watchSubmitVehiclePhotos),
    fork(watchSubmitVehicleDetails),
    fork(watchSubmitVehicleInspection),
    fork(watchSubmitWorkNeed),
    fork(watchSubmitSchemaInspection),
    fork(watchSubmitComments),
    fork(watchGetCarMakes),
    fork(watchGetCarModels),
  ]);
}

export default inspectionSaga;
