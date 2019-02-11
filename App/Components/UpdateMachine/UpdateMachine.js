import React, { Component } from 'react';
import { Modal, Text, View, Dimensions, Image, ScrollView, TouchableHighlight, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Drawer, Item, Label, Spinner } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

class UpdateMachine extends Component {
    state = {
        modalVisible: false,
        name: '',
        price: '',
        application: '',
        imageSource: ''
    };

    // setModalVisible(visible) {
    //     this.setState({ modalVisible: visible });
    // }

    componentDidMount() {

    }

    getMachine = (machine) => {
        this.setState({
            name: machine.name,
            price: machine.price,
            application: machine.application,
            imageSource: ''
        })
    }
    getAlert() {
        alert('getAlert from Child');
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
                    imageSource: source,
                }, () => { alert(JSON.stringify(this.state.imageSource)) });
            }
        });
    }

    updateMachine = () => {
        let formdata = new FormData();
        let { name, price, application, imageSource } = this.state;
        console.log('imageSource: ', imageSource)
        if (name.trim().length >= 3 && price.trim().length >= 4 && application.trim().length >= 10 && imageSource.uri) {
            let obj = {
                contactNumber: "03002548754",
                contactEmail: this.props.user.email,
                contactName: this.props.user.name,
                location: "lorem lorem lorem lorem lorem",
                address: "lorem lorem lorem lorem lorem"
            }
            formdata.append('companyName', this.props.user.name);
            formdata.append('companyId', this.props.user.id);
            formdata.append('machineName', name);
            formdata.append('machineDescription', application);
            formdata.append('price', price);
            formdata.append('contactDetails', JSON.stringify(obj));
            formdata.append('image', { uri: imageSource.uri, name: 'image.jpg', type: 'multipart/form-data' })
            console.log('token: ', this.props.token)
            this.props.updateMachine(formdata, this.props.token);
        } else {
            if (name.trim().length == 0) {
                ToastAndroid.show('machine name is required', ToastAndroid.SHORT);
                return;
            } else if (price.trim().length == 0) {
                ToastAndroid.show('machine price is required', ToastAndroid.SHORT);
                return;
            } else if (application.trim().length == 0) {
                ToastAndroid.show('machine application is required', ToastAndroid.SHORT);
                return;
            } else if (!imageSource.uri) {
                ToastAndroid.show('image is required', ToastAndroid.SHORT);
                return;
            }
            ToastAndroid.show('Data badely formated', ToastAndroid.SHORT);
            return;
        }
    }

    render() {
        return (
            <Modal
                presentationStyle={"fullScreen"}
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <ScrollView contentContainerStyle={{ height: height - 100, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' }}>
                        <TouchableHighlight
                            onPress={this.props.setModalVisible}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                        <Text>
                            Update Machinary
                            </Text>
                        <View >
                            <Image source={require('../../../assets/images/machinary.png')} />
                        </View>
                    </View>
                    <View style={{ flex: 0.6, padding: width * 1 / 20 }}>
                        <View style={{ flex: 1 / 4 }}>
                            <Item >
                                {/* <Label>Username</Label> */}
                                <Input placeholder="Machine Name and Model" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                            </Item>
                            {/* <Input placeholder="Fertilizer Name" style={{ borderBottomWidth: 1, borderBottomColor: '#000' }} onChangeText={(name) => this.setState({ name })} /> */}
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <Item>
                                <Input placeholder="Price" value={this.state.price} keyboardType="numeric" onChangeText={(price) => this.setState({ price })} />
                            </Item>
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <Item>
                                <Input placeholder="Application" value={this.state.application} onChangeText={(application) => this.setState({ application })} />
                            </Item>
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <TouchableOpacity onPress={this.takeImage} style={{ flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center" }} >
                                <Ionicons name={"ios-add-circle-outline"} size={40} />
                                <Text style={{ alignSelf: "center", color: "#000" }}>Add image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        {this.props.isProgress ? <Spinner /> : <Button onPress={this.updateMachine} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center" }} ><Text style={{ alignSelf: "center", color: "#fff" }} >Submit</Text></Button>}
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}


const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        isProgress: state.machinaryReducer.isProgress,
        isError: state.machinaryReducer.isError,
        errorText: state.machinaryReducer.errorText,
        machines: state.machinaryReducer.machines
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateMachine: (obj, token) => dispatch(AppAction.updateMachine(obj, token)),
        clearMachines: () => dispatch(AppAction.clearMachines())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateMachine);