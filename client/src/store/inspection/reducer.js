import {
    SUBMIT_VEHICLE_PHOTOS,
    SUBMIT_VEHICLE_PHOTOS_SUCCESS,
    SUBMIT_VEHICLE_PHOTOS_FAIL,
    SUBMIT_VEHICLE_DETAILS,
    SUBMIT_VEHICLE_DETAILS_SUCCESS,
    SUBMIT_VEHICLE_DETAILS_FAIL,
    GET_CAR_MAKES_SUCCESS,
    GET_CAR_MAKES_FAIL,
    GET_CAR_MODELS_SUCCESS,
    GET_CAR_MODELS_FAIL,
    TOOGLE_ACTIVE_STEP,
    SUBMIT_VEHICLE_INSPECTION,
    SUBMIT_VEHICLE_INSPECTION_SUCCESS,
    SUBMIT_VEHICLE_INSPECTION_FAIL,
} from "./actionType";

const INIT_STATE = {
    activeStep: 1,
    isLoading: false,
    passedSteps: [],
    carMakes: [],
    carModels: [],
    currentData: {
        id: null,
        photos: null,
        vehicleDetails: null,
        vehicleInspection: null,
        workNeeded: null,
        vehicleInspectionDiagram: null,
        comments: null,
    },
};

const Inspection = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUBMIT_VEHICLE_PHOTOS:
            return { ...state, isLoading: true }
        case SUBMIT_VEHICLE_PHOTOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    photos: action.payload.data.photos,
                    vehicleDetails: action.payload.data.vehicle_details
                },
            }
        case SUBMIT_VEHICLE_PHOTOS_FAIL:
            return { ...state, isLoading: false }
        case SUBMIT_VEHICLE_DETAILS:
            return { ...state, isLoading: true }
        case SUBMIT_VEHICLE_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    vehicleDetails: action.payload.data.vehicle_details
                },
            }
        case SUBMIT_VEHICLE_DETAILS_FAIL:
            return { ...state, isLoading: false }
        case SUBMIT_VEHICLE_INSPECTION:
            return { ...state, isLoading: true }
        case SUBMIT_VEHICLE_INSPECTION_SUCCESS:
            console.log(action.payload.data);
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    vehicleInspection: action.payload.data.vehicle_inspection
                },
            }
        case SUBMIT_VEHICLE_INSPECTION_FAIL:
            return { ...state, isLoading: false }
        case GET_CAR_MAKES_SUCCESS:
            return { ...state, carMakes: action.payload.data }
        case GET_CAR_MAKES_FAIL:
            return { ...state, carMakes: [] }
        case GET_CAR_MODELS_SUCCESS:
            return { ...state, carModels: action.payload.data }
        case GET_CAR_MODELS_FAIL:
            return { ...state, carModels: [] }
        case TOOGLE_ACTIVE_STEP:
            return { ...state, activeStep: action.payload }
        default:
            return { ...state };
    }
};

export default Inspection;