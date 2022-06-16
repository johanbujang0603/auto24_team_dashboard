import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  
  SUBMIT_VEHICLE_PHOTOS,
  SUBMIT_VEHICLE_PHOTOS_SUCCESS,
  SUBMIT_VEHICLE_PHOTOS_FAIL,

  GET_CAR_MAKES,
  GET_CAR_MAKES_SUCCESS,
  GET_CAR_MAKES_FAIL,
  GET_CAR_MODELS,
  GET_CAR_MODELS_SUCCESS,
  GET_CAR_MODELS_FAIL,

  TOOGLE_ACTIVE_STEP,
} from "./actionType";

// common success
export const ApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// common error
export const ApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const submitVehiclePhotos = vehiclePhotos => ({
  type: SUBMIT_VEHICLE_PHOTOS,
  payload: vehiclePhotos,
});

export const submitVehiclePhotosSuccess = vehiclePhotos => ({
  type: SUBMIT_VEHICLE_PHOTOS_SUCCESS,
  payload: vehiclePhotos,
});

export const submitVehiclePhotosFail = error => ({
  type: SUBMIT_VEHICLE_PHOTOS_FAIL,
  payload: error,
});

export const getCarMakes = () => ({
  type: GET_CAR_MAKES,
});

export const getCarMakesSuccess = (data) => ({
  type: GET_CAR_MAKES_SUCCESS,
  payload: data,
});

export const getCarMakesFail = error => ({
  type: GET_CAR_MAKES_FAIL,
  payload: error,
});

export const getCarModels = makeId => ({
  type: GET_CAR_MODELS,
  payload: makeId,
});

export const getCarModelsSuccess = (data) => ({
  type: GET_CAR_MODELS_SUCCESS,
  payload: data,
});

export const getCarModelsFail = error => ({
  type: GET_CAR_MODELS_FAIL,
  payload: error,
});

export const toogleActiveStep = (step) => ({
  type: TOOGLE_ACTIVE_STEP,
  payload: step,
});