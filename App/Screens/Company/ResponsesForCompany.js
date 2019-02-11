import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ScrollView, Modal, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import { Input, Button, Picker, Spinner, Thumbnail, Card, CardItem, H3, Item, ListItem } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from 'react-native-image-picker';
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
            fertilizerId: ''
        }
        Ref = this;
    }

    static getDerivedStateFromProps = (props, state) => {

        return null;
    }

    componentDidMount() {
        // this.props.getAllFertilizers(this.props.token);
    }
    static navigationOptions = ({ navigation, }) => {
        console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };

    render() {
        // let iterations = this.props.allFertilizer.length > this.props.allMachines.length ? this.props.allFertilizer.length : this.props.allFertilizer.length < this.props.allMachines.length ? this.props.allMachines.length : this.props.allPesticides.length;
        // let allResponses = [];
        // console.log('iterations: ', iterations)
        // console.log('this.props.allFertilizer: ', this.props.allFertilizer);
        // console.log('this.props.allMachines: ', this.props.allMachines);
        // console.log('this.props.allPesticide: ', this.props.allPesticides);
        // for (let i = 0; i < iterations; i++) {
        //     if (this.props.allFertilizer[i] && this.props.allFertilizer[i].response) {
        //         allResponses = [...allResponses, ...this.props.allFertilizer[i].response]
        //     }
        //     if (this.props.allPesticides[i] && this.props.allPesticides[i].response) {
        //         allResponses = [...allResponses, ...this.props.allPesticides[i].response]
        //     }
        //     if (this.props.allMachines[i] && this.props.allMachines[i].response) {
        //         allResponses = [...allResponses, ...this.props.allMachines[i].response]
        //     }
        // }
        // console.log("allResponses **************************** /*/*: ", allResponses);
        console.log([...this.props.allFertilizer, ...this.props.allMachines, ...this.props.allPesticides]);
        let allResponses = [...this.props.allFertilizer, ...this.props.allMachines, ...this.props.allPesticides];
        return (
            <ScrollView style={{ backgroundColor: "#272727" }} contentContainerStyle={{ height: height - 100, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                    <H3 style={{ color: "#fff" }}>
                        All Responses
                    </H3>
                </View>
                <View style={{ flex: 0.9 }}>

                    <ScrollView style={{ flex: 1 }}>
                        {
                            allResponses.map((item, index) => {
                                console.log('item: ', item)
                                return (
                                    // {
                                    item.response.map((data, i) => {
                                        console.log('data: ', data)
                                        return (
                                            <ListItem key={i + Math.random()} style={{ flexDirection: 'row', fontSize: fontScale * 12, height: height / 3.5 }}>
                                                <View style={{ flex: 0.4, fontSize: fontScale * 12, flexDirection: 'column', height: '100%' }}>
                                                    <View style={{ flex: 0.6 }}>
                                                        <Image
                                                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                            source={{ uri: item.image_url }} />
                                                    </View>
                                                    <View style={{ flex: 0.4 }}>
                                                        <Text style={{ fontSize: fontScale * 12, color: '#fff' }}>
                                                            Product Name:
                                                                {`${item.machineName ? item.machineName : item.name ? item.name : item.pesticideName}`}
                                                        </Text >
                                                        <Text style={{ fontSize: fontScale * 12, color: '#fff' }}>Product Price: {`${item.price}`}</Text>

                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.6, height: '100%', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                                    <View style={{ flex: 0.6 }}>
                                                        <Text style={{ fontSize: fontScale * 12, color: '#fff' }}>Name: {`${data.name}`}</Text>
                                                        <Text style={{ fontSize: fontScale * 12, color: '#fff' }}>Quantity: {`${data.qty}`}</Text>
                                                        <Text style={{ fontSize: fontScale * 12, color: '#fff' }}>Expected Price: {`${data.expectedPrice}`}</Text>
                                                        <Text style={{ fontSize: fontScale * 12, color: '#fff' }}>Email: {`${data.email}`}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.4, borderWidth: 1, borderColor: '#000', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button onPress={() => { this.props.navigation.navigate("chat", { memberInfo: { ...data, _id: null } }) }} style={{ height: height / 15, justifyContent: 'center', alignItems: 'center', paddingHorizontal: width / 40 }}>
                                                            <Text style={{ fontSize: fontScale * 10, color: '#fff' }}>Send Message </Text>
                                                            <Icon name="message-outline" color="#fff" size={12} />
                                                        </Button>
                                                    </View>
                                                </View>
                                            </ListItem>
                                        )
                                    })
                                    // }
                                )
                            })
                        }
                    </ScrollView>
                </View>
                {/* <Text>This is right</Text> */}
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
        allPesticides: state.pesticideReducer.allPesticides,
        allFertilizer: state.fertilizerReducer.allFertilizers,
        allMachines: state.machinaryReducer.allMachines,
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