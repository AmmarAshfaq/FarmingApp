import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList, Modal, TouchableHighlight } from 'react-native';
import { Input, Button, Picker, Drawer, Item, Label, Spinner } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import CompanyPanel from '../../Components/CompanyPanel';
import ImagePicker from 'react-native-image-picker';
import AuthActions from "../../Store/Actions/AuthActions";
import AppAction from '../../Store/Actions/AppActions';
import UpdateModel from '../../Components/UpdateMachine/UpdateMachine';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Edit from 'react-native-vector-icons/MaterialIcons';

import validator from "validator";
let Ref = {};

class CompanyAddedItems extends Component {
    constructor(props) {
        super(props);
        this.drawer = null;
        this.state = {
            openDawer: true,
            visibleUpdateMachine: false,
            visibleUpdatePesticide: false,
            visibleUpdateFertilizer: false,
            name: '',
            price: '',
            application: '',
            imageSource: '',
            id: '',
            model: ''
        }
        Ref = this;
        this.child = React.createRef();
    }

    static getDerivedStateFromProps = (props, state) => {
        console.log('its a machines array: ', props.machines)
        if (props.machines.length > 0 && props.navigation.isFocused()) {
            Ref.resetVisibleUpdateMachine();
            props.clearMachine()
        }
        if (props.pesticides.length > 0 && props.navigation.isFocused()) {
            Ref.resetVisibleUpdatePesticide();
            props.clearPesticide()
        }
        if (props.fertilizers.length > 0 && props.navigation.isFocused()) {
            Ref.resetVisibleUpdateFertilizer();
            props.clearFertilizer()
        }
    }

