import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ScrollView, Modal, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import { Input, Button, Picker, Icon, Spinner, Thumbnail, Card, CardItem, H3, Item } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppActions from '../../Store/Actions/AppActions';
import validator from "validator";

let Ref = {};

class AllPesticide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            contactNo: '',
            price: '',
            visibleResponseForm: false,
            pesticideId: '',
            item: {}
        }
        Ref = this;
    }

    static getDerivedStateFromProps = (props, state) => {
        console.log("user", props.user)
        if (props.pesticideResponse.length && props.navigation.isFocused()) {
            props.clearAddPesticideResponse();
            Ref.resetvisibleResponseForm();
        }
        return null;
    }

    componentDidMount() {
        this.props.getAllPesticide(this.props.token);
    }
    static navigationOptions = ({ navigation, }) => {
        // console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };

    visibleResponseForm = (item) => {
        this.setState({ visibleResponseForm: true, pesticideId: item._id, item });
    }
    resetvisibleResponseForm = () => {
        this.setState({ visibleResponseForm: false });
    }
    addPesticideResponse = () => {
        let { quantity, price, contactNo, pesticideId, item } = this.state;
        if (!quantity.trim().length) {
            ToastAndroid.show('quantity must be greater than 0', ToastAndroid.SHORT);
            return;
        } else if (!price.trim().length || !(price > '0' && price < '9999999')) {
            ToastAndroid.show('expected price is required', ToastAndroid.SHORT);
            return;
        }
        //  else if (!contactNo.trim().length === 11) {
        //     ToastAndroid.show('contact no must be 11 character long', ToastAndroid.SHORT);
        //     return;
        // } 
        else {
            let obj = {
                pesticideId,
                email: this.props.user.email,
                name: this.props.user.name,
                qty: quantity,
                expectedPrice: price,
                senderId: this.props.user.id,
                productName: 'Pesticide',
                price: item.price
            }
            this.props.addPesticideResponse(obj, this.props.token);
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height - 80, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 1, backgroundColor: '#272727' }}>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: width / 20, fontWeight: '700', color: '#fff' }}>Pesticide</Text>
                    </View>
                    <View style={{ flex: 0.8 }}>
                        {
                            this.props.navigation.isFocused() && this.props.allPesticide && !this.props.isProgress ?
                                <FlatList
                                    style={{ flex: 1 }}
                                    // horizontal={true}
                                    data={this.props.allPesticide}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item, index }) => {
                                        console.log('item: ', item)
                                        return (
                                            <Card style={{ flex: 0.33, flexDirection: 'column', marginTop: height / 40, marginBottom: height / 40, backgroundColor: '#272727', paddingHorizontal: width / 40 }}>
                                                <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <H3 style={{ marginBottom: height / 40, marginTop: height / 40, color: '#fff' }}>
                                                        {item.pesticideName}
                                                    </H3>
                                                </View>
                                                <View style={{ flex: 1 / 6, alignItems: "center" }}>
                                                    <Image
                                                        style={{ width: width * 0.8, height: height / 4 }} resizeMode={"stretch"}
                                                        source={{
                                                            uri: item.image_url

                                                        }} />
                                                </View>
                                                <View style={{ marginBottom: height / 45, marginTop: height / 45, flex: 1 / 5 }}>
                                                    <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Description: </Text>
                                                    <Text style={{ color: '#fff' }}>{item.pesticideDescription}</Text>
                                                </View>
                                                <View style={{ marginBottom: height / 45, marginTop: height / 45, flex: 1 / 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Price: </Text>
                                                    <Text style={{ color: '#fff' }}>{item.price}</Text>
                                                </View>
                                                <View style={{ marginBottom: height / 45, marginTop: height / 45, flex: 1 / 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Button onPress={() => this.visibleResponseForm(item)} style={{ width: width / 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: width / 12 }}>
                                                        <Text style={{ color: '#272727' }}>From</Text>
                                                    </Button>
                                                </View>
                                            </Card>
                                        )
                                    }
                                    } />
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Spinner />
                                </View>
                        }
                    </View>
                </View>
                {/* ******************************************** RESPONSE FORM ************************ */}
                <Modal
                    presentationStyle={"fullScreen"}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.visibleResponseForm}
                    onRequestClose={() => {
                        this.resetvisibleResponseForm();
                    }}>
                    <ScrollView style={{ backgroundColor: '#272727' }} contentContainerStyle={{ height, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <H3 style={{ color: '#fff' }}>
                                Pesticide Response
                            </H3>
                        </View>
                        <View style={{ flex: 0.6, padding: width * 1 / 20 }}>
                            <View style={{ flex: 1 / 4 }}>
                                <Item style={{ flex: 1 }}>
                                    <View style={{ flex: 0.1 }}>
                                        <MaterialCommunityIcons name={"pencil"} size={25} color={"#fff"} />
                                    </View>
                                    <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Name" disabled={true} value={this.props.user.name} />
                                </Item>
                                {/* <Input placeholder="Fertilizer Name" style={{ borderBottomWidth: 1, borderBottomColor: '#000' }} onChangeText={(name) => this.setState({ name })} /> */}
                            </View>
                            <View style={{ flex: 1 / 4 }}>
                                <Item style={{ flex: 1 }}>
                                    <View style={{ flex: 0.1 }}>
                                        <MaterialCommunityIcons name={"email"} size={25} color={"#fff"} />
                                    </View>
                                    <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Email" disabled={true} value={this.props.user.email} />
                                </Item>
                            </View>
                            <View style={{ flex: 1 / 4 }}>
                                <Item style={{ flex: 1 }}>
                                    <View style={{ flex: 0.1 }}>
                                        <MaterialCommunityIcons name={"counter"} size={25} color={"#fff"} />
                                    </View>
                                    <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Quantity" keyboardType="numeric" onChangeText={(quantity) => this.setState({ quantity })} />
                                </Item>
                            </View>
                            {/* <View style={{ flex: 1 / 5 }}>
                                <Item>
                                    <Input placeholder="Contact No" keyboardType="phone-pad" onChangeText={(contactNo) => this.setState({ contactNo })} />
                                </Item>
                            </View> */}
                            <View style={{ flex: 1 / 4 }}>
                                <Item style={{ flex: 1 }}>
                                    <View style={{ flex: 0.1 }}>
                                        <FontAwesome name={"dollar"} size={25} color={"#fff"} />
                                    </View>
                                    <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Expected Price" keyboardType="numeric" onChangeText={(price) => this.setState({ price })} />
                                </Item>
                            </View>
                        </View>
                        <View style={{ flex: 0.2 }}>
                            {this.props.isProgress ? <Spinner /> : <Button onPress={this.addPesticideResponse} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit Response</Text></Button>}
                        </View>
                    </ScrollView>
                </Modal>
                {/* ******************************************** RESPONSE FORM ************************ */}
            </ScrollView>
        )
    }
}


