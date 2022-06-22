import {
    GET_ALL_USERS,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    ADD_NEW_USER,
    ADD_NEW_USER_SUCCESS,
    ADD_NEW_USER_FAIL,
} from "./actionType";

const INIT_STATE = {
    userList: [],
    isLoading: false,
    error: null,
};

const Inspection = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, error: null, isLoading: true }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: action.payload.data,
                error: null,
            }
        case GET_ALL_USERS_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        case ADD_NEW_USER:
            return { ...state, error: null, isLoading: true }
        case ADD_NEW_USER_SUCCESS:
            return { ...state, isLoading: false, error: null }
        case ADD_NEW_USER_FAIL:
            return { ...state, error: action.payload, isLoading: false }
        default:
            return { ...state };
    }
};

export default Inspection;