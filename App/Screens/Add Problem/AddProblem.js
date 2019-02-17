import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList,PermissionsAndroid } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, DatePicker, Spinner } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import AuthActions from "../../Store/Actions/AuthActions/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageResizer from 'react-native-image-resizer';
import AppActions from '../../Store/Actions/AppActions/index';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.appRecuder["isProgress"],
        user: state.authReducer['user'],
        isError: state.appRecuder["isError"],
        errorText: state.appRecuder["errorText"],
        token: state.authReducer["token"],
        addProbResponse: state.appRecuder["addProbResponse"]

    };
};
const mapDispatchToProps = dispatch => {
    return {
        addProbData: (token, obj) => dispatch(AppActions.addProbData(token, obj)),
        clearAddProbResponse: () => dispatch(AppActions.clearAddProbResponse())
        // setUnmountFlag: (value) => dispatch(AuthActions.setUnmountFlag(value))
        // getTokenAndUser: (token, user) => dispatch(AuthActions.getUserAndTokenFromAsyncStorage(token, user))

    };
};


class AddProblem extends Component {
    constructor(props) {
        super(props);
        this.state = { probName: "", description: "", imageSource: "",recordTime: '00:00:00',recordSecs: 0,audioSource:"" }
        this.options = {
            title: 'Select Picture',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        this.audioRecorderPlayer = new AudioRecorderPlayer();
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
    static navigationOptions = ({ navigation, }) => {
        // console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };
    submitProbData = () => {
        if (!this.state.probName || this.state.probName.toString().length < 3) {
            ToastAndroid.show("please fill the problem name correctly", ToastAndroid.SHORT);
            return;
        } else if (this.state.description.toString().length <= 10) {
            ToastAndroid.show("description should be greater then 10 characters", ToastAndroid.SHORT);
            return;
        } else if (!this.state.imageSource) {
            ToastAndroid.show("please select image", ToastAndroid.SHORT);
            return;
        }else if(!this.state.audioSource){
            ToastAndroid.show("please select audio", ToastAndroid.SHORT);
            return;
        }
        console.log(this.state.audioSource)
        let formdata = new FormData();
        formdata.append("name", this.state.probName)
        formdata.append("description", this.state.description)
        formdata.append("farmerId", this.props.user.id)
        formdata.append("image", { uri: this.state.imageSource.uri, name: 'image.jpg', type: 'multipart/form-data' })
        formdata.append("audio",{uri:this.state.audioSource,type:'multipart/form-data'})
        console.log(formdata)
        this.props.addProbData(this.props.token, formdata)
    }
     onStartRecord = async () => {

        const path = Platform.select({
            ios: 'hello.m4a',
            android: 'sdcard/hello.mp4',
        });
        const uri = await this.audioRecorderPlayer.startRecorder(path);
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
            });
            return;
        });
        // console.log(`uri: ${uri}`);
        this.setState({
            audioSource:uri
        })
    }
    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
        });
        // console.log(result);
    }
    static getDerivedStateFromProps = (props, state) => {
        console.log('user: ', props.user);
        if (props.addProbResponse && props.navigation.isFocused()) {
            props.clearAddProbResponse();
            props.navigation.goBack();
        }
        return null;
    }


    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height - 80, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >

                <View style={{ flex: 1, backgroundColor: '#272727', paddingHorizontal: width / 40 }}  >
                    <View style={{ flex: 0.05, width, alignItems: "center", justifyContent: "center" }} >
                        <Text style={{ fontWeight: "bold", color: '#fff' }} > Add Problem </Text>
                    </View>
                    <View style={{ flex: 0.45, width, justifyContent: "center", alignItems: "center" }} >
                        <Image source={this.state.imageSource || require("../../../assets/images/picture.png")} style={this.state.imageSource ? { width: "80%", height: "100%" } : { width: width / 3, height: height / 6 }} resizeMode={this.state.imageSource ? "stretch" : "contain"} />
                    </View>
                    <View style={{ flex: 0.7 }} >
                        <View style={{ flex: 0.2, }} >
                            <Input style={{ color: '#fff' }} placeholderTextColor={"#fff"} placeholder="Problem Name" onChangeText={(probName) => this.setState({ probName })} />
                        </View>
                        <View style={{ flex: 0.2, }} >
                            <Input style={{ color: '#fff' }} placeholderTextColor={"#fff"} numberOfLines={10} style={{ height: height * 0.10, color: '#fff' }} placeholder="Description" onChangeText={(description) => this.setState({ description })} />
                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row"}} >
                        <TouchableOpacity onPress={this.onStartRecord} style={{ flex: 0.3, flexDirection: "row", alignSelf: "flex-start", width: width * 0.75, justifyContent: "flex-start", alignItems: "flex-start" }} >

                        <Image
                            source={require('../../../assets/images/microphone.png')}
                            style={{width:40,height:40,color:'#fff'}}
                            />
                            <Text style={{ alignSelf: "center", color: "#fff" }} >   Record</Text>

                </TouchableOpacity>
                            <TouchableOpacity onPress={this.onStopRecord} style={{ flex: 0.3, flexDirection: "row", alignSelf: "flex-start", width: width * 0.75, justifyContent: "flex-start", alignItems: "flex-start" }} >

                                <Image
                                    source={require('../../../assets/images/muted.png')}
                                    style={{width:40,height:40,color:'#fff'}}
                                />
                                <Text style={{ alignSelf: "center", color: "#fff" }} >   Stop</Text>

                            </TouchableOpacity>
                            <View style={{flex:0.4,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                                <Text style={{color: "#fff"}}>{this.state.recordTime}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.takeImage} style={{ flex: 0.2, flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", alignItems: "center" }} >
                            <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                            <Text style={{ alignSelf: "center", color: "#fff" }} >   Add image</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 0.2 }} >
                            {this.props.isProgress ? <Spinner /> : <Button onPress={this.submitProbData} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", backgroundColor: '#fff', borderRadius: width / 12 }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProblem);  