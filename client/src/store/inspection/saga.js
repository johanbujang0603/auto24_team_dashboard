import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import {
  GET_CAR_MAKES,
  GET_CAR_MODELS,
  SUBMIT_VEHICLE_PHOTOS,
  SUBMIT_VEHICLE_DETAILS,
  SUBMIT_VEHICLE_INSPECTION,
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
    fork(watchGetCarMakes),
    fork(watchGetCarModels),
  ]);
}

export default inspectionSaga;
