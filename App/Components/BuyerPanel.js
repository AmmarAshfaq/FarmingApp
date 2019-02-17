import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, Thumbnail } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import validator from "validator";
const drawerDataArray = [
    { name: "Messages", icon: require("../../assets/images/chat.png"), route: (ref) => ref.props.navigation.navigate("categoryList") },

    // { name: "Payment Term", icon: require("../../assets/images/term.png"),route:(ref)=>ref.props.navigation.navigate("paymentTerm")  },

];
class BuyerPanel extends Component {
    constructor(props) {
        super(props);
    }
    openDrawer = () => {
        if (this.drawer)
            this.drawer._root.open()
    };
    closeDrawer = () => {
        if (this.drawer)
            this.drawer._root.close()
    };
    componentDidMount() {
        this.props.navigation.setParams({ "openDrawer": this.openDrawer });
    }



    render() {
        return (
            <Drawer
                panOpenMask={20}
                panCloseMask={40}
                ref={(ref) => { this.drawer = ref; }}
                content={<View style={{ flex: 1, backgroundColor: "#272727" }} >
                    <View style={{ flex: 0.4, padding: 10 }} >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Thumbnail large source={{ uri: this.props.user.image_url }} />
                        </View>
                        {/* <View>
                            <Text>{this.props.user.email}</Text>
                            <Text>{this.props.user.name}</Text>
                        </View> */}

                        <View style={{ marginTop: "auto" }} >
                            <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: fontScale * 15 }} > {this.props.user && this.props.user.name} </Text>
                            <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: fontScale * 13 }} > {this.props.user && this.props.user.email} </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, }} >
                        <FlatList data={drawerDataArray} renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => item.route && item.route(this)} activeOpacity={0.6} key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: 10, backgroundColor: "#596275" }} >
                                 <Image source={item.icon} style={{ width: width / 12, height: width / 12, marginRight: 17 }} resizeMode="contain" />
                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: fontScale * 18, marginRight: "auto", color: '#fff' }} >{item.name}</Text>
                            </TouchableOpacity>
                        )
                        }
                        />
                    </View>
                    <View style={{ flex: 0.1, marginTop: "auto" }} >
                        <Button onPress={this.props.signOut} style={{ borderRadius: width / 9, width: width * 0.4, justifyContent: "center", backgroundColor: "#2FCC71", alignSelf: "center" }} ><Text style={{ color: "#fff", fontFamily: "OpenSans-Regular" }}  >Logout</Text></Button>
                    </View>
                </ View>
                }
                onClose={() => this.closeDrawer()} >
                <ScrollView style={{ backgroundColor: '#272727' }} contentContainerStyle={{ height: height - 80, width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: width / 4, height: width / 4 }} source={require('../../assets/images/logo.jpg')} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}
                                onPress={()=>{this.props.navigation.navigate("weather")}}
                            
                            >
                                <Image source={require('../../assets/images/weather.png')} />
                                <Text style={{ color: '#fff' }}>Weather Cast</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}
                                onPress={()=>{this.props.navigation.navigate("cropList")}}
                            
                            >
                                <Image source={require('../../assets/images/exchange.png')} />
                                <Text style={{ color: '#fff' }}>Current Rates</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('allMachine')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/machinary.png')} />
                                <Text style={{ color: '#fff' }}>Machinary</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('allFertilizer')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/fertilizer.png')} />
                                <Text style={{ color: '#fff' }}>Fertilizer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('allPesticide')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/pesticide.png')} />
                                <Text style={{ color: '#fff' }}>Pesticide</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('allCrop')} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/crops.png')} />
                                <Text style={{ color: '#fff' }}>Crops</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Drawer>
        )
    }
}


const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        user: state.authReducer.user,
        token: state.authReducer.token
    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyerPanel);  