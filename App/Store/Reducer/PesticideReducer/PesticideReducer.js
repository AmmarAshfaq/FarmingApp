import actionTypes from '../../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    pesticides: [],
    allPesticides: [],
    pesticideResponse: []
}

export default function pesticideReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ADD_PESTICIDE_PROG:
            return { ...state, isProgress: true }
        case actionTypes.ADD_PESTICIDE_SUCC:
            return { ...state, isProgress: false, pesticides: [...state.pesticides, action.payload] };
        case actionTypes.ADD_PESTICIDE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };

        case actionTypes.GET_FERTILIZER_MACHINES_PESTICIDES:
            return { ...state, isProgress: true }
        case actionTypes.GET_PESTICIDE_SUCC:
            return { ...state, isProgress: false, allPesticides: action.payload }
        case actionTypes.GET_PESTICIDE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }

        case actionTypes.DELETE_PESTICIDE_PROG:
            return { ...state, isProgress: true }
        case actionTypes.DELETE_PESTICIDE_SUCC: {
            let { allPesticides } = state;
            let newPesticides = allPesticides.filter(item => {
                return item._id !== action.payload._id;
            })
            return { ...state, isProgress: false, allPesticides: newPesticides };
        }
        case actionTypes.DELETE_PESTICIDE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };




        case actionTypes.UPDATE_PESTICIDE_PROG:
            return { ...state, isProgress: true }
        case actionTypes.UPDATE_PESTICIDE_SUCC: {
            let { allPesticides } = state;
            allPesticides.map((data, i) => {
                if (data._id === action.payload._id) {
                    allPesticides[i] = action.payload;
                }
            })
            return { ...state, isProgress: false, allPesticides, pesticides: [...state.pesticides, action.payload] };
        }
        case actionTypes.UPDATE_PESTICIDE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };



        case actionTypes.ADD_PESTICIDES_RESPONSE_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_PESTICIDES_RESPONSE_SUCC:
            return { ...state, isProgress: false, pesticideResponse: [...state.pesticideResponse, ...action.payload] };
        case actionTypes.ADD_PESTICIDES_RESPONSE_FAIL:
            return { ...state, isProgress: false, errorText: action.payload };
        case actionTypes.CLEAR_ADD_PESTICIDE_RESPONSE:
            return { ...state, pesticideResponse: [] }




        case actionTypes.CLEAR_PESTICIDES:
            return { ...state, pesticides: [] }

        default:
            return state;
    }
}