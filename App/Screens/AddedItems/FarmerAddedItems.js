import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, Modal } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, ListItem, Card, DatePicker, Spinner } from "native-base";
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
import AppActions from '../../Store/Actions/AppActions/index';



const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.appRecuder["isProgress"],
        user: state.authReducer['user'],
        isError: state.appRecuder["isError"],
        errorText: state.appRecuder["errorText"],
        token: state.authReducer["token"],
        problemList: state.appRecuder["problemList"],
        cropList: state.appRecuder["cropList"],
        updateCropResponse: state.appRecuder["updateCropResponse"],
        updateProblemResponse: state.appRecuder["updateProblemResponse"]

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getCropsById: (id, token) => dispatch(AppActions.getCropsById(id, token)),
        getProblemsById: (id, token) => dispatch(AppActions.getProblemsById(id, token)),
        updateCrop: (obj, token) => dispatch(AppActions.updateCrop(obj, token)),
        updateProblem: (obj, token) => dispatch(AppActions.updateProblem(obj, token)),
        clearUpdateProbResponse: () => dispatch(AppActions.clearUpdateProbResponse()),
        clearUpdateCropResponse: () => dispatch(AppActions.clearUpdateCropResponse()),
        deleteCrop: (obj, token) => dispatch(AppActions.deleteCrop(obj, token)),
        deleteProb: (obj, token) => dispatch(AppActions.deleteProblem(obj, token))

    };
};



class FarmerAddedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCropModal: false,
            showProblemModal: false,
            name: "",
            date: "",
            weight: "",
            price: "",
            transport: "none",
            imageSrc: "",
            cropId: "",
            problemId: "",
            description: ""
        }

    }
    static getDerivedStateFromProps = (props, state) => {
        if (props.updateCropResponse && state.showCropModal && props.navigation.isFocused()) {
            props.clearUpdateCropResponse();
            return {
                showCropModal: false
            }

        }
        if (props.updateProblemResponse && state.showProblemModal && props.navigation.isFocused()) {
            props.clearUpdateProbResponse();
            return {
                showProblemModal: false
            }
        }
        return null;
    }


    static navigationOptions = ({ navigation, }) => {
        // console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };
    componentDidMount() {
        this.props.getCropsById(this.props.user.id, this.props.token);
        this.props.getProblemsById(this.props.user.id, this.props.token);
    }
    setDate = (value) => {
        this.setState({ date: value }, () => {

            alert(this.state.date)
        });
    }
    transportPickerHandler = (value) => {
        this.setState({ transport: value })
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
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageSrc: source,
                }, () => { alert(JSON.stringify(this.state.imageSrc)) });
            }
        });
    }
    updateCropData = () => {
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
        } else if (!this.state.imageSrc) {
            ToastAndroid.show("please select image", ToastAndroid.SHORT);
            return;
        }
        let formdata = new FormData();

        formdata.append("name", this.state.name)
        formdata.append("weight", this.state.weight)
        formdata.append("date", this.state.date.toString())
        formdata.append("transport", this.state.transport)
        formdata.append("price", this.state.price)
        formdata.append("farmerId", this.props.user.id)
        formdata.append("image", { uri: this.state.imageSrc.uri, name: 'image.jpg', type: 'multipart/form-data' })
        formdata.append("crop_id", this.state.cropId)
        this.props.updateCrop(formdata, this.props.token)
    }
    updateCropHandler = (index) => {
        let { name, image_url, weight, price, transport, date, _id } = this.props.cropList[index];
        this.setState({ name, imageSrc: { uri: image_url }, weight, date, price, transport, showCropModal: true, cropId: _id }, () => console.log(this.state))
    }
    updateProbData = () => {
        if (!this.state.name || this.state.name.toString().length < 3) {
            ToastAndroid.show("please fill the problem name correctly", ToastAndroid.SHORT);
            return;
        } else if (this.state.description.toString().length <= 10) {
            ToastAndroid.show("description should be greater then 10 characters", ToastAndroid.SHORT);
            return;
        } else if (!this.state.imageSrc) {
            ToastAndroid.show("please select image", ToastAndroid.SHORT);
            return;
        }
        let formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("description", this.state.description);
        formdata.append("problem_id", this.state.problemId);
        formdata.append("image", { uri: this.state.imageSrc.uri, name: 'image.jpg', type: 'multipart/form-data' });
        this.props.updateProblem(formdata, this.props.token);
    }
    updateProblemHandler = (index) => {
        let { name, image_url, description, _id } = this.props.problemList[index];
        this.setState({ name, imageSrc: { uri: image_url }, description, showProblemModal: true, problemId: _id }, () => console.log(this.state))
    }
    deleteCropHandler = (index) => {
        let { _id } = this.props.cropList[index];

        this.props.deleteCrop({ crop_id: _id }, this.props.token)

    }
    deleteProblemHandler = (index) => {
        let { _id } = this.props.problemList[index];
        this.props.deleteProb({ problem_id: _id }, this.props.token);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#272727' }}>
                <View style={{ flex: 0.1, alignItems: "center" }} >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: fontScale * 15 }} >Added Items {"\n"}</Text>
                    <Text style={{ color: "#fff", }} >Crops</Text>
                </View>
                <View style={{ flex: 0.4 }} >
                    <Card style={{ backgroundColor: '#272727' }}>
                        <FlatList data={this.props.cropList && this.props.cropList} renderItem={({ item, index }) =>
                            <ListItem key={index} style={{ justifyContent: "space-between", backgroundColor: '#272727' }} >
                                <View style={{ flex: 0.5 }} >
                                    <Text style={{ color: '#fff' }}>{`name: ${item.name}\n`}</Text>
                                    <Text style={{ color: '#fff' }}>{`weight: ${item.weight}\n`}</Text>
                                    <Text style={{ color: '#fff' }}>{`price: ${item.price}\n`}</Text>
                                </View>
                                <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "space-between", }}  >
                                    <Button onPress={() => this.updateCropHandler(index)} style={{ width: width * 0.20, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ color: "#272727" }} >update</Text></Button>
                                    {this.props.isProgress ? <Spinner /> : <Button onPress={() => this.deleteCropHandler(index)} style={{ width: width * 0.20, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ color: "#272727" }} >delete</Text></Button>}

                                </View>
                            </ListItem>
                        } />
                    </Card>
                </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }} >
                    <Text style={{ color: "#fff", }} >Problems</Text>
                </View>
                <View style={{ flex: 0.4 }} >
                    <Card style={{ backgroundColor: '#272727' }}>
                        <FlatList data={this.props.problemList && this.props.problemList} renderItem={({ item, index }) =>
                            <ListItem key={index} style={{ justifyContent: "space-between", backgroundColor: '#272727' }} >
                                <View style={{ flex: 0.5 }} >
                                    <Text style={{ color: '#fff' }}>{`name: ${item.name}\n`}</Text>
                                    <Text style={{ color: '#fff' }}>{`description: ${item.description}\n`}</Text>
                                    {/* <Text>{`price: ${item.price}\n`}</Text> */}
                                </View>
                                <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "space-around" }}  >
                                    <Button onPress={() => this.updateProblemHandler(index)} style={{ width: width * 0.20, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ color: "#272727" }} >update</Text></Button>
                                    {this.props.isProgress ? <Spinner /> : <Button onPress={() => this.deleteProblemHandler(index)} style={{ width: width * 0.20, borderRadius: width / 12, justifyContent: "center", backgroundColor: '#fff' }} ><Text style={{ color: "#272727" }} >delete</Text></Button>}
                                </View>
                            </ListItem>
                        } />
                    </Card>
                </View>

                {/* //Modal Crop} */}
                <Modal presentationStyle={"fullScreen"} visible={this.state.showCropModal} onRequestClose={() => this.setState({ showCropModal: false })} >
                    <ScrollView contentContainerStyle={{ height, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                        <View style={{ flex: 1, backgroundColor: '#272727', paddingHorizontal: width / 40 }}  >
                            <View style={{ flex: 0.05, width, alignItems: "center", justifyContent: "center" }} >
                                <Text style={{ fontWeight: "bold", color: '#fff' }} >Update Crop </Text>
                            </View>
                            <View style={{ flex: 0.2, color: '#fff', width, flexDirection: 'row', justifyContent: "center" }} >
                                <Image source={this.state.imageSrc || require("../../../assets/images/picture.png")} style={this.state.imageSrc ? { width: "100%", height: "70%" } : { width: width / 3, height: height / 6 }} resizeMode={this.state.imageSrc ? "stretch" : "contain"} />
                            </View>
                            <View style={{ flex: 0.7 }} >
                                <View style={{ flex: 0.2, }} >
                                    <Input style={{ color: '#fff' }} placeholderTextColor="#fff" placeholder="name" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                                </View>
                                <View style={{ flex: 0.2, }} >
                                    <Input style={{ color: '#fff' }} placeholderTextColor="#fff" placeholder="weight" value={this.state.weight} onChangeText={(weight) => this.setState({ weight })} />
                                </View>
                                <View style={{ flex: 0.2, }} >
                                    <Input style={{ color: '#fff' }} placeholderTextColor="#fff" placeholder="price" value={this.state.price} onChangeText={(price) => this.setState({ price })} />
                                </View>
                                <View style={{ flex: 0.2, }} >
                                    <DatePicker
                                        defaultDate={new Date(this.state.date)}
                                        minimumDate={new Date(1990, 1, 1)}
                                        maximumDate={new Date(2030, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText={this.state.date}
                                        textStyle={{ color: "#fff" }}
                                        placeHolderTextStyle={{ color: '#fff' }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                </View>
                                <View style={{ flex: 0.2, }} >
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select your SIM"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{ backgroundColor: '#272727', color: '#fff' }}
                                        selectedValue={this.state.transport}
                                        onValueChange={this.transportPickerHandler}
                                    >
                                        <Picker.Item label="Do you want transport" value="none" />
                                        <Picker.Item label="True" value={true} />
                                        <Picker.Item label="False" value={false} />
                                    </Picker>
                                </View>

                                <TouchableOpacity onPress={this.takeImage} style={{ flex: 0.2, flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", alignItems: "center", backgroundColor: '#272727' }} >
                                    <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                                    <Text style={{ alignSelf: "center", color: "#fff" }} >   Add image</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 0.2 }} >
                                    {this.props.isProgress ? <Spinner /> : <Button onPress={this.updateCropData} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
                {/* //ProblemModal */}
                <Modal presentationStyle={"fullScreen"} visible={this.state.showProblemModal} onRequestClose={() => this.setState({ showProblemModal: false })} >
                    <ScrollView contentContainerStyle={{ height: height, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >

                        <View style={{ flex: 1, backgroundColor: '#272727', paddingHorizontal: width / 40 }}  >
                            <View style={{ flex: 0.1, width, alignItems: "center", justifyContent: "center" }} >
                                <Text style={{ fontWeight: "bold", color: '#fff', marginTop: height / 40, marginBottom: height / 40 }} >Update  Problem </Text>
                            </View>
                            <View style={{ flex: 0.3, width, flexDirection: 'row', justifyContent: "center" }} >
                                <Image source={this.state.imageSrc || require("../../../assets/images/picture.png")} style={this.state.imageSrc ? { width: "100%", height: "70%" } : { width: width / 3, height: height / 6 }} resizeMode={this.state.imageSrc ? "stretch" : "contain"} />
                            </View>
                            <View style={{ flex: 0.5 }} >
                                <View style={{ flex: 0.2, }} >
                                    <Input placeholderTextColor="#fff" style={{ color: '#fff' }} placeholder="Problem Name" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                                </View>
                                <View style={{ flex: 0.4, }} >
                                    <Input placeholderTextColor="#fff" numberOfLines={10} value={this.state.description} style={{ height: height * 0.10, color: '#fff' }} placeholder="Description" onChangeText={(description) => this.setState({ description })} />
                                </View>
                                <TouchableOpacity onPress={this.takeImage} style={{ flex: 0.2, flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", alignItems: "center" }} >
                                    <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                                    <Text style={{ alignSelf: "center", color: "#fff" }} >   Add image</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 0.2 }} >
                                    {this.props.isProgress ? <Spinner /> : <Button onPress={this.updateProbData} style={{ marginBottom: height / 40, alignSelf: "center", width: width * 0.75, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FarmerAddedItems);  