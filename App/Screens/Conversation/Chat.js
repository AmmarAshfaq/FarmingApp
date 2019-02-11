import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Spinner, ListItem } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
// import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import AppActions from '../../Store/Actions/AppActions/index';
import SocketIOClient from 'socket.io-client';
const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.appRecuder["isProgress"],
        user: state.authReducer['user'],
        isError: state.appRecuder["isError"],
        errorText: state.appRecuder["errorText"],
        token: state.authReducer["token"],
        allUsers: state.appRecuder["allUsers"],
        privateConversation: state.appRecuder["privateConversation"],

    };
};
const mapDispatchToProps = dispatch => {
    return {

        getAllUsers: (userType, token) => dispatch(AppActions.getAllUsers(userType, token)),
        getPrivateConversation: (conversationId, token) => dispatch(AppActions.getPrivateConversation(conversationId, token))
    };
};

class Chat extends Component {
    constructor(props) {
        super(props);
        this.list = null;
        this.socket = SocketIOClient("https://boiling-headland-82881.herokuapp.com")
        this.state = { conversationId: "", conversation: [], message: "" }

    }
    static getDerivedStateFromProps(props, state) {
        if (props.privateConversation && props.privateConversation.length > state.conversation.length && props.navigation.isFocused()) {
            console.log("conversation", props.privateConversation);
            return {
                conversation: props.privateConversation
            }
        }
        return null;
    }
    componentDidUpdate() {
        // this.list.scrollToIndex({ index: (this.state.conversation.length - 1), animated: true })

    }
    componentDidMount() {
        let memberInfo = this.props.navigation.getParam("memberInfo");
        console.log("member Info ", memberInfo);
        let conversationId;
        if (this.props.user.id < (memberInfo._id || memberInfo.senderId)) {
            conversationId = this.props.user.id + (memberInfo._id || memberInfo.senderId);
            this.setState({ conversationId });
        } else {
            conversationId = (memberInfo._id || memberInfo.senderId) + this.props.user.id;
            this.setState({ conversationId });
        }
        console.log("conversation Id", conversationId);
        this.props.getPrivateConversation(conversationId, this.props.token)

        this.socket.on(conversationId, this.receivedMessage)

        // this.props.getAllUsers(this.props.navigation.getParam("userType"), this.props.token);
    }
    componentWillUnmount() {
        this.socket.removeAllListeners();
    }
    receivedMessage = (obj) => {

        this.setState({ conversation: [...this.state.conversation, obj] }, () => {
            this.list.scrollToIndex({ index: (this.state.conversation.length - 1), animated: true, viewPosition: 1 })
        })

    }
    getItemLayout = (data, index) => (
        { length: 100, offset: 100 * index, index }
    );

    sendMessage = () => {
        let memberInfo = this.props.navigation.getParam("memberInfo");
        let obj = {
            message: this.state.message,
            senderInfo: {
                senderType: this.props.user.userType,
                senderId: this.props.user.id,
                senderName: this.props.user.name
            },
            receiverInfo: {
                receiverType: memberInfo.userType,
                receiverId: (memberInfo._id || memberInfo.senderId),
                receiverName: memberInfo.name
            },
            conversationId: this.state.conversationId,
            timeStamp: new Date().getTime()

        }
        console.log("message object", obj)
        this.socket.emit("message", obj);
        this.setState({ message: "" })
    }
    sortArray = (array) => {
        array.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
        });

    }


    render() {
        // console.log("this.state.conversation", this.state.conversation)
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 0.85 }} >

                    {this.props.isProgress
                        ?
                        <Spinner />
                        :
                        <FlatList data={this.state.conversation}
                            ref={ref => this.list = ref}
                            getItemLayout={this.getItemLayout}
                            renderItem={({ item, index }) =>
                                (item.senderInfo.senderId == this.props.user.id ?
                                    < View style={{ borderRadius: width / 50, backgroundColor: "#d3d3d3", alignSelf: "flex-end", padding: 10, margin: 10 }} >
                                        <Text> {item.message} </Text>
                                        <Text style={{ fontSize: fontScale * 9, alignSelf: "flex-end" }} > {`${new Date(Number(item.timeStamp)).getHours()}:${new Date(Number(item.timeStamp)).getMinutes()}`} </Text>
                                    </View>
                                    :
                                    < View style={{ borderRadius: width / 50, backgroundColor: "#d6d6d6", alignSelf: "flex-start", padding: 10, margin: 10 }} >
                                        <Text> {item.message} </Text>
                                        <Text style={{ fontSize: fontScale * 9, alignSelf: "flex-end" }} > {`${new Date(Number(item.timeStamp)).getHours()}:${new Date(Number(item.timeStamp)).getMinutes()}`} </Text>
                                    </View>
                                )
                            }
                        />}
                </View>
                <View style={{ flex: 0.15, flexDirection: "row", width: width, justifyContent: "space-around", alignItems: "center", }} >


                    <View style={{ width: width * 0.70 }} >
                        <Input placeholder="Write a Message" value={this.state.message} onChangeText={(message) => this.setState({ message })} />
                    </View>


                    <Button full onPress={this.sendMessage} disabled={this.state.message.toString().length > 0 ? false : true} style={{ width: width * 0.20, alignSelf: "center" }} ><Text style={{ color: "#fff" }} >Add</Text></Button>


                </View>
            </View>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat); 