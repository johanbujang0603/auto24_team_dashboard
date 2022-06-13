import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import {
  SUBMIT_VEHICLE_PHOTOS,
} from "./actionType";

import {
  ApiResponseSuccess,
  ApiResponseError,
  submitVehiclePhotosSuccess,
  submitVehiclePhotosFail
} from "./action";

//Include Both Helper File with needed methods
import {
  uploadVehiclePhotos
} from "../../helpers/backend_helper";

function* submitVehiclePhotos({ payload: vehiclePhotos }) {
  try {
    const response = yield call(uploadVehiclePhotos, vehiclePhotos);
    console.log("response", response);
    // yield put(deleteProductSuccess(response));
  } catch (error) {
    // yield put(deleteProductFail(error));
  }
}

export function* watchSubmitVehiclePhotos() {
  yield takeEvery(SUBMIT_VEHICLE_PHOTOS, submitVehiclePhotos);
}

function* ecommerceSaga() {
  yield all([
    fork(watchSubmitVehiclePhotos),
  ]);
}

export default ecommerceSaga;