const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.authReducer["isProgress"],
        user: state.authReducer['user'],
        isError: state.authReducer["isError"],
        errorText: state.authReducer["errorText"],
        token: state.authReducer["token"],


        isProgress: state.pesticideReducer.isProgress,
        isError: state.pesticideReducer.isError,
        errorText: state.pesticideReducer.errorText,
        pesticides: state.pesticideReducer.pesticides,
        allPesticide: state.pesticideReducer.allPesticides,
        pesticideResponse: state.pesticideReducer.pesticideResponse
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllPesticide: (token) => dispatch(AppActions.getAllPesticide(token)),
        addPesticideResponse: (obj, token) => dispatch(AppActions.addPesticideResponse(obj, token)),
        clearAddPesticideResponse: () => dispatch(AppActions.clearAddPesticideResponse())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllPesticide);





















// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, Modal } from 'react-native';
// import { Input, Button, Picker, Icon, Drawer, Thumbnail, ListItem, Textarea, Spinner } from "native-base";
// const { width, height, scale, fontScale } = Dimensions.get("window");
// import { connect } from "react-redux";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import AppActions from '../../Store/Actions/AppActions/index';
// import validator from "validator";

// const mapStateToProps = state => {
//     console.log("reducer state", state);
//     return {
//         isProgress: state.appRecuder["isProgress"],
//         user: state.authReducer['user'],
//         isError: state.appRecuder["isError"],
//         errorText: state.appRecuder["errorText"],
//         token: state.authReducer["token"],
//         pesticides: state.appRecuder["pesticides"],
//         pesticideSubRes: state.appRecuder["pesticideSubRes"]

//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         getPesticide: (token) => dispatch(AppActions.getPesticide(token)),
//         submitPesticideResponse: (obj, token) => dispatch(AppActions.submitPesticideResponse(obj, token)),
//         clearPesticideSubmitResponse: () => dispatch(AppActions.clearPesticideSubmitResponse())

//     };
// };
// class Pesticides extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { showModal: false, pesticideId: "", name: "", email: "", quantity: "", price: "" }

