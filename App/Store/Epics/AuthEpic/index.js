import actionTypes from '../../actionTypes';
import { Observable } from 'rxjs';
import service from "../../Serivces/index";
import HttpService from '../../Serivces/index';
const BASE_URL = "https://boiling-headland-82881.herokuapp.com";

export default class AuthEpic {

    static signUp(action$) {
        return action$.ofType(actionTypes.SIGNUP_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/signup`, payload, { 'Content-Type': 'multipart/form-data' }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.SIGNUP_SUCC,
                    payload: obj
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.SIGNUP_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static signIn(action$) {
        return action$.ofType(actionTypes.SIGNIN_PROG).switchMap(({ payload }) => {
            return HttpService.post(`${BASE_URL}/signin`, payload)
                .pluck('response')
                .map(data => {
                    return {
                        type: actionTypes.SIGNIN_SUCC,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionTypes.SIGNIN_FAIL,
                        payload: error.response ? error.response.error : error.message
                    })
                })
        })
    }
}