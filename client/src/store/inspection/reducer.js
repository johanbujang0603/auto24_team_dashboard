import {
    SUBMIT_VEHICLE_PHOTOS,
    SUBMIT_VEHICLE_PHOTOS_SUCCESS,
    SUBMIT_VEHICLE_PHOTOS_FAIL,
    SUBMIT_VEHICLE_DETAILS,
    SUBMIT_VEHICLE_DETAILS_SUCCESS,
    SUBMIT_VEHICLE_DETAILS_FAIL,
    SUBMIT_VEHICLE_INSPECTION,
    SUBMIT_VEHICLE_INSPECTION_SUCCESS,
    SUBMIT_VEHICLE_INSPECTION_FAIL,
    SUBMIT_WORK_NEED,
    SUBMIT_WORK_NEED_SUCCESS,
    SUBMIT_WORK_NEED_FAIL,
    SUBMIT_SCHEMA_INSPECTION,
    SUBMIT_SCHEMA_INSPECTION_SUCCESS,
    SUBMIT_SCHEMA_INSPECTION_FAIL,
    SUBMIT_COMMENTS,
    SUBMIT_COMMENTS_SUCCESS,
    SUBMIT_COMMENTS_FAIL,
    GET_CAR_MAKES_SUCCESS,
    GET_CAR_MAKES_FAIL,
    GET_CAR_MODELS_SUCCESS,
    GET_CAR_MODELS_FAIL,
    TOOGLE_ACTIVE_STEP,
} from "./actionType";

const INIT_STATE = {
    activeStep: 1,
    isLoading: false,
    error: null,
    passedSteps: [],
    carMakes: [],
    carModels: [],
    currentData: {
        id: null,
        photos: null,
        vehicleDetails: null,
        vehicleInspection: null,
        workNeeded: null,
        schemaInspection: null,
        comments: null,
    },
};

const Inspection = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUBMIT_VEHICLE_PHOTOS:
            return { ...state, error: null, isLoading: true }
        case SUBMIT_VEHICLE_PHOTOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                error: null,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    photos: action.payload.data.photos,
                    vehicleDetails: action.payload.data.vehicle_details
                },
            }
        case SUBMIT_VEHICLE_PHOTOS_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        case SUBMIT_VEHICLE_DETAILS:
            return { ...state, error: null, isLoading: true }
        case SUBMIT_VEHICLE_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                error: null,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    vehicleDetails: action.payload.data.vehicle_details
                },
            }
        case SUBMIT_VEHICLE_DETAILS_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        case SUBMIT_VEHICLE_INSPECTION:
            return { ...state, error: null, isLoading: true }
        case SUBMIT_VEHICLE_INSPECTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                error: null,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    vehicleInspection: action.payload.data.vehicle_inspection
                },
            }
        case SUBMIT_VEHICLE_INSPECTION_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        case SUBMIT_WORK_NEED:
            return { ...state, error: null, isLoading: true }
        case SUBMIT_WORK_NEED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                error: null,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    workNeeded: action.payload.data.work_needed
                },
            }
        case SUBMIT_WORK_NEED_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        case SUBMIT_SCHEMA_INSPECTION:
            return { ...state, error: null, isLoading: true }
        case SUBMIT_SCHEMA_INSPECTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                activeStep: state.activeStep + 1,
                error: null,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    schemaInspection: action.payload.data.schema_inspection
                },
            }
        case SUBMIT_SCHEMA_INSPECTION_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        case SUBMIT_COMMENTS:
            return { ...state, error: null, isLoading: true }
        case SUBMIT_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passedSteps: state.passedSteps.includes(state.activeStep) ? state.passedSteps : [...state.passedSteps, state.activeStep],
                error: null,
                currentData: {
                    ...state.currentData,
                    id: action.payload.data._id,
                    comments: action.payload.data.comments
                },
            }
        case SUBMIT_COMMENTS_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        case GET_CAR_MAKES_SUCCESS:
            return { ...state, carMakes: action.payload.data, error: null }
        case GET_CAR_MAKES_FAIL:
            return { ...state, error: action.payload, carMakes: [] }
        case GET_CAR_MODELS_SUCCESS:
            return { ...state, carModels: action.payload.data, error: null }
        case GET_CAR_MODELS_FAIL:
            return { ...state, error: action.payload, carModels: [] }
        case TOOGLE_ACTIVE_STEP:
            return { ...state, activeStep: action.payload }
        default:
            return { ...state };
    }
};

export default Inspection;