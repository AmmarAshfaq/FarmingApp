import actionTypes from '../../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    machines: [],
    allMachines: [],
    machineResponse: []

}

export default function machinaryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ADD_MACHINE_PROG:
            return { ...state, isProgress: true }
        case actionTypes.ADD_MACHINE_SUCC:
            return { ...state, isProgress: false, machines: [...state.machines, action.payload] };
        case actionTypes.ADD_MACHINE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };



        case actionTypes.GET_FERTILIZER_MACHINES_PESTICIDES:
            return { ...state, isProgress: true }
        case actionTypes.GET_MACHINE_SUCC:
            return { ...state, isProgress: false, allMachines: action.payload }
        case actionTypes.GET_MACHINE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload }



        case actionTypes.DELETE_MACHINE_PROG:
            return { ...state, isProgress: true }
        case actionTypes.DELETE_MACHINE_SUCC: {
            let { allMachines } = state;
            let newMachines = allMachines.filter(item => {
                return item._id !== action.payload._id;
            })
            return { ...state, isProgress: false, allMachines: newMachines };
        }
        case actionTypes.DELETE_MACHINE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };




        case actionTypes.UPDATE_MACHINE_PROG:
            return { ...state, isProgress: true }
        case actionTypes.UPDATE_MACHINE_SUCC: {
            let { allMachines } = state;
            allMachines.map((data, i) => {
                if (data._id === action.payload._id) {
                    allMachines[i] = action.payload;
                }
            })
            return { ...state, isProgress: false, allMachines, machines: [...state.machines, action.payload] };
        }
        case actionTypes.UPDATE_MACHINE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload };



        case actionTypes.ADD_MACHINE_RESPONSE_PROG:
            return { ...state, isProgress: true };
        case actionTypes.ADD_MACHINE_RESPONSE_SUCC:
            return { ...state, isProgress: false, machineResponse: [...state.machineResponse, action.payload] };
        case actionTypes.ADD_MACHINE_RESPONSE_FAIL:
            return { ...state, isProgress: false, errorText: action.payload };
        case actionTypes.CLEAR_ADD_MACHINES_RESPONSE:
            return { ...state, machineResponse: [] }


        case actionTypes.CLEAR_MACHINES:
            return { ...state, machines: [] }

        default:
            return state;
    }
}