import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, Modal } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, Thumbnail, ListItem, Textarea, Spinner, Item, Card, CardItem } from "native-base";
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
        allProblems: state.appRecuder["allProblems"],
        problemComments: state.appRecuder["problemComments"]



    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllProblems: (token) => dispatch(AppActions.getAllProblems(token)),
        addFarmerProblemComment: (obj, token) => dispatch(AppActions.addFarmerProblemComment(obj, token))
    };
};
class SolvedProblems extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, _id: "", name: "", date: "", description: "", image_url: "", comments: [], commentText: "" }
    }
    componentDidMount() {
        this.props.getAllProblems(this.props.token);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.problemComments && props.navigation.isFocused()) {
            return {
                comments: props.problemComments,
                // commentText: ""
            }
        }
        return null;
    }
    addComment = () => {
        let obj = {
            _id: this.state._id,
            comment: this.state.commentText,
            user_id: this.props.user.id,
            user_name: this.props.user.name,
            type: "problem"
        }
        this.props.addFarmerProblemComment(obj, this.props.token)
    }
    showModal = (index) => {
        let { _id, name, description, image_url, comments } = this.props.allProblems[index];
        this.setState({ showModal: true, _id, name, description, image_url, comments })
    }

    render() {
        console.log("problems", this.props.allProblems);
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 0.1, alignItems: "center" }} >
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: fontScale * 20 }} >Problem List</Text>
                </View>
                {this.props.isProgress ?
                    <Spinner />
                    :
                    <View style={{ flex: 0.9 }} >
                        <FlatList data={this.props.allProblems && this.props.allProblems} renderItem={({ item, index }) =>
                            item.comments.length > 0
                                ?
                                <ListItem onPress={() => this.showModal(index)} >
                                    <Text>{item.name}</Text>
                                </ListItem>
                                :
                                <View />
                        }

                        />
                    </View>}
                <Modal presentationStyle={"fullScreen"} visible={this.state.showModal} onRequestClose={() => { this.setState({ showModal: false }) }} >
                    <ScrollView contentContainerStyle={{ height: height - 25, width, justifyContent: "space-between", }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >

                        <View style={{ flex: 1, justifyContent: "space-between" }}  >
                            <View style={{ flex: 0.08, width, alignItems: "center", justifyContent: "center" }} >
                                <Text style={{ fontWeight: "bold" }} >Problem Solution</Text>
                            </View>

                            <View style={{ flex: 0.95, }} >
                                <View style={{ flex: 0.45, width, flexDirection: 'row', justifyContent: "center" }} >
                                    <Image source={this.state.image_url ? { uri: this.state.image_url } : require("../../../assets/images/picture.png")} style={this.state.image_url ? { width: "80%", height: "100%" } : { width: width / 3, height: height / 6 }} resizeMode={this.state.image_url ? "stretch" : "contain"} />
                                </View>
                                <View style={{ flex: 0.3, justifyContent: "center", }} >
                                    <View style={{ flex: 0.2, padding: 10 }} >
                                        <Text style={{ color: "#000", fontWeight: "bold" }} > Name </Text>
                                        <Text> {`${this.state.name}\n`} </Text>
                                    </View>
                                    <View style={{ flex: 0.3, padding: 10 }} >
                                        <Text style={{ color: "#000", fontWeight: "bold" }}  > Description </Text>
                                        <Text> {this.state.description} </Text>
                                    </View>

                                </View>
                                <View style={{ flex: 0.35, justifyContent: "center" }} >
                                    <Text style={{ color: "#000", fontSize: fontScale * 18 }} >Comments</Text>
                                    <FlatList data={this.state.comments} renderItem={({ item, index }) =>
                                        <ListItem>
                                            <View style={{ flex: 1 }} >
                                                <Text style={{ color: "#000", fontWeight: "bold" }} >{item.user_name}</Text>
                                                <Text> {item.comment} </Text>
                                            </View>
                                        </ListItem>
                                    } />

                                </View>

                            </View>
                            <View style={{ flex: 0.1, flexDirection: "row", width: width, justifyContent: "space-around" }} >
                                {/* <Card flexDirection={"row"} width={width} > */}

                                <View style={{ width: width * 0.70 }} >
                                    <Input placeholder="Add Comment" value={this.state.commentText} onChangeText={(commentText) => this.setState({ commentText })} />
                                </View>


                                {this.props.isProgress ? <Spinner /> : <Button full disabled={this.state.commentText.toString().length > 0 ? false : true} onPress={this.addComment} style={{ width: width * 0.20 }} ><Text style={{ color: "#fff" }} >Add</Text></Button>}

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
)(SolvedProblems);  