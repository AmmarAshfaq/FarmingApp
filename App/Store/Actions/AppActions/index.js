import actionTypes from '../../actionTypes';

export default class AppActions {
    static addFertilizer(obj, token) {
        return {
            type: actionTypes.ADD_FERTILIZER_PROG,
            payload: { body: obj, token }
        }
    }
    static addFertilizerResponse(obj, token) {
        return {
            type: actionTypes.ADD_FERTILIZERS_RESPONSE_PROG,
            payload: { body: obj, token }
        }
    }
    static getAllFertilizers(token) {
        return {
            type: actionTypes.GET_FERTILIZER_PROG,
            payload: { token }
        }
    }

    static updateFertilizer(obj, token) {
        return {
            type: actionTypes.UPDATE_FERTILIZER_PROG,
            payload: { body: obj, token }
        }
    }
    static clearUpdateFertilizer() {
        return {
            type: actionTypes.CLEAR_UPDATE_FERTILIZER
        }
    }
    static clearAddFertilizerResponse() {
        return {
            type: actionTypes.CLEAR_ADD_FERTILIZER_RESPONSE
        }
    }
    static deleteFertilizer(obj, token) {
        return {
            type: actionTypes.DELETE_FERTILIZER_PROG,
            payload: { body: obj, token }
        }
    }
    static addMachine(obj, token) {
        return {
            type: actionTypes.ADD_MACHINE_PROG,
            payload: { body: obj, token }

        }
    }
    static addMachineResponse(obj, token) {
        return {
            type: actionTypes.ADD_MACHINE_RESPONSE_PROG,
            payload: { body: obj, token }
        }
    }
    static clearAddMachineResponse() {
        return {
            type: actionTypes.CLEAR_ADD_MACHINES_RESPONSE
        }
    }
    static getAllMachine(token) {
        return {
            type: actionTypes.GET_MACHINE_PROG,
            payload: { token }
        }
    }

