import actionTypes from '../../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    fertilizers: [],
    allFertilizers: [],
    fertilizerResponse: []
}

export default function fertilizerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ADD_FERTILIZER_PROG:
            return { ...state, isProgress: true }
        case actionTypes.ADD_FERTILIZER_SUCC:
            return { ...state, isProgress: false, fertilizers: [...state.fertilizers, action.payload] };
        case actionTypes.ADD_FERTILIZER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };




            
        case actionTypes.GET_FERTILIZER_MACHINES_PESTICIDES:
            return { ...state, isProgress: true }
        case actionTypes.GET_FERTILIZER_SUCC:
            return { ...state, isProgress: false, allFertilizers: action.payload }
        case actionTypes.GET_FERTILIZER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }





        case actionTypes.DELETE_FERTILIZER_PROG:
            return { ...state, isProgress: true }
        case actionTypes.DELETE_FERTILIZER_SUCC: {
            let { allFertilizers } = state;
            let newFertilizers = allFertilizers.filter(item => {
                return item._id !== action.payload._id;
            })
            return { ...state, isProgress: false, allFertilizers: newFertilizers };
        }
        case actionTypes.DELETE_FERTILIZER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };





        case actionTypes.UPDATE_FERTILIZER_PROG:
            return { ...state, isProgress: true }
        case actionTypes.UPDATE_FERTILIZER_SUCC: {
            let { allFertilizers } = state;
            allFertilizers.map((data, i) => {
                if (data._id === action.payload._id) {
                    allFertilizers[i] = action.payload;
                }
            })
            return { ...state, isProgress: false, allFertilizers, fertilizers: [...state.fertilizers, action.payload] };
        }
        case actionTypes.UPDATE_FERTILIZER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };



        case actionTypes.ADD_FERTILIZERS_RESPONSE_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_FERTILIZERS_RESPONSE_SUCC:
            return { ...state, isProgress: false, fertilizerResponse: [...state.fertilizerResponse, action.payload] };
        case actionTypes.ADD_FERTILIZERS_RESPONSE_FAIL:
            return { ...state, isProgress: false, errorText: action.payload };
        case actionTypes.CLEAR_ADD_FERTILIZER_RESPONSE:
            return { ...state, fertilizerResponse: [] }






        case actionTypes.CLEAR_FERTILIZERS:
            return { ...state, fertilizers: [] };

        default:
            return state;
    }
}