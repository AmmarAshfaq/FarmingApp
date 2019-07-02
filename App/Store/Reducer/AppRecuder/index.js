import actionTypes from '../../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    addCropResponse: null,
    addProbResponse: null,
    allCrops: [],
    problemList: null,
    cropList: null,
    updateCropResponse: null,
    updateProblemResponse: null,
    machinery: null,
    pesticides: null,
    fertilizers: null,
    fertilizerSubRes: null,
    machinerySubRes: null,
    pesticideSubRes: null,
    cropDetails: null,
    allProblems: null,
    problemComments: null,
    cropDetailsComments: null,
    allUsers: null,
    privateConversation: null,
    weatherResponse: null,
    cityList: [],
    cropRateList:[]

}

export default function appReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ADD_CROP_DATA_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_CROP_DATA_SUCC:
            return { ...state, isProgress: false, addCropResponse: action.payload }
        case actionTypes.ADD_CROP_DATA_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }
        case actionTypes.CLEAR_ADD_CROP_RESPONSE:
            return { ...state, addCropResponse: null }


        case actionTypes.GET_CITY_LIST_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_CITY_LIST_SUCC:
            return { ...state, isProgress: false, cityList: action.payload };
        case actionTypes.GET_CITY_LIST_FAIL:
            return { ...state, isProgress: false, isError: true }


            case actionTypes.GET_CROPRATES_PROG:
                return { ...state, isProgress: true };
            case actionTypes.GET_CROPRATES_SUCC:
                return { ...state, isProgress: false, cropRateList: action.payload };
            case actionTypes.GET_CROPRATES_FAIL:
                return { ...state, isProgress: false, isError: true }

        case actionTypes.ADD_CROP_COMMENT_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_CROP_COMMENT_SUCC:
            let { allCrops } = state;
            allCrops.map(crop => {
                if (crop._id == action.payload.cropId) {
                    crop.comments = action.payload.comments;
                }
            })
            return { ...state, isProgress: false, allCrops }
        case actionTypes.ADD_CROP_COMMENT_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }


        case actionTypes.ADD_PROB_DATA_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_PROB_DATA_SUCC:
            console.log("data comming", action.payload)
            return { ...state, isProgress: false, addProbResponse: action.payload }
        case actionTypes.ADD_PROB_DATA_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }
        case actionTypes.CLEAR_ADD_PROB_RESPONSE:
            return { ...state, addProbResponse: null }

        case actionTypes.GET_WEATHER_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_WEATHER_SUCC:
            return { ...state, isProgress: false, weatherResponse: action.payload };
        case actionTypes.GET_WEATHER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }


        case actionTypes.GET_CROP_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_CROP_SUCC:
            return { ...state, isProgress: false, allCrops: action.payload };
        case actionTypes.GET_CROP_FAIL:
            return { ...state, isProgress: false, isError: true }
            return { ...state, addProbResponse: null };

        case actionTypes.GET_PROBLEMS_BY_ID_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_PROBLEMS_BY_ID_SUCC:
            return { ...state, isProgress: false, problemList: action.payload };
        case actionTypes.GET_PROBLEMS_BY_ID_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };
        case actionTypes.GET_CROPS_BY_ID_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_CROPS_BY_ID_SUCC:
            return { ...state, isProgress: false, cropList: action.payload };
        case actionTypes.GET_CROPS_BY_ID_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.UPDATE_CROP_PROG:
            return { ...state, isProgress: true };
        case actionTypes.UPDATE_CROP_SUCC:
            return { ...state, isProgress: false, updateCropResponse: action.payload };
        case actionTypes.UPDATE_CROP_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };
        case actionTypes.CLEAR_UPDATE_CROP_RESPONSE:
            return { ...state, updateCropResponse: null }

        case actionTypes.UPDATE_PROBLEM_PROG:
            return { ...state, isProgress: true };
        case actionTypes.UPDATE_PROBLEM_SUCC:
            return { ...state, isProgress: false, updateProblemResponse: action.payload };
        case actionTypes.UPDATE_PROBLEM_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };
        case actionTypes.CLEAR_UPDATE_PROB_RESPONSE:
            return { ...state, updateProblemResponse: null };

        case actionTypes.DELETE_CROP_PROG:
            return { ...state, isProgress: true };
        case actionTypes.DELETE_CROP_SUCC:
            let array = state.cropList.filter((value) => {
                return value._id != action.payload;
            })
            return { ...state, isProgress: false, cropList: array };
        case actionTypes.DELETE_CROP_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.DELETE_PROBLEM_PROG:
            return { ...state, isProgress: true };
        case actionTypes.DELETE_PROBLEM_SUCC:
            let newArray = state.problemList.filter((value) => {
                return value._id != action.payload;
            })
            return { ...state, isProgress: false, problemList: newArray };
        case actionTypes.DELETE_PROBLEM_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.GET_MACHINERY_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_MACHINERY_SUCC:
            return { ...state, isProgress: false, machinery: action.payload };
        case actionTypes.GET_MACHINERY_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload, }

        case actionTypes.GET_PESTICIDE_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_PESTICIDE_SUCC:
            return { ...state, isProgress: false, pesticides: action.payload };
        case actionTypes.GET_PESTICIDE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload, }


        case actionTypes.GET_FERTILIZER_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_FERTILIZER_SUCC:
            return { ...state, isProgress: false, fertilizers: action.payload };
        case actionTypes.GET_FERTILIZER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload, };

        case actionTypes.SUBMIT_MACHINERY_RESPONSE_PROG:
            return { ...state, isProgress: true };
        case actionTypes.SUBMIT_MACHINERY_RESPONSE_SUCC:
            return { ...state, isProgress: false, machinerySubRes: action.payload };
        case actionTypes.SUBMIT_MACHINERY_RESPONSE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.SUBMIT_FERTILIZER_RESPONSE_PROG:
            return { ...state, isProgress: true };
        case actionTypes.SUBMIT_FERTILIZER_RESPONSE_SUCC:
            return { ...state, isProgress: false, fertilizerSubRes: action.payload };
        case actionTypes.SUBMIT_FERTILIZER_RESPONSE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.SUBMIT_PESTICIDE_RESPONSE_PROG:
            return { ...state, isProgress: true };
        case actionTypes.SUBMIT_PESTICIDE_RESPONSE_SUCC:
            return { ...state, isProgress: false, pesticideSubRes: action.payload };
        case actionTypes.SUBMIT_PESTICIDE_RESPONSE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.CLEAR_MACHINERY_SUBMIT_RESPONSE:
            return { ...state, machinerySubRes: null };
        case actionTypes.CLEAR_PESTICIDE_SUBMIT_RESPONSE:
            return { ...state, pesticideSubRes: null };
        case actionTypes.CLEAR_FERTILIZER_SUBMIT_RESPONSE:
            return { ...state, fertilizerSubRes: null };


        case actionTypes.GET_CROP_DETAILS_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_CROP_DETAILS_SUCC:
            return { ...state, isProgress: false, cropDetails: action.payload };
        case actionTypes.GET_CROP_DETAILS_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };

        case actionTypes.GET_ALL_PROBLEMS_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_ALL_PROBLEMS_SUCC:
            return { ...state, isProgress: false, allProblems: action.payload };
        case actionTypes.GET_ALL_PROBLEMS_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.ADD_FARMER_PROBLEM_COMMENT_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_FARMER_PROBLEM_COMMENT_SUCC:
            return { ...state, isProgress: false, problemComments: action.payload };
        case actionTypes.ADD_FARMER_PROBLEM_COMMENT_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.ADD_CROP_DETAILS_COMMENT_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_CROP_DETAILS_COMMENT_SUCC:
            return { ...state, isProgress: false, cropDetailsComments: action.payload };
        case actionTypes.ADD_CROP_DETAILS_COMMENT_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.GET_ALL_USERS_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_ALL_USERS_SUCC:
            return { ...state, isProgress: false, allUsers: action.payload };
        case actionTypes.GET_ALL_USERS_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.GET_PRIVATE_CONVERSATION_PROG:
            return { ...state, isProgress: true };
        case actionTypes.GET_PRIVATE_CONVERSATION_SUCC:
            return { ...state, isProgress: false, privateConversation: action.payload };
        case actionTypes.GET_PRIVATE_CONVERSATION_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }



        default:
            return state;
    }
}