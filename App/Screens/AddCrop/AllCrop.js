import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ScrollView, Modal, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import { Input, Button, Picker, Spinner, Thumbnail, Card, CardItem, H3, Item, ListItem } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppActions from '../../Store/Actions/AppActions';
import validator from "validator";

let Ref = {};

class AllCrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            contactNo: '',
            price: '',
            visibleResponseForm: false,
            fertilizerId: '',
            selectedCrop: {},
            comment: ''
        }
        Ref = this;
    }

    static getDerivedStateFromProps = (props, state) => {
        console.log("user", props.user)
        // if (props.fertilizerResponse.length && props.navigation.isFocused()) {
        //     props.clearAddFertilizerResponse();
        //     Ref.resetvisibleResponseForm();
        // }
        return null;
    }

    componentDidMount() {
        this.props.getAllCrops(this.props.token);
    }

    static navigationOptions = ({ navigation, }) => {
        // console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };
    visibleResponseForm = (item) => {
        this.setState({ visibleResponseForm: true, selectedCrop: item });
    }
    resetvisibleResponseForm = () => {
        this.setState({ visibleResponseForm: false });
    }
    addComment = () => {
        let { comment, selectedCrop } = this.state;
        if (!comment) {
            ToastAndroid.show("Please add your comment", ToastAndroid.SHORT);
        } else {
            let obj = {
                user_id: this.props.user.id,
                user_name: this.props.user.name,
                comment,
                type: `crop`,
                _id: selectedCrop._id
            }
            this.props.addCropComment(obj, this.props.token)
            this.setState({ comment: "" })
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height - 80, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 1, backgroundColor: '#272727' }}>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: width / 20, fontWeight: '700', color: '#fff' }}>Crops</Text>
                    </View>
                    <View style={{ flex: 0.8 }}>
                        {
                            this.props.navigation.isFocused() && this.props.allCrops && !this.props.isProgress ?
                                <FlatList
                                    style={{ flex: 1 }}
                                    // horizontal={true}
                                    data={this.props.allCrops}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item, index }) => {
                                        console.log('item: ', item)
                                        return (
                                            <TouchableOpacity style={{ backgroundColor: '#272727' }} onPress={() => this.visibleResponseForm(item)}>
                                                <Card style={{ flex: 0.33, flexDirection: 'column', marginTop: height / 40, marginBottom: height / 40, backgroundColor: '#272727', paddingHorizontal: width / 40 }}>
                                                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                                        <H3 style={{ marginBottom: height / 40, marginTop: height / 40, color: '#fff' }}>
                                                            {item.name}
                                                        </H3>
                                                    </View>
                                                    <View style={{ flex: 1 / 3 }}>
                                                        <Image
                                                            style={{ width, height: height / 4, borderWidth: 1, borderColor: '#000', resizeMode: 'contain' }}
                                                            source={{ uri: item.image_url }} />
                                                    </View>
                                                    <View style={{ marginBottom: height / 45, marginTop: height / 45, flex: 1 / 3, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Price: </Text>
                                                        <Text style={{ color: '#fff' }}>{item.price}</Text>
                                                    </View>
                                                </Card>
                                            </TouchableOpacity>
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
                    {/* <ScrollView> */}
                    <View style={{ flex: 1, padding: height / 40, backgroundColor: '#272727' }}>
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#272727' }}>
                            <H3 style={{ marginBottom: height / 40, marginTop: height / 40, color: '#fff', backgroundColor: '#272727' }}>
                                Crop Details
                        </H3>
                        </View>
                        <ScrollView style={{ flex: 0.3, backgroundColor: '#272727' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <H3 style={{ marginBottom: height / 40, marginTop: height / 40, color: '#fff' }}>
                                    {this.state.selectedCrop.name}
                                </H3>
                            </View>
                            <View >
                                <Image
                                    style={{ width, height: height / 4, borderWidth: 1, borderColor: '#000', resizeMode: 'contain' }}
                                    source={{ uri: this.state.selectedCrop.image_url }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Price: </Text>
                                <Text style={{ color: '#fff' }}>{this.state.selectedCrop.price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Transport Availiblity: </Text>
                                <Text style={{ color: '#fff' }}>{this.state.selectedCrop.transport ? "Yes" : "No"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Wieght: </Text>
                                <Text style={{ color: '#fff' }}>{this.state.selectedCrop.wieght}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: fontScale * 15, fontWeight: '600', color: '#fff' }}>Date: </Text>
                                <Text style={{ color: '#fff' }}>{new Date(this.state.selectedCrop.date).toLocaleDateString()}</Text>
                            </View>
                        </ScrollView>
                        <View style={{ flex: 0.4, backgroundColor: '#272727' }}>
                            <Text style={{ color: "#fff", fontSize: fontScale * 18 }} >Comments</Text>
                            <FlatList
                                data={this.state.selectedCrop.comments}
                                keyExtractor={(item, index) => index}
                                // style={{ flex: 0.9 }}
                                renderItem={({ item, index }) => {
                                    console.log("render comments: *****************************: ", item)
                                    return (
                                        <ListItem style={{ backgroundColor: '#272727' }}>
                                            <View style={{ flex: 1 }} >
                                                <Text style={{ color: "#fff", fontWeight: "bold" }} >{item.user_name}</Text>
                                                <Text style={{ color: '#fff' }}> {item.comment} </Text>
                                            </View>
                                        </ListItem>
                                    )
                                }}
                            />
                        </View>
                        <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: '#272727', borderBottomWidth: 1, borderBottomColor: '#fff', alignItems: 'flex-end' }}>
                            <Input style={{ flex: 0.75 }} placeholderTextColor="#fff" placeholder={"Enter Comment"} value={this.state.comment} onChangeText={comment => this.setState({ comment })} />
                            <Button onPress={this.addComment} style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                                <Icon name="send" color="#272727" size={12} />
                            </Button>
                        </View>
                    </View>
                    {/* </ScrollView> */}
                </Modal>
                {/* ******************************************** RESPONSE FORM ************************ */}
            </ScrollView >
        )
    }
}


const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        user: state.authReducer.user,
        token: state.authReducer["token"],
        isProgress: state.appRecuder.isProgress,
        isError: state.appRecuder.isError,
        errorText: state.appRecuder.errorText,
        // fertilizers: state.fertilizerReducer.fertilizers,
        allCrops: state.appRecuder.allCrops,
        fertilizerResponse: state.fertilizerReducer.fertilizerResponse
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllCrops: (token) => dispatch(AppActions.getAllCrops(token)),
        addCropComment: (obj, token) => dispatch(AppActions.addCropComment(obj, token))
        // addFertilizerResponse: (obj, token) => dispatch(AppActions.addFertilizerResponse(obj, token)),
        // clearAddFertilizerResponse: () => dispatch(AppActions.clearAddFertilizerResponse())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCrop);