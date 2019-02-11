import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, Modal } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, Thumbnail, ListItem, Textarea, Spinner } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppActions from '../../Store/Actions/AppActions/index';
import validator from "validator";


const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.appRecuder["isProgress"],
        user: state.authReducer['user'],
        isError: state.appRecuder["isError"],
        errorText: state.appRecuder["errorText"],
        token: state.authReducer["token"],
        cropDetails: state.appRecuder["cropDetails"],
        cropDetailsComments: state.appRecuder["cropDetailsComments"],


    };
};
const mapDispatchToProps = dispatch => {
    return {
        getCropDetails: (token) => dispatch(AppActions.getCropDetails(token)),
        addCropDetailsComment: (obj, token) => dispatch(AppActions.addCropDetailsComment(obj, token))

    };
};
class CropDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, _id: "", name: "", weight: "", price: "", date: "", transport: "none", image_url: "", comments: [], commentText: "" }
    }
    componentDidMount() {
        this.props.getCropDetails(this.props.token);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.cropDetailsComments && props.navigation.isFocused()) {
            return {
                comments: props.cropDetailsComments,
                // commentText: ""
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
    showModal = (index) => {
        let { name, weight, price, date, transport, image_url, comments, _id } = this.props.cropDetails[index];
        this.setState({ showModal: true, name, weight, price, date, image_url, comments, _id })
        console.log("crop details", this.props.cropDetails[index])
    }
    addComment = () => {
        let obj = {
            _id: this.state._id,
            comment: this.state.commentText,
            user_id: this.props.user.id,
            user_name: this.props.user.name,
            type: "crop"
        }
        this.props.addCropDetailsComment(obj, this.props.token)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#272727' }} >
                <View style={{ flex: 0.1, alignItems: "center" }} >
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: fontScale * 20, color: '#fff', marginTop: height / 40 }} >Crop List</Text>
                </View>
                {this.props.isProgress ?
                    <Spinner />
                    :
                    <View style={{ flex: 0.9 }} >
                        <FlatList data={this.props.cropDetails && this.props.cropDetails} renderItem={({ item, index }) =>
                            <ListItem onPress={() => this.showModal(index)} >
                                <Text style={{ color: '#fff' }}>{item.name}</Text>
                            </ListItem>

                        } />
                    </View>}
                <Modal presentationStyle={"fullScreen"} visible={this.state.showModal} onRequestClose={() => { this.setState({ showModal: false }) }} >
                    <ScrollView contentContainerStyle={{ height: height - 25, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                        <View style={{ flex: 1, backgroundColor: "#272727" }}  >
                            <View style={{ flex: 0.08, width, alignItems: "center", justifyContent: "center" }} >
                                <Text style={{ fontWeight: "bold", color: '#fff' }} >Crop Details</Text>
                            </View>

                            <View style={{ flex: 0.95 }} >
                                <View style={{ flex: 0.45, width, flexDirection: 'row', justifyContent: "center" }} >
                                    <Image source={this.state.image_url ? { uri: this.state.image_url } : require("../../../assets/images/picture.png")} style={this.state.image_url ? { width: "80%", height: "100%" } : { width: width / 3, height: height / 6 }} resizeMode={this.state.image_url ? "stretch" : "contain"} />
                                </View>
                                <View style={{ flex: 0.3, justifyContent: "center", }} >
                                    <View style={{ flex: 0.2, flexDirection: "row" }} >
                                        <Text style={{ color: "#fff", fontWeight: "bold" }} > Name: </Text><Text style={{ color: '#fff' }}> {this.state.name} </Text>
                                    </View>
                                    <View style={{ flex: 0.2, flexDirection: "row" }} >
                                        <Text style={{ color: "#fff", fontWeight: "bold" }}  > Weight: </Text><Text style={{ color: '#fff' }}> {this.state.weight} </Text>
                                    </View>
                                    <View style={{ flex: 0.2, flexDirection: "row" }} >
                                        <Text style={{ color: "#fff", fontWeight: "bold" }}  > Price: </Text><Text style={{ color: '#fff' }}> {this.state.price} </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.35, justifyContent: "center" }} >
                                    <Text style={{ color: "#fff", fontSize: fontScale * 18 }} >Comments</Text>
                                    <FlatList data={this.state.comments} renderItem={({ item, index }) =>
                                        <ListItem>
                                            <View style={{ flex: 1 }} >
                                                <Text style={{ color: "#fff", fontWeight: "bold" }} >{item.user_name}</Text>
                                                <Text style={{ color: '#fff' }}> {item.comment} </Text>
                                            </View>
                                        </ListItem>
                                    } />
                                </View>
                            </View>
                            <View style={{ flex: 0.1, flexDirection: "row", width: width, justifyContent: "space-around", alignItems: "center" }} >
                                {/* <Card flexDirection={"row"} width={width} > */}

                                <View style={{ width: width * 0.70 }} >
                                    <Input style={{ color: '#fff' }} placeholderTextColor="#fff" placeholder="Add Comment" value={this.state.commentText} onChangeText={(commentText) => this.setState({ commentText })} />
                                </View>


                                {this.props.isProgress ? <Spinner /> : <Button full onPress={this.addComment} disabled={this.state.commentText.toString().length > 0 ? false : true} style={{ width: width * 0.20, color: '#fff' }} ><Text style={{ color: "#272727" }} >Add</Text></Button>}

                                {/* </Card> */}
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
)(CropDetails);  