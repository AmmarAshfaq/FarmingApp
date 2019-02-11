import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, DatePicker, Spinner, Item } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import AuthActions from "../../Store/Actions/AuthActions/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageResizer from 'react-native-image-resizer';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AppActions from '../../Store/Actions/AppActions/index';
const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.appRecuder["isProgress"],
        user: state.authReducer['user'],
        isError: state.appRecuder["isError"],
        errorText: state.appRecuder["errorText"],
        token: state.authReducer["token"],
        addCropResponse: state.appRecuder["addCropResponse"]

    };
};
const mapDispatchToProps = dispatch => {
    return {
        addCropData: (token, obj) => dispatch(AppActions.addCropData(token, obj)),
        clearAddResponse: () => dispatch(AppActions.clearAddCropResponse())
        // setUnmountFlag: (value) => dispatch(AuthActions.setUnmountFlag(value))
        // getTokenAndUser: (token, user) => dispatch(AuthActions.getUserAndTokenFromAsyncStorage(token, user))

    };
};


class AddCrop extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", weight: "", price: "", date: "", transport: "none", imageSource: "" }
        this.options = {
            title: 'Select Picture',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    }
    setDate = (value) => {
        this.setState({ date: value }, () => {

            alert(this.state.date)
        });
    }
    transportPickerHandler = (value) => {
        this.setState({ transport: value })
    }
    static navigationOptions = ({ navigation, }) => {
        // console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };
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
    submitCropData = () => {
        if (!this.state.name || this.state.name.toString().length < 3) {
            ToastAndroid.show("please fill the name correctly", ToastAndroid.SHORT);
            return;
        } else if (this.state.weight <= 0) {
            ToastAndroid.show("weight should be greater then zero", ToastAndroid.SHORT);
            return;
        } else if (this.state.price <= 0) {
            ToastAndroid.show("price should be greater then zero", ToastAndroid.SHORT);
            return;
        } else if (!this.state.date) {
            ToastAndroid.show("please select completeion date", ToastAndroid.SHORT);
            return;
        } else if (this.state.transport == "none") {
            ToastAndroid.show("please select transport", ToastAndroid.SHORT);
            return;
        } else if (!this.state.imageSource) {
            ToastAndroid.show("please select image", ToastAndroid.SHORT);
            return;
        }
        // let obj = {
        //     name: this.state.name,
        //     weight: this.state.weight,
        //     price: this.state.price,
        //     date: this.state.date,
        //     transport: this.state.transport,
        //     image: this.state.imageSource,
        //     farmerId: this.props.user.id
        // }
        let formdata = new FormData();

        formdata.append("name", this.state.name)
        formdata.append("weight", this.state.weight)
        formdata.append("date", this.state.date.toString())
        formdata.append("transport", this.state.transport)
        formdata.append("price", this.state.price)
        formdata.append("farmerId", this.props.user.id)
        formdata.append("image", { uri: this.state.imageSource.uri, name: 'image.jpg', type: 'multipart/form-data' })
        this.props.addCropData(this.props.token, formdata)
    }
    static getDerivedStateFromProps = (props, state) => {
        console.log('user: ', props.user);
        if (props.addCropResponse && props.navigation.isFocused()) {
            props.clearAddResponse();
            props.navigation.goBack();
        }
        return null;
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
                <View style={{ flex: 1, backgroundColor: '#272727', paddingHorizontal: width / 40 }}  >
                    <View style={{ flex: 0.09, width, alignItems: "center", justifyContent: "center" }} >
                        <Text style={{ fontWeight: "bold", color: '#fff' }} > Add Crop </Text>
                    </View>
                    <View style={{ flex: 0.41, width, justifyContent: "center", alignItems: "center" }} >
                        <Image source={this.state.imageSource || require("../../../assets/images/picture.png")} style={this.state.imageSource ? { width: "80%", height: "100%" } : { width: width / 3, height: height / 6 }} resizeMode={this.state.imageSource ? "stretch" : "contain"} />
                    </View>
                    <View style={{ flex: 0.7 }} >
                        <View style={{ flex: 0.2, }} >
                            <Item style={{ flex: 1 }}>
                                <View style={{ flex: 0.1 }}>
                                    <MaterialCommunityIcons name={"pencil"} size={25} color={"#fff"} />
                                </View>
                                <Input style={{ flex: 0.9, color: '#fff' }} placeholderTextColor={"#fff"} placeholder="name" onChangeText={(name) => this.setState({ name })} />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2, }} >
                            <Item style={{ flex: 1 }}>
                                <View style={{ flex: 0.1 }}>
                                    <MaterialCommunityIcons name={"application"} size={25} color={"#fff"} />
                                </View>
                                <Input style={{ flex: 0.9, color: '#fff' }} placeholderTextColor={"#fff"} placeholder="weight" onChangeText={(weight) => this.setState({ weight })} />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2, }} >
                            <Item style={{ flex: 1 }}>
                                <View style={{ flex: 0.1 }}>
                                    <FontAwesome name={"dollar"} size={25} color={"#fff"} />
                                </View>
                                <Input style={{ flex: 0.9, color: '#fff' }} placeholderTextColor={"#fff"} placeholder="price" onChangeText={(price) => this.setState({ price })} />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2, }} >
                            <DatePicker
                                defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date(1990, 1, 1)}
                                maximumDate={new Date(2030, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select completion date"
                                textStyle={{ color: "#fff" }}
                                placeHolderTextStyle={{ color: "#fff" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </View>
                        <View style={{ flex: 0.2, }} >
                            <Picker
                                mode="dropdown"
                                iosHeader="Select your SIM"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ color: '#fff', backgroundColor: '#272727' }}
                                selectedValue={this.state.transport}
                                onValueChange={this.transportPickerHandler}
                            >
                                <Picker.Item label="Do you want transport" value="none" />
                                <Picker.Item label="True" value={true} />
                                <Picker.Item label="False" value={false} />
                            </Picker>
                        </View>

                        <TouchableOpacity onPress={this.takeImage} style={{ flex: 0.2, flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", alignItems: "center" }} >
                            <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                            <Text style={{ alignSelf: "center", color: "#fff" }} >   Add image</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 0.2 }} >
                            {this.props.isProgress ? <Spinner /> : <Button onPress={this.submitCropData} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", backgroundColor: '#fff' }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCrop);  