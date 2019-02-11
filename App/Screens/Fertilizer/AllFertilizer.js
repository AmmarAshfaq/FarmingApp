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

class AllFertilizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            contactNo: '',
            price: '',
            visibleResponseForm: false,
            fertilizerId: '',
            item: {}
        }
        Ref = this;
    }

    static getDerivedStateFromProps = (props, state) => {
        console.log("user", props.user)
        if (props.fertilizerResponse.length && props.navigation.isFocused()) {
            props.clearAddFertilizerResponse();
            Ref.resetvisibleResponseForm();
        }
        return null;
    }

    componentDidMount() {
        this.props.getAllFertilizers(this.props.token);
    }
    static navigationOptions = ({ navigation, }) => {
        // console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };

    visibleResponseForm = (item) => {
        this.setState({ visibleResponseForm: true, fertilizerId: item._id, item });
    }
    resetvisibleResponseForm = () => {
        this.setState({ visibleResponseForm: false });
    }
    addFertilizerResponse = () => {
        let { quantity, price, contactNo, fertilizerId, item } = this.state;
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
                fertilizerId,
                email: this.props.user.email,
                name: this.props.user.name,
                qty: quantity,
                expectedPrice: price,
                senderId: this.props.user.id,
                productName: 'Fertilizer',
                price: item.price
            }
            this.props.addFertilizerResponse(obj, this.props.token);
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height - 80, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 1, backgroundColor: '#272727' }}>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: width / 20, fontWeight: '700', color: '#fff' }}>Fertilizers</Text>
                    </View>
                    <View style={{ flex: 0.8 }}>
                        {
                            this.props.navigation.isFocused() && this.props.allFertilizer && !this.props.isProgress ?
                                <FlatList
                                    style={{ flex: 1 }}
                                    // horizontal={true}
                                    data={this.props.allFertilizer}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item, index }) => {
                                        console.log('item: ', item)
                                        return (
                                            <Card style={{ flex: 0.33, flexDirection: 'column', marginTop: height / 40, marginBottom: height / 40, backgroundColor: '#272727', paddingHorizontal: width / 40 }}>
                                                <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <H3 style={{ marginBottom: height / 40, marginTop: height / 40, color: '#fff' }}>
                                                        {item.name}
                                                    </H3>
                                                </View>
                                                <View style={{ flex: 1 / 5, alignItems: "center" }}>
                                                    <Image
                                                        style={{ width: width * 0.8, height: height / 4 }} resizeMode={"stretch"}
                                                        source={{ uri: item.image_url }} />
                                                </View>
                                                <View style={{ marginBottom: height / 45, marginTop: height / 45, flex: 1 / 5 }}>
                                                    <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Description: </Text>
                                                    <Text style={{ color: '#fff' }}>{item.application}</Text>
                                                </View>
                                                <View style={{ marginBottom: height / 45, marginTop: height / 45, flex: 1 / 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Price: </Text>
                                                    <Text style={{ color: '#fff' }}>{item.price}</Text>
                                                </View>
                                                <View style={{ marginBottom: height / 45, marginTop: height / 45, flex: 1 / 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Button onPress={() => this.visibleResponseForm(item)} style={{ width: width / 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", borderRadius: width / 12 }}>
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
                                Fertilizer Response
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
                            {this.props.isProgress ? <Spinner /> : <Button onPress={this.addFertilizerResponse} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit Response</Text></Button>}
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
        isProgress: state.fertilizerReducer.isProgress,
        isError: state.fertilizerReducer.isError,
        errorText: state.fertilizerReducer.errorText,
        fertilizers: state.fertilizerReducer.fertilizers,
        allFertilizer: state.fertilizerReducer.allFertilizers,
        fertilizerResponse: state.fertilizerReducer.fertilizerResponse
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllFertilizers: (token) => dispatch(AppActions.getAllFertilizers(token)),
        addFertilizerResponse: (obj, token) => dispatch(AppActions.addFertilizerResponse(obj, token)),
        clearAddFertilizerResponse: () => dispatch(AppActions.clearAddFertilizerResponse())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllFertilizer);