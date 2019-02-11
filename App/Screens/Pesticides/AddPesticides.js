import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, Item, Label, Spinner } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import CompanyPanel from '../../Components/CompanyPanel';
import ImagePicker from 'react-native-image-picker';
import AuthActions from "../../Store/Actions/AuthActions";
import AppAction from '../../Store/Actions/AppActions';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageResizer from 'react-native-image-resizer';
import validator from "validator";
let Ref = {};

class AddMachinary extends Component {
    constructor(props) {
        super(props);
        this.drawer = null;
        this.state = {
            openDawer: true,
            imageSource: '',
            name: '',
            price: '',
            application: ''
        }
        this.options = {
            title: 'Select Picture',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        Ref = this;
    }

    static navigationOptions = ({ navigation, }) => {
        console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };
    static getDerivedStateFromProps = (props, state) => {
        console.log(props)
        if (props.user === null && props.token === null && props.navigation.isFocused()) {
            Ref.replaceScreen('signIn');
        }
        if (props.pesticides.length !== 0 && props.navigation.isFocused()) {
            alert('now fertilizer is added we are going back');
            props.clearPesticides();
            props.navigation.goBack();
        }
        return null;
    }
    replaceScreen = (route) => {
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            key: `${route}`,
            routeName: `${route}`,
        });
    }
    signOut = () => {
        this.props.signOut();
        this.props.setUnmountFlag(false);
        AsyncStorage.clear().then(() => {
            this.replaceScreen("signIn");
        }).catch(err => {
            console.log("error", err);
        });
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

    addMachine = () => {
        let formdata = new FormData();
        let { name, price, application, imageSource } = this.state;
        console.log('imageSource: ', imageSource)
        if (name.trim().length >= 3 && price.trim().length >= 1 && application.trim().length >= 10 && imageSource.uri) {
            let obj = {
                contactNumber: "03002548754",
                contactEmail: this.props.user.email,
                contactName: this.props.user.name,
                location: "lorem lorem lorem lorem lorem",
                address: "lorem lorem lorem lorem lorem"
            }
            formdata.append('companyName', this.props.user.name);
            formdata.append('companyId', this.props.user.id);
            formdata.append('pesticideName', name);
            formdata.append('pesticideDescription', application);
            formdata.append('price', price);
            formdata.append('contactDetails', JSON.stringify(obj));
            formdata.append('image', { uri: imageSource.uri, name: 'image.jpg', type: 'multipart/form-data' })
            console.log('token: ', this.props.token)
            this.props.addPesticide(formdata, this.props.token);
        } else {
            if (name.trim().length == 0) {
                ToastAndroid.show('pesticide name is required', ToastAndroid.SHORT);
                return;
            } else if (price.trim().length == 0) {
                ToastAndroid.show('pesticide price is required', ToastAndroid.SHORT);
                return;
            } else if (application.trim().length == 0) {
                ToastAndroid.show('pesticide application is required', ToastAndroid.SHORT);
                return;
            } else if (!imageSource.uri) {
                ToastAndroid.show('image is required', ToastAndroid.SHORT);
                return;
            }
            ToastAndroid.show('Data badely formated', ToastAndroid.SHORT);
            return;
        }

    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height - 80, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <CompanyPanel navigation={this.props.navigation}
                    signOut={this.signOut}
                    drawerDataArray={[{ name: 'Home' }, { name: 'Messages' }, { name: 'Payment Term' }, { name: 'Notification' }]} >
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <View >
                            <Image source={require('../../../assets/images/pesticide.png')} />
                        </View>
                    </View>
                    <View style={{ flex: 0.6, padding: width * 1 / 20 }}>
                        <View style={{ flex: 1 / 4 }}>
                            <Item style={{ flex: 1 }} >
                                {/* <Label>Username</Label> */}
                                <View style={{ flex: 0.1 }}>
                                    <MaterialCommunityIcons name={"pencil"} size={25} color={"#fff"} />
                                </View>
                                <Input style={{ flex: 0.9, color: '#fff' }} placeholderTextColor="#fff" placeholder="Pesticide Name" onChangeText={(name) => this.setState({ name })} />
                            </Item>
                            {/* <Input placeholder="Fertilizer Name" style={{ borderBottomWidth: 1, borderBottomColor: '#000' }} onChangeText={(name) => this.setState({ name })} /> */}
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <Item style={{ flex: 1 }} >
                                {/* <Label>Username</Label> */}
                                <View style={{ flex: 0.1 }}>
                                    <FontAwesome name={"dollar"} size={25} color={"#fff"} />
                                </View>
                                <Input style={{ flex: 0.9, color: '#fff' }} placeholderTextColor="#fff" placeholder="Price" keyboardType="numeric" onChangeText={(price) => this.setState({ price })} />
                            </Item>
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <Item style={{ flex: 1 }} >
                                {/* <Label>Username</Label> */}
                                <View style={{ flex: 0.1 }}>
                                    <MaterialCommunityIcons name={"application"} size={25} color={"#fff"} />
                                </View>
                                <Input style={{ flex: 0.9, color: '#fff' }} placeholderTextColor="#fff" placeholder="Application" onChangeText={(application) => this.setState({ application })} />
                            </Item>
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <TouchableOpacity onPress={this.takeImage} style={{ flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", marginTop: height / 40 }} >
                                <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                                <Text style={{ alignSelf: "center", color: "#fff" }} >   Add image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        {this.props.isProgress ? <Spinner /> : <Button onPress={this.addMachine} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", borderRadius: width / 12, backgroundColor: "#fafafa" }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                    </View>
                </CompanyPanel>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        isProgress: state.pesticideReducer.isProgress,
        isError: state.pesticideReducer.isError,
        errorText: state.pesticideReducer.errorText,
        pesticides: state.pesticideReducer.pesticides
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addPesticide: (obj, token) => dispatch(AppAction.addPesticide(obj, token)),
        clearPesticides: () => dispatch(AppAction.clearPesticides())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMachinary);  