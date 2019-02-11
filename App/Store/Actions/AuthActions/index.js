import actionTypes from '../../actionTypes';

export default class AuthActions {
    static signUp(obj) {
        return {
            type: actionTypes.SIGNUP_PROG,
            payload: obj
        }
    }
    static signIn(obj) {
        return {
            type: actionTypes.SIGNIN_PROG,
            payload: obj
        }
    }
    static setUser(obj) {
        return {
            type: actionTypes.SET_USER,
            payload: obj
        }
    }
    static clearError() {
        return {
            type: actionTypes.CLEAR_ERROR
        }
    }
    static getUserAndTokenFromAsyncStorage(token, user) {
        return {
            type: actionTypes.GET_TOKEN_AND_USER,
            payload: { token, user }
        }
    }
    static signOut() {
        return {
            type: actionTypes.SIGN_OUT,
        }
    }
    static setUnmountFlag(value) {
        return {
            type: actionTypes.SET_UNMOUNT_FLAG,
            payload: value
        }
    }
}