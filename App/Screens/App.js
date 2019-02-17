/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';

import { Provider } from "react-redux";

import { store } from '../Store/index';
import { createStackNavigator } from "react-navigation"
import SignUp from './SignUp/SignUp';
import PaymentTerm from './PaymentTerm/PaymentTerm';
import Home from './Home/Home';
import Company from './Company';
import SignIn from './SignIn';
import AddFertilizer from './Fertilizer/AddFertilizer';
import AddMachinary from './Machinary/AddMachinary';
import AddCrop from './AddCrop/AddCrop';
import AddPesticide from './Pesticides/AddPesticides';
import AllMachine from './Machinary/AllMachines';
import AllFertilizer from './Fertilizer/AllFertilizer';
import AllPesticide from './Pesticides/AllPesticides';
import AllCrop from './AddCrop/AllCrop';
import AddProblem from './Add Problem/AddProblem';
import CompanyAddedItems from './CompanyAddedItems/CompanyAddedItems';
import FarmerAddedItems from './AddedItems/FarmerAddedItems';
import Machinery from './Machinery/Machinery';
import Pesticides from './Pesticides/Pesticides';
import Fertilizers from './Fertilizers/Fertilizers';
import CropDetails from './CropDetails/CropDetails';
import FarmerProblems from './FarmerProblems/FarmerProblems';
import SolvedProblems from './SolvedProblems/SolvedProblems';
import AllResponses from './Company/ResponsesForCompany';
import MemberList from './Conversation/MemberList';
import CategoryList from './Conversation/CategoryList';
import Chat from './Conversation/Chat';
import CropList from './Crop Rates/CropList';
import CropPrice from './Crop Rates/CropPrice';
import Weather from './Weather/Weather';



export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <View style={{ flex: 1 }} >
          <StatusBar backgroundColor={"#2f3640"} />

          <RootStack />

        </View>
      </Provider>
    );
  }
}

const RootStack = createStackNavigator({
  signUp: SignUp,
  home: Home,
  signIn: SignIn,
  addFertilizer: AddFertilizer,
  addMachinary: AddMachinary,
  addPesticide: AddPesticide,
  addCrop: AddCrop,
  companyAddedItems: CompanyAddedItems,
  allMachine: AllMachine,
  allFertilizer: AllFertilizer,
  allPesticide: AllPesticide,
  allCrop: AllCrop,
  addProb: AddProblem,
  company: Company,
  farmerAddedItems: FarmerAddedItems,
  pesticides: Pesticides,
  machinery: Machinery,
  fertilizers: Fertilizers,
  cropDetails: CropDetails,
  farmerProblems: FarmerProblems,
  solvedProblems: SolvedProblems,
  allResponses: AllResponses,
  memberList: MemberList,
  categoryList: CategoryList,
  chat:Chat,
  cropList:CropList,
  cropPrice:CropPrice,
  weather:Weather,
  paymentTerm:PaymentTerm

}, {
    initialRouteName: "signIn",
    navigationOptions: {
      headerTitle: 'Farmer App',
      headerTitleStyle: { color: "#fff" },
      headerStyle: { backgroundColor: "#353b48" }

    }

  })
const prevGetStateForActionRootStack = RootStack.router.getStateForAction;

RootStack.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    console.log("replace screen action");
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionRootStack(action, state);
};
