import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Spinner } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
// import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import AuthActions from "../../Store/Actions/AuthActions/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImageResizer from 'react-native-image-resizer';
import validator from "validator";


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
        signUp: (payload) => { dispatch(AuthActions.signUp(payload)) },
        clearError: () => dispatch(AuthActions.clearError()),
        // getTokenAndUser: (token, user) => dispatch(AuthActions.getUserAndTokenFromAsyncStorage(token, user))

    };
};

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






class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { imageSource: "", userType: "none", name: "", email: "", password: "", confirmPassword: "" }
        this.options = {
            title: 'Select Picture',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    }
    userTypeHandler = (value) => {
        this.setState({ userType: value })
    }

    signUpUser = () => {
        if (!this.state.name || this.state.name.toString().length < 3) {
            ToastAndroid.show("please fill the name correctly", ToastAndroid.SHORT);
            return;
        } else if (!validator.isEmail(this.state.email)) {
            ToastAndroid.show("please fill the email correctly", ToastAndroid.SHORT);
            return;
        } else if (this.state.userType == "none") {
            ToastAndroid.show("please select usertype", ToastAndroid.SHORT);
            return;
        } else if (this.state.password.toString().length < 8) {
            ToastAndroid.show("password must be of 8 characters", ToastAndroid.SHORT);
            return;
        } else if (this.state.password !== this.state.confirmPassword) {
            ToastAndroid.show("password mismatch", ToastAndroid.SHORT);
            return;
        } else if (!this.state.imageSource) {
            ToastAndroid.show("please select image", ToastAndroid.SHORT);
            return;
        }
        this.props.clearError();
        let formdata = new FormData();

        formdata.append("name", this.state.name)
        formdata.append("email", this.state.email)
        formdata.append("password", this.state.password)
        formdata.append("userType", this.state.userType)
        formdata.append("image", { uri: this.state.imageSource.uri, name: 'image.jpg', type: 'multipart/form-data' })
        this.props.signUp(formdata);

    }
    static getDerivedStateFromProps = (props, state) => {
        console.log("user", props.user)
        if (props.user && props.navigation.isFocused()) {
            try {
                console.log("token", props.token)
                // await AsyncStorage.setItem('token', token);

                _storeData(props.token, props.user);
                props.navigation.dispatch({
                    type: 'ReplaceCurrentScreen',
                    key: `home`,
                    routeName: `home`,
                });
            } catch (error) {
                // Error saving data
            }
        }
        return null;
    }

    takeImage = () => {
        ImagePicker.showImagePicker(this.options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let newWidth = 800;
                let newHeight = 650;
                ImageResizer.createResizedImage(response.uri, newWidth, newHeight, 'JPEG', 100, 0)
                    .then(uri => {
                        // send to backend
                        console.log('URI after compressed: ', uri)
                        const source = { uri: uri.uri };
                        this.setState({
                            imageSource: source,
                        }, () => { alert(JSON.stringify(this.state.imageSource)) });
                    })
            }
        });
    }
    replaceScreen = (route) => {
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            key: `${route}`,
            routeName: `${route}`,
        });
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height - 80, width, backgroundColor: "#272727", padding: width / 20 }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <View pointerEvents={(this.props.isProgress) ? "none" : "auto"} style={{ flex: 1, alignItems: "center" }} >
                    <View style={{ flex: 0.2, justifyContent: "center" }} >
                        <Image source={require("../../../assets/images/logo.jpg")} style={{ width: width / 4, height: width / 4 }} />
                    </View>
                    <View style={{ flex: 0.5, width, padding: width / 20 }} >
                        <View style={{ flex: 0.2, flexDirection: "row", alignItems: "center", borderBottomColor: "#fff", borderBottomWidth: 1 }} >
                            <Entypo name={"user"} size={25} color="#fff" />
                            <Input placeholder="username" style={{ color: "#fff", }} placeholderTextColor={"#fff"} onChangeText={(name) => this.setState({ name })} />
                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row", borderBottomColor: "#fff", alignItems: "center", borderBottomWidth: 1 }} >
                            <MaterialCommunityIcons name="email" size={25} color="#fff" />
                            <Input placeholder="email" style={{ color: "#fff", }} placeholderTextColor={"#fff"} keyboardType={"email-address"} onChangeText={(email) => this.setState({ email })} />
                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row", borderBottomColor: "#fff", alignItems: "center", borderBottomWidth: 1 }} >
                            <Entypo name={"add-user"} size={25} color="#fff" />
                            <Picker
                                mode="dropdown"
                                iosHeader="Select your SIM"
                                iosIcon={<Icon name="ios-arrow-down-outline" style={{ color: "#fff" }} />}
                                style={{ color: "#fff", }}
                                itemStyle={{ backgroundColor: "#000", }}
                                selectedValue={this.state.userType}
                                onValueChange={this.userTypeHandler}


                            >
                                <Picker.Item label="select user type" value="none" />
                                <Picker.Item label="Farmer" value="farmer" />
                                <Picker.Item label="Buyer" value="buyer" />
                                <Picker.Item label="Expert" value="expert" />
                                <Picker.Item label="Company" value="company" />
                            </Picker>

                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row", borderBottomColor: "#fff", alignItems: "center", borderBottomWidth: 1 }} >
                            <Entypo name={"lock"} size={25} color="#fff" />
                            <Input style={{ color: "#fff", }} placeholder="password" placeholderTextColor={"#fff"} secureTextEntry onChangeText={(password) => this.setState({ password })} />
                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row", borderBottomColor: "#fff", alignItems: "center", borderBottomWidth: 1 }}>
                            <Entypo name={"lock"} size={25} color="#fff" />
                            <Input style={{ color: "#fff", }} placeholder="confirm password" placeholderTextColor={"#fff"} secureTextEntry onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />
                        </View>
                    </View>



                    <View style={{ flex: 0.2, justifyContent: "space-around" }} >

                        <TouchableOpacity onPress={this.takeImage} style={{ flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center" }} >
                            <Ionicons name={"ios-add-circle-outline"} size={40} style={{ color: "#fff" }} />
                            <Text style={{ alignSelf: "center", color: "#fff" }} >   Add image</Text>
                        </TouchableOpacity>

                        {this.props.isProgress ? <Spinner color="#786fa6" /> : <Button onPress={this.signUpUser} style={{ alignSelf: "center", width: width * 0.60, justifyContent: "center", borderRadius: width / 12, backgroundColor: "#fafafa" }} ><Text style={{ alignSelf: "center", color: "#272727" }} >SignUp</Text></Button>}
                    </View>



                    <View style={{ flex: 0.1 }}>
                        <Text style={{ color: "#0fb9b1", }} >
                            Already an account ?
                            <Text style={{ color: "#2bcbba", textDecorationLine: "underline", textDecorationColor: "#fff" }} onPress={() => this.replaceScreen('signIn')}>
                                signin
                            </Text>
                        </Text>
                        {
                            this.props.isError && <Text tyle={{ color: "#eb3b5a", }}  >{this.props.errorText}</Text>
                        }
                    </View>
                </View>
            </ScrollView>

        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);  