import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, Thumbnail } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import AuthActions from "../../Store/Actions/AuthActions/index";
import AppAction from '../../Store/Actions/AppActions';
import Ionicons from "react-native-vector-icons/Ionicons";
import validator from "validator";
import CompanyPanel from "../../Components/CompanyPanel";
let Ref = {};
class Company extends Component {
    constructor(props) {
        super(props);
        this.drawer = null;
        this.state = { openDawer: true }
        Ref = this;
    }

    static navigationOptions = ({ navigation, }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={navigation.getParam("openDrawer")} style={{ marginLeft: 12, backgroundColor: "transparent" }} ><Icon name="menu" style={{ color: "#000" }} /></TouchableOpacity>
            ),
        }
    };
    componentDidMount() {
        this.props.getFertilizerMachinesPesticides(this.props.token);
    }
    static getDerivedStateFromProps = (props, state) => {
        console.log(props)
        if (props.user === null && props.token === null && props.navigation.isFocused()) {
            Ref.replaceScreen('signIn');
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

    render() {
        let { user } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {
                    user && user.userType === 'company' ?
                        <CompanyPanel navigation={this.props.navigation}
                            user={this.props.user}
                            signOut={this.signOut}
                            drawerDataArray={[{ name: 'Home' }, { name: 'Messages', route: (ref) => ref.props.navigation.navigate("categoryList"),
                            icon: require("../../../assets/images/chat.png") }, 
                            // { name: 'Payment Term',icon: require("../../../assets/images/term.png") ,route:(ref)=>ref.props.navigation.navigate("paymentTerm")}
                            ]
                            } >
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ width: width / 4, height: width / 4 }} source={require('../../../assets/images/logo.jpg')} />
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('addFertilizer')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/fertilizer.png')} />
                                        <Text style={{ color: '#fff' }}>Add Fertilizer</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('addMachinary')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/machinary.png')} />
                                        <Text style={{ color: '#fff' }}>Add Machinary</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('addPesticide')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/pesticide.png')} />
                                        <Text style={{ color: '#fff' }}>Add Pesticide</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('companyAddedItems')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/addeditem.png')} />
                                        <Text style={{ color: '#fff' }}>Added Item</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 / 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('allResponses')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/response.png')} />
                                        <Text style={{ color: '#fff' }}>Responses</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CompanyPanel >
                        :
                        <View></View>
                }
            </View>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isProgress: state.authReducer.isProgress,
        isError: state.authReducer.isError,
        errorText: state.authReducer.errorText,
        user: state.authReducer.user,
        token: state.authReducer.token
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(AuthActions.signOut()),
        setUnmountFlag: (value) => dispatch(AuthActions.setUnmountFlag(value)),
        getFertilizerMachinesPesticides: (token) => dispatch(AppAction.getFertilizerMachinesPesticides(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);