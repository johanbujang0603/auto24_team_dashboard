import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import {
  SUBMIT_VEHICLE_PHOTOS,
  GET_CAR_MAKES,
  GET_CAR_MODELS,
  SUBMIT_VEHICLE_INSPECTION,
} from "./actionType";

import {
  ApiResponseSuccess,
  ApiResponseError,
  submitVehiclePhotosSuccess,
  submitVehiclePhotosFail,
  getCarMakesSuccess,
  getCarMakesFail,
  getCarModelsSuccess,
  getCarModelsFail,
  submitVehicleInspectionSuccess,
  submitVehicleInspectionFail,
} from "./action";

//Include Both Helper File with needed methods
import {
  uploadVehiclePhotos,
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

function* submitVehicleInspection({ payload: data }) {
  try {
    console.log(data);
    // const response = yield call(getCarModelsList, makeId);
    // yield put(getCarModelsSuccess(response));
  } catch (error) {
    // yield put(getCarModelsFail(error));
  }
}

export function* watchSubmitVehiclePhotos() {
  yield takeEvery(SUBMIT_VEHICLE_PHOTOS, submitVehiclePhotos);
}

export function* watchGetCarMakes() {
  yield takeEvery(GET_CAR_MAKES, getCarMakes);
}

export function* watchGetCarModels() {
  yield takeEvery(GET_CAR_MODELS, getCarModels);
}

export function* watchSubmitVehicleInspection() {
  yield takeEvery(SUBMIT_VEHICLE_INSPECTION, submitVehicleInspection);
}

function* inspectionSaga() {
  yield all([
    fork(watchSubmitVehiclePhotos),
    fork(watchGetCarMakes),
    fork(watchGetCarModels),
    fork(watchSubmitVehicleInspection),
  ]);
}

export default inspectionSaga;
