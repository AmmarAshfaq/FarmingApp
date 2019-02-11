import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Image, Drawer } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import AuthActions from "../../Store/Actions/AuthActions/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import validator from "validator";
import FarmerPanel from "../../Components/FarmerPanel";
import BuyerPanel from "../../Components/BuyerPanel";
import ExpertPanel from "../../Components/ExpertPanel";
import CompanyPanel from "../../Components/CompanyPanel";
import Company from '../Company';



const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.authReducer["isProgress"],
        user: state.authReducer['user'],
        isError: state.authReducer["isError"],
        errorText: state.authReducer["errorText"],
        token: state.authReducer["token"]

    };
};
const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(AuthActions.signOut()),
        setUnmountFlag: (value) => dispatch(AuthActions.setUnmountFlag(value))
        // getTokenAndUser: (token, user) => dispatch(AuthActions.getUserAndTokenFromAsyncStorage(token, user))

    };
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.drawer = null;
        this.state = { openDawer: true }
    }

    static navigationOptions = ({ navigation, }) => {
        console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerLeft: (
                <TouchableOpacity onPress={navigation.getParam("openDrawer")} style={{ marginLeft: 12, backgroundColor: "transparent" }} ><Icon name="menu" style={{ color: "#fff" }} /></TouchableOpacity>
            ),
        }

    };
    replaceScreen = (route) => {
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            key: `${route}`,
            routeName: `${route}`,
        });
    }
    signOut = () => {
        console.log("this method run from home")
        this.props.signOut();
        this.props.setUnmountFlag(false);
        AsyncStorage.clear().then(() => {
            this.replaceScreen("signIn");
        }).catch(err => {
            console.log("error", err);
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.user && this.props.user.userType == "farmer"
                    ?
                    < FarmerPanel user={this.props.user} navigation={this.props.navigation} signOut={this.signOut} />
                    :
                    this.props.user && this.props.user.userType == "company" ?
                        < Company navigation={this.props.navigation} signOut={this.signOut} />
                        :
                        this.props.user && this.props.user.userType == "buyer" ?
                            <BuyerPanel user={this.props.user} navigation={this.props.navigation} signOut={this.signOut} />
                            :
                            <View />
                }
                {
                    this.props.user && this.props.user.userType == "expert"
                        ?
                        < ExpertPanel user={this.props.user} navigation={this.props.navigation} signOut={this.signOut} />
                        :
                        <View />
                }
            </View>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);  