//     }
//     componentDidMount() {
//         this.props.getPesticide(this.props.token)
//     }
//     static getDerivedStateFromProps(props, state) {
//         if (props.pesticideSubRes && state.showModal && props.navigation.isFocused()) {
//             props.clearPesticideSubmitResponse();
//             return {
//                 showModal: false
//             }
//         }
//         return null;
//     }
//     showForm = (index) => {
//         let { _id } = this.props.pesticides[index];
//         this.setState({ showModal: true, pesticideId: _id });
//     }
//     submitForm = () => {
//         if (!this.state.name || this.state.name.toString().length < 3) {
//             ToastAndroid.show("please fill the name correctly", ToastAndroid.SHORT);
//             return;
//         }
//         else if (!validator.isEmail(this.state.email)) {
//             ToastAndroid.show("please give correct email", ToastAndroid.SHORT);
//             return;

//         }
//         else if (this.state.price <= 0) {
//             ToastAndroid.show("price must be greater than zero", ToastAndroid.SHORT);
//             return;
//         }
//         else if (this.state.quantity <= 0) {
//             ToastAndroid.show("quanity should be greater than zero");
//             return;
//         }
//         let obj = {
//             name: this.state.name,
//             email: this.state.email,
//             qty: this.state.quantity,
//             expectedPrice: this.state.price,
//             senderId: this.props.user.id,
//             pesticideId: this.state.pesticideId
//         }
//         console.log("submit object", obj)
//         this.props.submitPesticideResponse(obj, this.props.token);

//     }
//     render() {
//         return (
//             <View style={{ flex: 1 }} >
//                 <View style={{ flex: 0.1, alignItems: "center" }} >
//                     <Text style={{ color: "#000", fontWeight: "bold", fontSize: fontScale * 20 }} >Pesticides</Text>
//                 </View>
//                 {this.props.isProgress ?
//                     <Spinner />
//                     :
//                     <View style={{ flex: 0.9 }} >
//                         <FlatList data={this.props.pesticides && this.props.pesticides} renderItem={({ item, index }) =>
//                             <ListItem>
//                                 <View style={{ flex: 1 }} >
//                                     <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }} >
//                                         <Image source={item.image_url ? { uri: item.image_url } : require("../../../assets/images/pesticide2.jpeg")} style={{ width: width * 0.8, height: height / 4 }} resizeMode={item.image_url ? "stretch" : "contain"} />
//                                     </View>
//                                     <View style={{ flex: 0.4 }} >
//                                         <View style={{ flexDirection: "row", flex: 0.1 }} >
//                                             <Text style={{ fontWeight: "bold" }} >Name: </Text><Text>{`${item.pesticideName}\n`}</Text>
//                                         </View>
//                                         <View style={{ flex: 0.8 }} >
//                                             <Text style={{ fontWeight: "bold" }} >Description: </Text><Text>{`${item.pesticideDescription}\n`}</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row", flex: 0.1 }} >
//                                             <Text style={{ fontWeight: "bold" }} >Price: </Text><Text  >{`${item.price}\n`}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }} >
//                                         <Button onPress={() => this.showForm(index)} style={{ width: width * 0.25, justifyContent: "center", alignItems: "center", alignSelf: "center" }} >
//                                             <Text style={{ color: "#fff" }} >form</Text>
//                                         </Button>
//                                     </View>
//                                 </View>
//                             </ListItem>

//                         } />
//                     </View>}
//                 <Modal presentationStyle={"fullScreen"} visible={this.state.showModal} onRequestClose={() => { !this.props.isProgress && this.setState({ showModal: false }) }} >
//                     <ScrollView contentContainerStyle={{ height: height - 100, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >

//                         <View style={{ flex: 1 }}  >
//                             <View style={{ flex: 0.05, width, alignItems: "center", justifyContent: "center" }} >
//                                 <Text style={{ fontWeight: "bold" }} >Form</Text>
//                             </View>

//                             <View style={{ flex: 0.7 }} >
//                                 <View style={{ flex: 0.2, }} >
//                                     <Input placeholder="Name" onChangeText={(name) => this.setState({ name })} />
//                                 </View>
//                                 <View style={{ flex: 0.2, }} >
//                                     <Input placeholder="email" onChangeText={(email) => this.setState({ email })} />
//                                 </View>
//                                 <View style={{ flex: 0.2, }} >
//                                     <Input placeholder="Quantity" onChangeText={(quantity) => this.setState({ quantity })} />
//                                 </View>
//                                 <View style={{ flex: 0.2, }} >
//                                     <Input placeholder="Price" onChangeText={(price) => this.setState({ price })} />
//                                 </View>
//                                 <View style={{ flex: 0.2 }} >
//                                     {this.props.isProgress ? <Spinner /> : <Button onPress={this.submitForm} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center" }} ><Text style={{ alignSelf: "center", color: "#fff" }} >Submit</Text></Button>}
//                                 </View>
//                             </View>
//                         </View>
//                     </ScrollView>
//                 </Modal>
//             </View>
//         )
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Pesticides);  