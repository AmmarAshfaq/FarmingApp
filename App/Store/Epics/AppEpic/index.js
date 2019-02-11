import actionTypes from '../../actionTypes';
import { Observable } from 'rxjs';
import service from "../../Serivces/index";
import { retry } from 'rxjs/operators';
const BASE_URL = "https://boiling-headland-82881.herokuapp.com";


export default class AppEpic {

    // static addFertilizer(action$) {
    //     return action$.ofType(actionTypes.ADD_FERTILIZER_PROG).switchMap(({ payload }) => {
    //         return service.post(`${BASE_URL}/fertilizer/add`, payload.obj, { 'authorization': payload.token, 'Content-Type': 'multipart/form-data' })
    //             .pluck('response')
    //             .map(data => {
    //                 alert(JSON.stringify(data));
    //                 return {
    //                     type: null
    //                 }
    //             })
    //             .catch(error => {
    //                 alert('error from add fertilizer epic: ', JSON.stringify(error));
    //                 return Observable.of({ type: actionTypes.ADD_FERTILIZER_FAIL, payload: error })
    //             })
    //     })
    // }

    static addCropComment(action$) {
        return action$.ofType(actionTypes.ADD_CROP_COMMENT_PROG).switchMap(({ payload }) => {
            console.log('addCropComment payload: ', payload);
            return service.post(`${BASE_URL}/comment/add`, payload.body, { 'authorization': payload.token, 'Content-Type': 'application/json' }).pluck("response").map((obj) => {
                console.log('crop comment added: ', obj);
                return {
                    type: actionTypes.ADD_CROP_COMMENT_SUCC,
                    payload: { comments: obj.comments, cropId: payload.body._id.toString() }
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_CROP_COMMENT_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static addMachineResponse(action$) {
        return action$.ofType(actionTypes.ADD_MACHINE_RESPONSE_PROG).switchMap(({ payload }) => {
            console.log('addMachineResponse payload: ', payload);
            return service.post(`${BASE_URL}/machine/response/add`, payload.body, { 'authorization': payload.token, 'Content-Type': 'application/json' }).pluck("response").map((obj) => {
                console.log('machine response added: ', obj);
                return {
                    type: actionTypes.ADD_MACHINE_RESPONSE_SUCC,
                    payload: obj.response
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_MACHINE_RESPONSE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }
    static addFertilizerResponse(action$) {
        return action$.ofType(actionTypes.ADD_FERTILIZERS_RESPONSE_PROG).switchMap(({ payload }) => {
            console.log('addFertilizerResponse payload: ', payload);
            return service.post(`${BASE_URL}/fertilizer/response/add`, payload.body, { 'authorization': payload.token, 'Content-Type': 'application/json' }).pluck("response").map((obj) => {
                console.log('fertilizer response added: ', obj);
                return {
                    type: actionTypes.ADD_FERTILIZERS_RESPONSE_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_FERTILIZERS_RESPONSE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }
    static addPesticideResponse(action$) {
        return action$.ofType(actionTypes.ADD_PESTICIDES_RESPONSE_PROG).switchMap(({ payload }) => {
            console.log('addPesticideResponse payload: ', payload);
            return service.post(`${BASE_URL}/pesticide/response/add`, payload.body, { 'authorization': payload.token, 'Content-Type': 'application/json' }).pluck("response").map((obj) => {
                console.log('pesticide response added: ', obj);
                return {
                    type: actionTypes.ADD_PESTICIDES_RESPONSE_SUCC,
                    payload: obj.response
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_PESTICIDES_RESPONSE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static getFertilizerMachinesPesticides(action$) {
        return action$.ofType(actionTypes.GET_FERTILIZER_MACHINES_PESTICIDES).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/fertilizer/all`, { 'Content-Type': 'application/json', 'authorization': payload }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.GET_FERTILIZER_SUCC,
                    payload: obj.fertilizers
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.GET_FERTILIZER_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static getAllFertilizer(action$) {
        return action$.ofType(actionTypes.GET_FERTILIZER_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/fertilizer/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.GET_FERTILIZER_SUCC,
                    payload: obj.fertilizers
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.GET_FERTILIZER_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }
    static getAllCrops(action$) {
        return action$.ofType(actionTypes.GET_CROP_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/crop/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.GET_CROP_SUCC,
                    payload: obj.crops
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.GET_CROP_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }
    static getAllPesticide(action$) {
        return action$.ofType(actionTypes.GET_PESTICIDE_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/pesticide/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.GET_PESTICIDE_SUCC,
                    payload: obj.pesticides
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_PESTICIDE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }
    static getAllMachines(action$) {
        return action$.ofType(actionTypes.GET_MACHINE_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/machine/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.GET_MACHINE_SUCC,
                    payload: obj.machines
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.GET_MACHINE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static getMachines(action$) {
        return action$.ofType(actionTypes.GET_FERTILIZER_MACHINES_PESTICIDES).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/machine/all`, { 'Content-Type': 'application/json', 'authorization': payload }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.GET_MACHINE_SUCC,
                    payload: obj.machines
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.GET_MACHINE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static getPesticides(action$) {
        return action$.ofType(actionTypes.GET_FERTILIZER_MACHINES_PESTICIDES).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/pesticide/all`, { 'Content-Type': 'application/json', 'authorization': payload }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.GET_PESTICIDE_SUCC,
                    payload: obj.pesticides
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.GET_PESTICIDE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }


    static addFertilizer(action$) {
        return action$.ofType(actionTypes.ADD_FERTILIZER_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/fertilizer/add`, payload.body, { 'authorization': payload.token, 'Content-Type': 'multipart/form-data' }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.ADD_FERTILIZER_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_FERTILIZER_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }


    static addMachine(action$) {
        return action$.ofType(actionTypes.ADD_MACHINE_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/machine/add`, payload.body, { 'authorization': payload.token, 'Content-Type': 'multipart/form-data' }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.ADD_MACHINE_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_MACHINE_FAIL, payload: error.response ? error.response.error : error.message })
            })

        })
    }

    static updateMachine(action$) {
        return action$.ofType(actionTypes.UPDATE_MACHINE_PROG).switchMap(({ payload }) => {
            return service.put(`${BASE_URL}/machine/update`, payload.body, { 'authorization': payload.token, 'Content-Type': 'multipart/form-data' }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.UPDATE_MACHINE_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.UPDATE_MACHINE_FAIL, payload: error.response ? error.response.error : error.message })
            })

        })
    }

    static updatePesticide(action$) {
        return action$.ofType(actionTypes.UPDATE_PESTICIDE_PROG).switchMap(({ payload }) => {
            return service.put(`${BASE_URL}/pesticide/update`, payload.body, { 'authorization': payload.token, 'Content-Type': 'multipart/form-data' }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.UPDATE_PESTICIDE_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.UPDATE_PESTICIDE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static updateFertilizer(action$) {
        return action$.ofType(actionTypes.UPDATE_FERTILIZER_PROG).switchMap(({ payload }) => {
            return service.put(`${BASE_URL}/fertilizer/update`, payload.body, { 'authorization': payload.token, 'Content-Type': 'multipart/form-data' }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.UPDATE_FERTILIZER_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.UPDATE_FERTILIZER_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static deleteMachine(action$) {
        return action$.ofType(actionTypes.DELETE_MACHINE_PROG).switchMap(({ payload }) => {
            return service.delete(`${BASE_URL}/machine/delete`, payload.body, { 'authorization': payload.token, 'Content-Type': 'application/json' }).pluck("response").map((obj) => {
                console.log("UPDATE machine: ", obj);
                return {
                    type: actionTypes.DELETE_MACHINE_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.DELETE_MACHINE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static deletePesticide(action$) {
        return action$.ofType(actionTypes.DELETE_PESTICIDE_PROG).switchMap(({ payload }) => {
            return service.delete(`${BASE_URL}/pesticide/delete`, payload.body, { 'authorization': payload.token, 'Content-Type': 'application/json' }).pluck("response").map((obj) => {
                console.log("deleted pesticide: ", obj);
                return {
                    type: actionTypes.DELETE_PESTICIDE_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.DELETE_PESTICIDE_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }

    static deleteFertilizer(action$) {
        return action$.ofType(actionTypes.DELETE_FERTILIZER_PROG).switchMap(({ payload }) => {
            return service.delete(`${BASE_URL}/fertilizer/delete`, payload.body, { 'authorization': payload.token, 'Content-Type': 'application/json' }).pluck("response").map((obj) => {
                console.log("deleted fertilizer: ", obj);
                return {
                    type: actionTypes.DELETE_FERTILIZER_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.DELETE_FERTILIZER_FAIL, payload: error.response ? error.response.error : error.message })
            })
        })
    }


    static addPesticide(action$) {
        return action$.ofType(actionTypes.ADD_PESTICIDE_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/pesticide/add`, payload.body, { 'authorization': payload.token, 'Content-Type': 'multipart/form-data' }).pluck("response").map((obj) => {
                console.log(obj)
                return {
                    type: actionTypes.ADD_PESTICIDE_SUCC,
                    payload: obj.data
                }
            }).catch(error => {
                return Observable.of({ type: actionTypes.ADD_PESTICIDE_FAIL, payload: error.response ? error.response.error : error.message })
            })

        })
    }
    static addCropData(action$) {
        return action$.ofType(actionTypes.ADD_CROP_DATA_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/crop/add`, payload.body, { 'Content-Type': 'multipart/form-data', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.ADD_CROP_DATA_SUCC,
                    payload: obj
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.ADD_CROP_DATA_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static addProbData(action$) {
        return action$.ofType(actionTypes.ADD_PROB_DATA_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/problem/add`, payload.body, { 'Content-Type': 'multipart/form-data', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.ADD_PROB_DATA_SUCC,
                    payload: obj
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.ADD_PROB_DATA_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getProbById(action$) {
        return action$.ofType(actionTypes.GET_PROBLEMS_BY_ID_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/problem/farmer/?farmerId=${payload.id}`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.GET_PROBLEMS_BY_ID_SUCC,
                    payload: obj.problems
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_PROBLEMS_BY_ID_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })

    }
    static getCropById(action$) {
        return action$.ofType(actionTypes.GET_CROPS_BY_ID_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/crop/farmer/?farmerId=${payload.id}`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.GET_CROPS_BY_ID_SUCC,
                    payload: obj.cropData
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_CROPS_BY_ID_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })

    }
    static updateProblem(action$) {
        return action$.ofType(actionTypes.UPDATE_PROBLEM_PROG).switchMap(({ payload }) => {
            return service.put(`${BASE_URL}/problem/update`, payload.body, { 'Content-Type': 'multipart/form-data', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.UPDATE_PROBLEM_SUCC,
                    payload: obj
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.UPDATE_PROBLEM_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static updateCrop(action$) {
        return action$.ofType(actionTypes.UPDATE_CROP_PROG).switchMap(({ payload }) => {
            return service.put(`${BASE_URL}/crop/update`, payload.body, { 'Content-Type': 'multipart/form-data', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.UPDATE_CROP_SUCC,
                    payload: obj
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.UPDATE_CROP_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static deleteCrop(action$) {
        return action$.ofType(actionTypes.DELETE_CROP_PROG).switchMap(({ payload }) => {
            return service.delete(`${BASE_URL}/crop/delete`, payload.body, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.DELETE_CROP_SUCC,
                    payload: obj._id
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.DELETE_CROP_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static deleteProb(action$) {
        return action$.ofType(actionTypes.DELETE_PROBLEM_PROG).switchMap(({ payload }) => {
            return service.delete(`${BASE_URL}/problem/delete`, payload.body, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.DELETE_PROBLEM_SUCC,
                    payload: obj._id
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.DELETE_PROBLEM_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getMachine(action$) {
        return action$.ofType(actionTypes.GET_MACHINERY_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/machine/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.GET_MACHINERY_SUCC,
                    payload: obj.machines
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_MACHINERY_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getPesticide(action$) {
        return action$.ofType(actionTypes.GET_PESTICIDE_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/pesticide/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.GET_PESTICIDE_SUCC,
                    payload: obj.pesticides
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_PESTICIDE_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getFertilizer(action$) {
        return action$.ofType(actionTypes.GET_FERTILIZER_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/fertilizer/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.GET_FERTILIZER_SUCC,
                    payload: obj.fertilizers
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_FERTILIZER_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static submitMachineryResponse(action$) {
        return action$.ofType(actionTypes.SUBMIT_MACHINERY_RESPONSE_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/machine/response/add`, payload.body, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.SUBMIT_MACHINERY_RESPONSE_SUCC,
                    payload: obj.response
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.SUBMIT_MACHINERY_RESPONSE_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static submitFertilizerResponse(action$) {
        return action$.ofType(actionTypes.SUBMIT_FERTILIZER_RESPONSE_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/fertilizer/response/add`, payload.body, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.SUBMIT_FERTILIZER_RESPONSE_SUCC,
                    payload: obj.data
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.SUBMIT_FERTILIZER_RESPONSE_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static submitPesticideResponse(action$) {
        return action$.ofType(actionTypes.SUBMIT_PESTICIDE_RESPONSE_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/pesticide/response/add`, payload.body, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.SUBMIT_PESTICIDE_RESPONSE_SUCC,
                    payload: obj.response
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.SUBMIT_PESTICIDE_RESPONSE_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getCropDetails(action$) {
        return action$.ofType(actionTypes.GET_CROP_DETAILS_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/crop/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.GET_CROP_DETAILS_SUCC,
                    payload: obj.crops
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_CROP_DETAILS_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getAllProblems(action$) {
        return action$.ofType(actionTypes.GET_ALL_PROBLEMS_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/problem/all`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.GET_ALL_PROBLEMS_SUCC,
                    payload: obj.problems
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_ALL_PROBLEMS_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static addFarmerProblemComment(action$) {
        return action$.ofType(actionTypes.ADD_FARMER_PROBLEM_COMMENT_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/comment/add`, payload.body, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.ADD_FARMER_PROBLEM_COMMENT_SUCC,
                    payload: obj.comments
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.ADD_FARMER_PROBLEM_COMMENT_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static addCropDetailsComment(action$) {
        return action$.ofType(actionTypes.ADD_CROP_DETAILS_COMMENT_PROG).switchMap(({ payload }) => {
            return service.post(`${BASE_URL}/comment/add`, payload.body, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((obj) => {
                return {
                    type: actionTypes.ADD_CROP_DETAILS_COMMENT_SUCC,
                    payload: obj.comments
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.ADD_CROP_DETAILS_COMMENT_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getAllUsers(action$) {
        return action$.ofType(actionTypes.GET_ALL_USERS_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/allusers/?userType=${payload.query}`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((array) => {
                return {
                    type: actionTypes.GET_ALL_USERS_SUCC,
                    payload: array
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_ALL_USERS_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
    static getPrivateConversation(action$) {
        return action$.ofType(actionTypes.GET_PRIVATE_CONVERSATION_PROG).switchMap(({ payload }) => {
            return service.get(`${BASE_URL}/privateMessage/conversation/${payload.conversationId}`, { 'Content-Type': 'application/json', 'authorization': payload.token }).pluck("response").map((array) => {
                return {
                    type: actionTypes.GET_PRIVATE_CONVERSATION_SUCC,
                    payload: array
                }
            }).catch(err => {
                return Observable.of({ type: actionTypes.GET_PRIVATE_CONVERSATION_FAIL, payload: err.response ? err.response.error : err.message })
            })
        })
    }
}