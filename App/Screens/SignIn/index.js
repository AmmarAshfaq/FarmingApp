import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';
import { Input, Button, Spinner } from "native-base";
import { connect } from 'react-redux';
import validator from 'validator';
import AuthActions from '../../Store/Actions/AuthActions';
const { width, height, scale, fontScale } = Dimensions.get("window");
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const _storeData = async (token, user) => {

    try {
        await AsyncStorage.setItem('token', token, (error) => console.log("error saving data", error));
        await AsyncStorage.setItem("user", JSON.stringify(user), (error) => console.log("error saving data", error))
        console.log("value saved in async storage")

    } catch (error) {
        console.log("store data error", error)
        // Error saving data
    }
}
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '', loading: false
        }
    }
    static getDerivedStateFromProps = (props, state) => {
        console.log('user: ', props.user);
        if (props.user && props.navigation.isFocused() && !props.unmountFlag) {
            try {
                _storeData(props.token, props.user);
                // if (props.user.userType === 'company') {
                props.navigation.dispatch({
                    type: 'ReplaceCurrentScreen',
                    key: `home`,
                    routeName: `home`
                });
                // }
            } catch (e) {
                console.log('error occure: ', e);
            }

        }
        return null;
    }

    componentDidMount() {

        this.setState({ loading: true })
        this._retrieveData();

    }
    replaceScreen = (route) => {
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            key: `${route}`,
            routeName: `${route}`,
        });
    }
    _retrieveData = async () => {
        console.log("in retreive data before await")
        try {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');
            console.log("in retreive data after await")

            this.setState({ loading: false })
            if (token !== null && user !== null) {
                // We have data!!
                // console.log(value);
                // this.props.navigation.navigate("mapScreen");
                this.props.getTokenAndUser(token, JSON.parse(user))
                this.replaceScreen("home")
            }
        } catch (error) {
            // Error retrieving data
            console.log("retreive data error", error)
        }
    }
    signIn = () => {
        let { email, password } = this.state;
        if (validator.isEmail(email) && password.length >= 8) {
            this.props.signIn({
                email,
                password
            });
            return;
        } else if (!validator.isEmail(email)) {
            ToastAndroid.show('Email is badly formated', ToastAndroid.SHORT);
            return;
        } else if (password.length < 8) {
            ToastAndroid.show('Password should be 8 character long', ToastAndroid.SHORT);
            return;
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height - 80, width, backgroundColor: "#272727" }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 1, padding: width / 20, justifyContent: "space-around" }}>
                    <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }} >
                        <Image source={require("../../../assets/images/logo.jpg")} style={{ width: width / 4, height: width / 4 }} />
                    </View>
                    <View style={{ flex: 0.5, justifyContent: "space-around" }}>
                        <View style={{ flex: 0.3, flexDirection: "row", alignItems: "center", borderBottomColor: "#fff", borderBottomWidth: 1 }}>
                            <MaterialCommunityIcons name="email" size={25} color="#fff" />
                            <Input placeholderTextColor={"#fff"} placeholder={"Email"} placeholder="email" style={{ color: "#fff", }} keyboardType={"email-address"} onChangeText={(email) => this.setState({ email })} />
                        </View>
                        <View style={{ flex: 0.3, flexDirection: "row", alignItems: "center", borderBottomColor: "#fff", borderBottomWidth: 1 }}>
                            <Entypo name={"lock"} size={25} color="#fff" />
                            <Input placeholderTextColor={"#fff"} placeholder={"Password"} placeholder="password" style={{ color: "#fff", }} secureTextEntry onChangeText={(password) => this.setState({ password })} />
                        </View>
                        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                            {this.props.isProgress || this.state.loading ?
                                <Spinner color="#786fa6" /> : <Button style={{ marginTop: height / 25, width: width * 0.60, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#fafafa", alignSelf: "center", borderRadius: width / 12 }} onPress={this.signIn}>
                                    <Text style={{ color: '#272727', }}>
                                        Login
                                </Text>
                                </Button>}
                        </View>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: "#0fb9b1", }} >
                                Don't have an account ?
                            <Text style={{ color: "#2bcbba", textDecorationLine: "underline", textDecorationColor: "#fff" }} onPress={() => { this.replaceScreen('signUp') }}>
                                    Register Now
                            </Text>
                            </Text>
                        </View>
                        {/* <View style={{ flex: 0.5 }}>
                            {
                                this.props.isProgress || this.state.loading ?
                                    <Spinner color="blue" />
                                    :
                                    <View></View>
                            }
                        </View> */}
                        {/* <TouchableOpacity onPress={this.props.navigation.push('signUp')}>
                        <Text>
                            signUp
                            </Text>
                    </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isProgress: state.authReducer.isProgress,
        isError: state.authReducer.isError,
        errorText: state.authReducer.errorText,
        user: state.authReducer.user,
        token: state.authReducer["token"],
        unmountFlag: state.authReducer["unmountFlag"]
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        signIn: (obj) => dispatch(AuthActions.signIn(obj)),
        setUser: (obj) => dispatch(AuthActions.setUser(obj)),
        getTokenAndUser: (token, user) => dispatch(AuthActions.getUserAndTokenFromAsyncStorage(token, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);