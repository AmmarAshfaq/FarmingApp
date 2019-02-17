import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView,Button, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, Modal } from 'react-native';
import { Input,  Picker, Icon, Drawer, Thumbnail, ListItem, Textarea, Spinner, Item, Card, CardItem } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppActions from '../../Store/Actions/AppActions/index';
import validator from "validator";

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
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
class FarmerProblems extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, _id: "", name: "", date: "", description: "", image_url: "", comments: [], commentText: "",currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00', }
        const audioRecorderPlayer = new AudioRecorderPlayer();
    }

    onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await this.audioRecorderPlayer.startPlayer();
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.audioRecorderPlayer.stopPlayer();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
    }

    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
    }

    onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
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
        return (
            <View style={{ flex: 1, backgroundColor: "#272727" }} >
                <View style={{ flex: 0.1, alignItems: "center" }} >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: fontScale * 20 }} >Problem List</Text>
                </View>
                {this.props.isProgress ?
                    <Spinner />
                    :
                    <View style={{ flex: 0.9 }} >
                        <FlatList data={this.props.allProblems && this.props.allProblems} renderItem={({ item, index }) =>
                            <ListItem onPress={() => this.showModal(index)} >
                                <Text style={{ color: "#fff" }} >{item.name}</Text>
                            </ListItem>

                        } />
                    </View>}
                <Modal presentationStyle={"fullScreen"} visible={this.state.showModal} onRequestClose={() => { this.setState({ showModal: false }) }} >
                    <ScrollView contentContainerStyle={{ height: height - 25, width, justifyContent: "space-between", backgroundColor: "#272727" }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >

                        <View style={{ flex: 1, justifyContent: "space-between" }}  >
                            <View style={{ flex: 0.08, width, alignItems: "center", justifyContent: "center" }} >
                                <Text style={{ fontWeight: "bold", color: "#fff" }} >Problem Details</Text>
                            </View>

                            <View style={{ flex: 0.95, }} >
                                <View style={{ flex: 0.35, width, flexDirection: 'row', justifyContent: "center" }} >
                                    <Image source={this.state.image_url ? { uri: this.state.image_url } : require("../../../assets/images/picture.png")} style={this.state.image_url ? { width: "80%", height: "100%" } : { width: width / 3, height: height / 6 }} resizeMode={this.state.image_url ? "stretch" : "contain"} />
                                </View>
                                <View style={{ flex: 0.3, justifyContent: "center", }} >
                                    <View style={{ flex: 0.2, padding: 10 }} >
                                        <Text style={{ color: "#fff", fontWeight: "bold" }} > Name </Text>
                                        <Text style={{ color: "#fff", }} > {`${this.state.name}\n`} </Text>
                                    </View>
                                    <View style={{ flex: 0.3, padding: 10 }} >
                                        <Text style={{ color: "#fff", fontWeight: "bold" }}  > Description </Text>
                                        <Text style={{ color: "#fff", }} > {this.state.description} </Text>
                                    </View>
                                    <View style={{ flex: 0.3, padding: 10,flexDirection:'row' }} >
                                        {/*<Button*/}
                                            {/*title="Play"*/}

                                        {/*/>*/}


                                        {/*<Button*/}
                                        {/*title="Pause"*/}

                                        {/*/>*/}
                                        {/*<Button*/}
                                            {/*title="Stop"*/}

                                        {/*/>*/}

                                        {/*<Button*/}
                                            {/*// onPress={onPressLearnMore}*/}
                                            {/*title="Learn More"*/}
                                            {/*color="#841584"*/}
                                            {/*accessibilityLabel="Learn more about this purple button"*/}
                                        {/*/>*/}



                                    </View>

                                </View>
                                <View style={{ flex: 0.35, justifyContent: "center" }} >
                                    <Text style={{ color: "#fff", fontSize: fontScale * 18 }} >Comments</Text>
                                    <FlatList data={this.state.comments} renderItem={({ item, index }) =>
                                        <ListItem>
                                            <View style={{ flex: 1 }} >
                                                <Text style={{ color: "#fff", fontWeight: "bold" }} >{item.user_name}</Text>
                                                <Text style={{ color: "#fff" }} > {item.comment} </Text>
                                            </View>
                                        </ListItem>
                                    } />

                                </View>

                            </View>
                            <View style={{ flex: 0.1, flexDirection: "row", width: width, justifyContent: "space-around" }} >
                                {/* <Card flexDirection={"row"} width={width} > */}

                                <View style={{ width: width * 0.70 }} >
                                    <Input style={{ color: "#fff" }} placeholder="Add Comment" value={this.state.commentText} onChangeText={(commentText) => this.setState({ commentText })} />
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
)(FarmerProblems);  