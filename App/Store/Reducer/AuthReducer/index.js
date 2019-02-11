import actionTypes from '../../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    user: null,
    token: "",
    unmountFlag: false,
}

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.SIGNUP_PROG:
            return { ...state, isProgress: true, };
        case actionTypes.SIGNUP_SUCC:
            return { ...state, isProgress: false, user: action.payload.user, token: action.payload.token };
        case actionTypes.SIGNUP_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };
        case actionTypes.CLEAR_ERROR:
            return { ...state, isError: false, errorText: "" }
        case actionTypes.SIGNIN_PROG:
            return { ...state, isProgress: true };
        case actionTypes.SIGNIN_SUCC:
            return { ...state, isProgress: false, user: action.payload.user, token: action.payload.token };
        case actionTypes.SIGNIN_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };
        case actionTypes.GET_TOKEN_AND_USER:
            return { ...state, token: action.payload.token, user: action.payload.user, unmountFlag: true }
        case actionTypes.SIGN_OUT:
            return { ...state, token: null, user: null }
        case actionTypes.SET_UNMOUNT_FLAG:
            return { ...state, unmountFlag: action.payload }
        default:
            return state;
    }
}