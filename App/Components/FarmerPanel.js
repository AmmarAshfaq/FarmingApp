import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Drawer, Thumbnail } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import validator from "validator";
let ref;
const drawerDataArray = [
    { name: "Messages", icon: require("../../assets/images/chat.png"), route: (ref) => ref.props.navigation.navigate("categoryList") },
    { name: "Add Problem", icon: require("../../assets/images/warning-sign.png"), route: (ref) => ref.props.navigation.navigate("addProb") },
    { name: "Payment Term", icon: require("../../assets/images/term.png"), },
    { name: "Add Crop", icon: require("../../assets/images/plant.png"), route: (ref) => ref.props.navigation.navigate("addCrop") },

];
export default class FarmerPanel extends Component {
    constructor(props) {
        super(props);
        ref = this;
        this.drawer = null;
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
                panCloseMask={80}
                ref={(ref) => this.drawer = ref}
                acceptPan={true}
                captureGestures={true}
                acceptTap={true}
                openDrawerOffset={100}
                content={<View style={{ flex: 1, backgroundColor: "#272727" }} >
                    <View style={{ flex: 0.25, padding: 10, }} >
                        <View style={{ justifyContent: "center", alignItems: "center" }} >
                            <Thumbnail large source={{ uri: this.props.user.image_url, }} />
                            {/* <Ionicons name="md-person" size={width / 5} color="#000" style={{ alignSelf: "center" }} /> */}
                        </View>

                        <View style={{ marginTop: "auto" }} >
                            <Text style={{ color: "#fff", fontSize: fontScale * 15 }} > {this.props.user && this.props.user.name} </Text>
                            <Text style={{ color: "#fff", fontSize: fontScale * 13 }} > {this.props.user && this.props.user.email} </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.65, }} >
                        <FlatList data={drawerDataArray} renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => item.route && item.route(this)} activeOpacity={0.6} key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: 10, backgroundColor: "#596275" }} >
                                <Image source={item.icon} style={{ width: width / 12, height: width / 12, marginRight: 17 }} resizeMode="contain" />
                                <Text style={{ fontSize: fontScale * 18, marginRight: "auto", color: "#fff" }} >{item.name}</Text>
                            </TouchableOpacity>
                        )
                        }
                        />
                    </View>
                    <View style={{ flex: 0.1, marginTop: "auto" }} >
                        <Button onPress={this.props.signOut} style={{ borderRadius: width / 9, width: width * 0.4, justifyContent: "center", backgroundColor: "#786fa6", alignSelf: "center" }} ><Text style={{ color: "#fff", fontFamily: "OpenSans-Regular" }}  >Logout</Text></Button>
                    </View>
                </View>
                }
                onClose={() => this.closeDrawer()} >
                {/* backgroundColor: "#2d3436" */}
                <View style={{ flex: 1, backgroundColor: "#272727" }} >

                    <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Thumbnail large source={{ uri: this.props.user.image_url, }} /> */}
                        <Image source={require("../../assets/images/logo.jpg")} style={{ width: width / 4, height: width / 4 }} />
                        <Text style={{ color: "#fff", fontWeight: "bold" }} >Farmer</Text>
                    </View>
                    <ScrollView contentContainerStyle={{ height: height * 0.74 }} showsVerticalScrollIndicator={false} >
                        <View style={{ flex: 1, }}>

                            <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}
                                onPress={()=>{this.props.navigation.navigate("weather")}}
                                >
                                    <Image source={require('../../assets/images/weather.png')}
                                    
                                    />
                                    <Text style={{ color: "#fff" }} >Weather Cast</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={()=>{this.props.navigation.navigate("cropList")}}
                                style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/exchange.png')} />
                                    <Text style={{ color: "#fff" }} >Current Rates</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("machinery") }} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/machinary.png')} />
                                    <Text style={{ color: "#fff" }} >Machinery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("pesticides") }} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/pesticide.png')} />
                                    <Text style={{ color: "#fff" }} >Pesticides</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("solvedProblems")} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/task.png')} />
                                    <Text style={{ color: "#fff" }} >Solved Problem</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("fertilizers")} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/fertilizer.png')} />
                                    <Text style={{ color: "#fff" }} >Fertilizers</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 / 3, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("cropDetails")} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/seeds.png')} />
                                    <Text style={{ color: "#fff" }} >Crop Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("farmerAddedItems")} style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/addeditem.png')} />
                                    <Text style={{ color: "#fff" }} >Added Items</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Drawer>
        )
    }
}