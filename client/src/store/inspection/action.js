import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  
  SUBMIT_VEHICLE_PHOTOS,
  SUBMIT_VEHICLE_PHOTOS_SUCCESS,
  SUBMIT_VEHICLE_PHOTOS_FAIL,
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