    static updateMachine(obj, token) {
        return {
            type: actionTypes.UPDATE_MACHINE_PROG,
            payload: { body: obj, token }
        }
    }
    static clearUpdateMachine() {
        return {
            type: actionTypes.CLEAR_UPDATE_MACHINE
        }
    }
    static deleteMachine(obj, token) {
        return {
            type: actionTypes.DELETE_MACHINE_PROG,
            payload: { body: obj, token }
        }
    }
    static addPesticide(obj, token) {
        return {
            type: actionTypes.ADD_PESTICIDE_PROG,
            payload: { body: obj, token }

        }
    }
    static addPesticideResponse(obj, token) {
        return {
            type: actionTypes.ADD_PESTICIDES_RESPONSE_PROG,
            payload: { body: obj, token }
        }
    }
    static getAllPesticide(token) {
        return {
            type: actionTypes.GET_PESTICIDE_PROG,
            payload: { token }
        }
    }
    static clearUpdatePesticide() {
        return {
            type: actionTypes.CLEAR_UPDATE_PESTICIDE
        }
    }
    static clearAddPesticideResponse() {
        return {
            type: actionTypes.CLEAR_ADD_PESTICIDE_RESPONSE
        }
    }
    static updatePesticide(obj, token) {
        return {
            type: actionTypes.UPDATE_PESTICIDE_PROG,
            payload: { body: obj, token }
        }
    }
    static deletePesticide(obj, token) {
        return {
            type: actionTypes.DELETE_PESTICIDE_PROG,
            payload: { body: obj, token }
        }
    }
    static getFertilizerMachinesPesticides(token) {
        return {
            type: actionTypes.GET_FERTILIZER_MACHINES_PESTICIDES,
            payload: token
        }
    }
    static clearFertilizers() {
        return {
            type: actionTypes.CLEAR_FERTILIZERS
        }
    }
    static clearMachines() {
        return {
            type: actionTypes.CLEAR_MACHINES
        }
    }
    static clearPesticides() {
        return {
            type: actionTypes.CLEAR_PESTICIDES
        }
    }
    static addCropData(token, obj) {
        return {
            type: actionTypes.ADD_CROP_DATA_PROG,
            payload: { body: obj, token }
        }
    }
    static addCropComment(obj, token) {
        return {
            type: actionTypes.ADD_CROP_COMMENT_PROG,
            payload: { body: obj, token }
        }
    }
    static getAllCrops(token) {
        return {
            type: actionTypes.GET_CROP_PROG,
            payload: { token }
        }
    }
    static clearAddCropResponse() {
        return {
            type: actionTypes.CLEAR_ADD_CROP_RESPONSE
        }
    }
    static addProbData(token, obj) {
        return {
            type: actionTypes.ADD_PROB_DATA_PROG,
            payload: { body: obj, token }
        }
    }
    static clearAddProbResponse() {
        return {
            type: actionTypes.CLEAR_ADD_PROB_RESPONSE
        }
    }
    static getCropsById(id, token) {
        return {
            type: actionTypes.GET_CROPS_BY_ID_PROG,
            payload: { id: id, token: token }
        }
    }
    static getProblemsById(id, token) {
        return {
            type: actionTypes.GET_PROBLEMS_BY_ID_PROG,
            payload: { id: id, token: token }
        }
    }
    static updateProblem(obj, token) {
        return {
            type: actionTypes.UPDATE_PROBLEM_PROG,
            payload: { body: obj, token }
        }
    }
    static clearUpdateProbResponse() {
        return {
            type: actionTypes.CLEAR_UPDATE_PROB_RESPONSE
        }
    }
    static updateCrop(obj, token) {
        return {
            type: actionTypes.UPDATE_CROP_PROG,
            payload: { body: obj, token }
        }
    }
    static clearUpdateCropResponse() {
        return {
            type: actionTypes.CLEAR_UPDATE_CROP_RESPONSE
        }
    }
    static deleteCrop(obj, token) {
        return {
            type: actionTypes.DELETE_CROP_PROG,
            payload: { body: obj, token }
        }
    }
    static deleteProblem(obj, token) {
        return {
            type: actionTypes.DELETE_PROBLEM_PROG,
            payload: { body: obj, token }
        }
    }
    static getMachinery(token) {
        return {
            type: actionTypes.GET_MACHINERY_PROG,
            payload: { token }
        }
    }
    static getPesticide(token) {
        return {
            type: actionTypes.GET_PESTICIDE_PROG,
            payload: { token }
        }
    }
    static getFertilizer(token) {
        return {
            type: actionTypes.GET_FERTILIZER_PROG,
            payload: { token }
        }
    }
    static submitMachineryResponse(obj, token) {
        return {
            type: actionTypes.SUBMIT_MACHINERY_RESPONSE_PROG,
            payload: { body: obj, token }
        }
    }
    static submitFertilizerResponse(obj, token) {
        return {
            type: actionTypes.SUBMIT_FERTILIZER_RESPONSE_PROG,
            payload: { body: obj, token }
        }
    }
    static submitPesticideResponse(obj, token) {
        return {
            type: actionTypes.SUBMIT_PESTICIDE_RESPONSE_PROG,
            payload: { body: obj, token }
        }
    }
    static clearMachinerySubmitResponse() {
        return {
            type: actionTypes.CLEAR_MACHINERY_SUBMIT_RESPONSE
        }
    }
    static clearPesticideSubmitResponse() {
        return {
            type: actionTypes.CLEAR_PESTICIDE_SUBMIT_RESPONSE
        }
    }
    static clearFertilizerSubmitResponse() {
        return {
            type: actionTypes.CLEAR_FERTILIZER_SUBMIT_RESPONSE
        }
    }
    static getCropDetails(token) {
        return {
            type: actionTypes.GET_CROP_DETAILS_PROG,
            payload: { token }
        }
    }

    static getAllProblems(token) {
        return {
            type: actionTypes.GET_ALL_PROBLEMS_PROG,
            payload: { token }
        }
    }
    static addFarmerProblemComment(obj, token) {
        return {
            type: actionTypes.ADD_FARMER_PROBLEM_COMMENT_PROG,
            payload: { body: obj, token }
        }
    }
    static addCropDetailsComment(obj, token) {
        return {
            type: actionTypes.ADD_CROP_DETAILS_COMMENT_PROG,
            payload: { body: obj, token }
        }
    }
    static getAllUsers(userType, token) {
        return {
            type: actionTypes.GET_ALL_USERS_PROG,
            payload: { query: userType, token }
        }
    }
    static getPrivateConversation(conversationId, token) {
        return {
            type: actionTypes.GET_PRIVATE_CONVERSATION_PROG,
            payload: { conversationId, token }
        }
    }
}