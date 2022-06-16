import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  
  SUBMIT_VEHICLE_PHOTOS,
  SUBMIT_VEHICLE_PHOTOS_SUCCESS,
  SUBMIT_VEHICLE_PHOTOS_FAIL,
  
  SUBMIT_VEHICLE_DETAILS,
  SUBMIT_VEHICLE_DETAILS_SUCCESS,
  SUBMIT_VEHICLE_DETAILS_FAIL,

  GET_CAR_MAKES,
  GET_CAR_MAKES_SUCCESS,
  GET_CAR_MAKES_FAIL,
  GET_CAR_MODELS,
  GET_CAR_MODELS_SUCCESS,
  GET_CAR_MODELS_FAIL,

  TOOGLE_ACTIVE_STEP,

  SUBMIT_VEHICLE_INSPECTION,
  SUBMIT_VEHICLE_INSPECTION_SUCCESS,
  SUBMIT_VEHICLE_INSPECTION_FAIL,
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

export const submitVehiclePhotosSuccess = data => ({
  type: SUBMIT_VEHICLE_PHOTOS_SUCCESS,
  payload: data,
});

export const submitVehiclePhotosFail = error => ({
  type: SUBMIT_VEHICLE_PHOTOS_FAIL,
  payload: error,
});

export const submitVehicleDetails = details => ({
  type: SUBMIT_VEHICLE_DETAILS,
  payload: details,
});

export const submitVehicleDetailsSuccess = data => ({
  type: SUBMIT_VEHICLE_DETAILS_SUCCESS,
  payload: data,
});

export const submitVehicleDetailsFail = error => ({
  type: SUBMIT_VEHICLE_DETAILS_FAIL,
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

export const submitVehicleInspection = (data) => ({
  type: SUBMIT_VEHICLE_INSPECTION,
  payload: data,
});

export const submitVehicleInspectionSuccess = (data) => ({
  type: SUBMIT_VEHICLE_INSPECTION_SUCCESS,
  payload: data,
});

export const submitVehicleInspectionFail = error => ({
  type: SUBMIT_VEHICLE_INSPECTION_FAIL,
  payload: error,
});