    setModalVisible = (machineObj) => {
        // this.child.current.getMachine(machineObj);
        console.log('this.child.current: ', this.child.current)
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    setVisibleUpdateMachine = (machine) => {
        console.log('edit machine: ', machine);
        this.setState({
            visibleUpdateMachine: true,
            name: machine.machineName,
            price: machine.price,
            application: machine.machineDescription,
            imageSource: '',
            id: machine._id,
            model: machine.machineModel
        })
    }
    static navigationOptions = ({ navigation, }) => {
        console.log("get param", navigation.getParam("openDrawer"))
        return {
            headerTintColor: '#fff'
        }

    };

    setVisibleUpdatePesticide = (pesticide) => {
        console.log('edit pesticide: ', pesticide);
        this.setState({
            visibleUpdatePesticide: true,
            name: pesticide.pesticideName,
            price: pesticide.price,
            application: pesticide.pesticideDescription,
            imageSource: '',
            id: pesticide._id
        })
    }

    setVisibleUpdateFertilizer = (fertilizer) => {
        console.log("edit fertilizer: ", fertilizer);
        this.setState({
            visibleUpdateFertilizer: true,
            name: fertilizer.name,
            price: fertilizer.price,
            application: fertilizer.application,
            imageSource: '',
            id: fertilizer._id
        })
    }

    // static navigationOptions = ({ navigation, }) => {
    //     console.log("get param", navigation.getParam("openDrawer"))
    //     return {
    //         headerLeft: (
    //             <TouchableOpacity onPress={navigation.getParam("openDrawer")} style={{ marginLeft: 12, backgroundColor: "transparent" }} ><Icon name="menu" style={{ color: "#000" }} /></TouchableOpacity>
    //         ),
    //     }
    // };
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

    resetVisibleUpdateMachine = () => {
        this.setState({ visibleUpdateMachine: false });
    }

    resetVisibleUpdatePesticide = () => {
        this.setState({ visibleUpdatePesticide: false });
    }

    resetVisibleUpdateFertilizer = () => {
        this.setState({ visibleUpdateFertilizer: false });
    }

    getMachine = (machine) => {
        console.log('machine: ', machine);

    }
    componentDidMount() {
        this.props.getFertilizerMachinesPesticides(this.props.token);
    }
    replaceScreen = (route) => {
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            key: `${route}`,
            routeName: `${route}`,
        });
    }
    signOut = () => {
        this.props.signOut();
        this.props.setUnmountFlag(false);
        AsyncStorage.clear().then(() => {
            this.replaceScreen("signIn");
        }).catch(err => {
            console.log("error", err);
        });
    }

    updateMachine = () => {
        let formdata = new FormData();
        let { name, price, application, imageSource, id, model } = this.state;
        console.log('imageSource: ', imageSource)
        if (model.trim().length == 4 && model > '1970' && model <= '2019' && name.trim().length >= 3 && price.trim().length >= 4 && application.trim().length >= 10 && imageSource.uri) {
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
            formdata.append('machineId', id);
            formdata.append('machineModel', model);
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
            } else if (model.trim().length == 0 || !model.trim().length == 4 || (model >= '1970' && model <= '2019')) {
                ToastAndroid.show('machine model lenght must be 4 character long and with in a 1970 to 2019', ToastAndroid.SHORT);
                return;
            }
            ToastAndroid.show('Data badely formated', ToastAndroid.SHORT);
            return;
        }
    }

    updatePesticide = () => {
        let formdata = new FormData();
        let { name, price, application, imageSource, id } = this.state;
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
            formdata.append('pesticideName', name);
            formdata.append('pesticideId', id);
            formdata.append('pesticideDescription', application);
            formdata.append('price', price);
            formdata.append('contactDetails', JSON.stringify(obj));
            formdata.append('image', { uri: imageSource.uri, name: 'image.jpg', type: 'multipart/form-data' })
            console.log('token: ', this.props.token)
            this.props.updatePesticide(formdata, this.props.token);
        } else {
            if (name.trim().length == 0) {
                ToastAndroid.show('pesticide name is required', ToastAndroid.SHORT);
                return;
            } else if (price.trim().length == 0) {
                ToastAndroid.show('pesticide price is required', ToastAndroid.SHORT);
                return;
            } else if (application.trim().length == 0) {
                ToastAndroid.show('pesticide application is required', ToastAndroid.SHORT);
                return;
            } else if (!imageSource.uri) {
                ToastAndroid.show('image is required', ToastAndroid.SHORT);
                return;
            }
            ToastAndroid.show('Data badely formated', ToastAndroid.SHORT);
            return;
        }
    }


    updateFertilizer = () => {
        let formdata = new FormData();
        let { name, price, application, imageSource, id } = this.state;
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
            formdata.append('name', name);
            formdata.append('product', 'name');
            formdata.append('fertilizerId', id);
            formdata.append('application', application);
            formdata.append('price', price);
            formdata.append('contactDetails', JSON.stringify(obj));
            formdata.append('image', { uri: imageSource.uri, name: 'image.jpg', type: 'multipart/form-data' })
            console.log('token: ', this.props.token)
            this.props.updateFertilizer(formdata, this.props.token);
        } else {
            if (name.trim().length == 0) {
                ToastAndroid.show('pesticide name is required', ToastAndroid.SHORT);
                return;
            } else if (price.trim().length == 0) {
                ToastAndroid.show('pesticide price is required', ToastAndroid.SHORT);
                return;
            } else if (application.trim().length == 0) {
                ToastAndroid.show('pesticide application is required', ToastAndroid.SHORT);
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
            <ScrollView contentContainerStyle={{ height: height - 80, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <CompanyPanel navigation={this.props.navigation}
                    signOut={this.signOut}
                    drawerDataArray={[{ name: 'Home' }, { name: 'Messages' }, { name: 'Payment Term' }, { name: 'Notification' }]} >
                    <View style={{ flex: height / 3, padding: width / 40 }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: width / 20, fontWeight: '700', color: '#fff' }}>Machines</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            {
                                this.props.navigation.isFocused() && this.props.allMachines && !this.props.machineProgress ?
                                    <FlatList
                                        style={{ flex: 1 }}
                                        // horizontal={true}
                                        data={this.props.allMachines}
                                        keyExtractor={(item, index) => index}
                                        renderItem={({ item, index }) => {
                                            console.log('item: ', item)
                                            return (
                                                <View style={{ flex: 0.33, flexDirection: 'row' }}>
                                                    <View style={{ width: width / 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                        <Text style={{ color: '#fff' }}>
                                                            {`${index + 1}. `}
                                                        </Text>
                                                        <Text style={{ color: '#fff' }}>
                                                            {item.machineName}
                                                        </Text>
                                                    </View>
                                                    <View style={{ width: width / 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ width: width / 4, margin: width / 40 }}>
                                                            <Icon.Button name="delete" backgroundColor="#e74c3c" onPress={() => this.props.deleteMachine({ machineId: item._id, companyId: this.props.companyId }, this.props.token)}>
                                                                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>Delete</Text>
                                                            </Icon.Button>
                                                        </View>
                                                        <View style={{ width: width / 4, margin: width / 50 }}>
                                                            <Edit.Button name="edit" backgroundColor="#2ecc71" onPress={() => this.setVisibleUpdateMachine(item)}>
                                                                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>Edit</Text>
                                                            </Edit.Button>
                                                        </View>
                                                    </View>
                                                </View>
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
                    <View style={{ flex: height / 3, padding: width / 40 }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: width / 20, fontWeight: '700', color: '#fff' }}>Pesticides</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            {
                                this.props.navigation.isFocused() && this.props.allPesticides && !this.props.pesticideProgress ?
                                    <FlatList
                                        style={{ flex: 1 }}
                                        // horizontal={true}
                                        data={this.props.allPesticides}
                                        keyExtractor={(item, index) => index}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ flex: 0.33, flexDirection: 'row' }}>
                                                    <View style={{ width: width / 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                        <Text style={{ color: '#fff' }}>
                                                            {`${index + 1}. `}
                                                        </Text>
                                                        <Text style={{ color: '#fff' }}>
                                                            {item.pesticideName}
                                                        </Text>
                                                    </View>
                                                    <View style={{ width: width / 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ width: width / 4, margin: width / 40 }}>
                                                            <Icon.Button onPress={() => this.props.deletePesticide({ pesticideId: item._id, companyId: this.props.companyId }, this.props.token)} name="delete" backgroundColor="#e74c3c">
                                                                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>Delete</Text>
                                                            </Icon.Button>
                                                        </View>
                                                        <View style={{ width: width / 4, margin: width / 50 }}>
                                                            <Edit.Button name="edit" backgroundColor="#2ecc71" onPress={() => this.setVisibleUpdatePesticide(item)}>
                                                                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>Edit</Text>
                                                            </Edit.Button>
                                                        </View>
                                                    </View>
                                                </View>
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
                    <View style={{ flex: height / 3, padding: width / 40 }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: width / 20, fontWeight: '700', color: '#fff' }}>Fertilizer</Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            {
                                this.props.navigation.isFocused() && this.props.allFertilizers && !this.props.fertilizerProgress ?
                                    <FlatList
                                        style={{ flex: 1 }}
                                        // horizontal={true}
                                        data={this.props.allFertilizers}
                                        keyExtractor={(item, index) => index}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ flex: 0.33, flexDirection: 'row' }}>
                                                    <View style={{ width: width / 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                        <Text style={{ color: '#fff' }}>
                                                            {`${index + 1}. `}
                                                        </Text>
                                                        <Text style={{ color: '#fff' }}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{ width: width / 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ width: width / 4, margin: width / 40 }}>
                                                            <Icon.Button onPress={() => this.props.deleteFertilizer({ fertilizerId: item._id, companyId: this.props.companyId }, this.props.token)} name="delete" backgroundColor="#e74c3c">
                                                                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>Delete</Text>
                                                            </Icon.Button>
                                                        </View>
                                                        <View style={{ width: width / 4, margin: width / 50 }}>
                                                            <Edit.Button name="edit" backgroundColor="#2ecc71" onPress={() => this.setVisibleUpdateFertilizer(item)}>
                                                                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>Edit</Text>
                                                            </Edit.Button>
                                                        </View>
                                                    </View>
                                                </View>
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
                    {/* ********************************** UPDATE MACHINEARY START ********************************* */}
                    <Modal
                        presentationStyle={"fullScreen"}
                        animationType="slide"
                        transparent={false}
                        visible={this.state.visibleUpdateMachine}
                        onRequestClose={() => {
                            this.resetVisibleUpdateMachine();
                        }}>
                        <ScrollView style={{ backgroundColor: '#272727' }} contentContainerStyle={{ height: height - 100, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <View >
                                    <Image source={require('../../../assets/images/machinary.png')} />
                                </View>
                            </View>
                            <View style={{ flex: 0.6, padding: width * 1 / 20 }}>
                                <View style={{ flex: 1 / 5 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <MaterialCommunityIcons name={"pencil"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Machine Name" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 5 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <MaterialCommunityIcons name={"blank"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Machine Model" keyboardType='numeric' value={this.state.model} onChangeText={(model) => this.setState({ model })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 5 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <FontAwesome name={"dollar"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Price" value={this.state.price} keyboardType="numeric" onChangeText={(price) => this.setState({ price })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 5 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <MaterialCommunityIcons name={"application"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Application" value={this.state.application} onChangeText={(application) => this.setState({ application })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 5 }}>
                                    <TouchableOpacity onPress={this.takeImage} style={{ flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", marginTop: height / 40 }} >
                                        <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                                        <Text style={{ alignSelf: "center", color: "#fff" }} >   Add image</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                {this.props.machineProgress ? <Spinner /> : <Button onPress={this.updateMachine} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", borderRadius: width / 12, backgroundColor: "#fafafa" }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                            </View>
                        </ScrollView>
                    </Modal>
                    {/* ********************************** UPDATE MACHINEARY END********************************* */}




                    {/* ********************************** UPDATE PESTICIDE START ********************************* */}
                    <Modal
                        presentationStyle={"fullScreen"}
                        animationType="slide"
                        transparent={false}
                        visible={this.state.visibleUpdatePesticide}
                        onRequestClose={() => {
                            this.resetVisibleUpdatePesticide()
                        }}>
                        <ScrollView style={{ backgroundColor: '#272727' }} contentContainerStyle={{ height: height - 100, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <View >
                                    <Image source={require('../../../assets/images/pesticide.png')} />
                                </View>
                            </View>
                            <View style={{ flex: 0.6, padding: width * 1 / 20 }}>
                                <View style={{ flex: 1 / 4 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <MaterialCommunityIcons name={"pencil"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Pesticide" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                                    </Item>
                                    {/* <Input placeholder="Fertilizer Name" style={{ borderBottomWidth: 1, borderBottomColor: '#000' }} onChangeText={(name) => this.setState({ name })} /> */}
                                </View>
                                <View style={{ flex: 1 / 4 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <FontAwesome name={"dollar"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Price" value={this.state.price} keyboardType="numeric" onChangeText={(price) => this.setState({ price })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 4 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <MaterialCommunityIcons name={"application"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Application" value={this.state.application} onChangeText={(application) => this.setState({ application })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 4 }}>
                                    <TouchableOpacity onPress={this.takeImage} style={{ flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", marginTop: height / 40 }} >
                                        <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                                        <Text style={{ alignSelf: "center", color: "#fff" }}>Add image</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                {this.props.pesticideProgress ? <Spinner /> : <Button onPress={this.updatePesticide} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", borderRadius: width / 12, backgroundColor: "#fafafa" }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                            </View>
                        </ScrollView>
                    </Modal>
                    {/* ********************************** UPDATE FERTILIZER END********************************* */}

                    <Modal
                        presentationStyle={"fullScreen"}
                        animationType="slide"
                        transparent={false}
                        visible={this.state.visibleUpdateFertilizer}
                        onRequestClose={() => {
                            this.resetVisibleUpdateFertilizer()
                        }}>
                        <ScrollView style={{ backgroundColor: '#272727' }} contentContainerStyle={{ height: height - 100, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <View >
                                    <Image source={require('../../../assets/images/fertilizer.png')} />
                                </View>
                            </View>
                            <View style={{ flex: 0.6, padding: width * 1 / 20 }}>
                                <View style={{ flex: 1 / 4 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <MaterialCommunityIcons name={"pencil"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Pesticide" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                                    </Item>
                                    {/* <Input placeholder="Fertilizer Name" style={{ borderBottomWidth: 1, borderBottomColor: '#000' }} onChangeText={(name) => this.setState({ name })} /> */}
                                </View>
                                <View style={{ flex: 1 / 4 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <FontAwesome name={"dollar"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Price" value={this.state.price} keyboardType="numeric" onChangeText={(price) => this.setState({ price })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 4 }}>
                                    <Item style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <MaterialCommunityIcons name={"application"} size={25} color={"#fff"} />
                                        </View>
                                        <Input placeholderTextColor={"#fff"} style={{ flex: 0.9, color: '#fff' }} placeholder="Application" value={this.state.application} onChangeText={(application) => this.setState({ application })} />
                                    </Item>
                                </View>
                                <View style={{ flex: 1 / 4 }}>
                                    <TouchableOpacity onPress={this.takeImage} style={{ flexDirection: "row", alignSelf: "center", width: width * 0.75, justifyContent: "center", marginTop: height / 40 }} >
                                        <Ionicons name={"ios-add-circle-outline"} size={40} color="#fff" />
                                        <Text style={{ alignSelf: "center", color: "#fff" }}>Add image</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                {this.props.fertilizerProgress ? <Spinner /> : <Button onPress={this.updateFertilizer} style={{ alignSelf: "center", width: width * 0.75, justifyContent: "center", borderRadius: width / 12, backgroundColor: "#fafafa" }} ><Text style={{ alignSelf: "center", color: "#272727" }} >Submit</Text></Button>}
                            </View>
                        </ScrollView>
                    </Modal>
                    {/* ********************************** UPDATE FERTILIZER END********************************* */}
                </CompanyPanel>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        companyId: state.authReducer.user.id,
        fertilizerProgress: state.fertilizerReducer.isProgress,
        pesticideProgress: state.pesticideReducer.isProgress,
        machineProgress: state.machinaryReducer.isProgress,
        allFertilizers: state.fertilizerReducer.allFertilizers,
        allMachines: state.machinaryReducer.allMachines,
        allPesticides: state.pesticideReducer.allPesticides,
        machines: state.machinaryReducer.machines,
        pesticides: state.pesticideReducer.pesticides,
        fertilizers: state.fertilizerReducer.fertilizers
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getFertilizerMachinesPesticides: (token) => dispatch(AppAction.getFertilizerMachinesPesticides(token)),
        deleteMachine: (obj, token) => dispatch(AppAction.deleteMachine(obj, token)),
        deletePesticide: (obj, token) => dispatch(AppAction.deletePesticide(obj, token)),
        deleteFertilizer: (obj, token) => dispatch(AppAction.deleteFertilizer(obj, token)),
        updateMachine: (obj, token) => dispatch(AppAction.updateMachine(obj, token)),
        updatePesticide: (obj, token) => dispatch(AppAction.updatePesticide(obj, token)),
        updateFertilizer: (obj, token) => dispatch(AppAction.updateFertilizer(obj, token)),
        clearMachine: () => dispatch(AppAction.clearMachines()),
        clearFertilizer: () => dispatch(AppAction.clearFertilizers()),
        clearPesticide: () => dispatch(AppAction.clearPesticides())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyAddedItems);  