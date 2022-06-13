import {
} from "./actionType";

const INIT_STATE = {
    activeStep: 0,
    isLoading: false,
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

const Crypto = (state = INIT_STATE, action) => {
    switch (action.type) {
        default:
            return { ...state };
    }
};

export default Crypto;