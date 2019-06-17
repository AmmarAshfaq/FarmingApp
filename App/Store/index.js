import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { createLogger } from 'redux-logger';
// reducers
import authReducer from './Reducer/AuthReducer';
import appRecuder from './Reducer/AppRecuder';
import fertilizerReducer from './Reducer/FertilizerReducer/FertilizerReducer';
import machinaryReducer from './Reducer/MachinaryReducer/MachinaryReducer';
import pesticideReducer from './Reducer/PesticideReducer/PesticideReducer';
// epics

import AuthEpic from './Epics/AuthEpic';
import AppEpic from './Epics/AppEpic';


// const persistedState = loadState();
const loggerMiddleware = createLogger();
// Application Reducers
const rootReducer = combineReducers({
  authReducer,
  appRecuder,
  fertilizerReducer,
  machinaryReducer,
  pesticideReducer
});

export const rootEpic = combineEpics(
  AuthEpic.signUp,
  AuthEpic.signIn,
  AppEpic.addFertilizer,
  AppEpic.addMachine,
  AppEpic.addCropData,
  AppEpic.addProbData,
  AppEpic.addPesticide,
  AppEpic.getFertilizer,
  AppEpic.getMachines,
  AppEpic.getPesticides,
  AppEpic.deleteMachine,
  AppEpic.deleteFertilizer,
  AppEpic.deletePesticide,
  AppEpic.updateMachine,
  AppEpic.updateFertilizer,
  AppEpic.updatePesticide,
  AppEpic.getAllMachines,
  AppEpic.addMachineResponse,
  AppEpic.getAllFertilizer,
  AppEpic.getAllPesticide,
  AppEpic.addFertilizerResponse,
  AppEpic.addPesticideResponse,
  AppEpic.getAllCrops,
  AppEpic.addCropComment,
  AppEpic.getProbById,
  AppEpic.getCropById,
  AppEpic.updateCrop,
  AppEpic.updateProblem,
  AppEpic.deleteCrop,
  AppEpic.deleteProb,
  AppEpic.getMachine,
  AppEpic.getPesticide,
  AppEpic.getFertilizerMachinesPesticides,
  AppEpic.submitMachineryResponse,
  AppEpic.submitFertilizerResponse,
  AppEpic.submitPesticideResponse,
  AppEpic.getCropDetails,
  AppEpic.getAllProblems,
  AppEpic.addFarmerProblemComment,
  AppEpic.addCropDetailsComment,
  AppEpic.getAllUsers,
  AppEpic.getPrivateConversation,
  AppEpic.getWeather

  // more epics functions go here
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware, loggerMiddleware);

export let store = createStore(
  rootReducer,
  createStoreWithMiddleware,
);
// store.subscribe(() => {
//   // saveState(store.getState());
// });
