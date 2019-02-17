import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Image, Drawer, Thumbnail } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import validator from "validator";
const drawerDataArray = [
    { name: "Messages", route: (ref) => ref.props.navigation.navigate("categoryList") },

    { name: "Payment Term", },


];
export default class CompanyPanel extends Component {
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
        console.log("props", this.props.signOut)
    }
    render() {
        return (
            <Drawer
                panOpenMask={20}
                panCloseMask={40}
                ref={(ref) => { this.drawer = ref; }}
                content={<View style={{ flex: 1, backgroundColor: "#272727" }} >
                    <View style={{ flex: 0.25, padding: 10 }} >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Thumbnail large source={{ uri: this.props.user && this.props.user.image_url }} />
                        </View>

                        <View style={{ marginTop: "auto" }} >
                            <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: fontScale * 15 }} > {this.props.user && this.props.user.name} </Text>
                            <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: fontScale * 13 }} > {this.props.user && this.props.user.email} </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.65, }} >
                        <FlatList data={this.props.drawerDataArray} renderItem={({ item, index }) => (

                            <TouchableOpacity onPress={() => item.route && item.route(this)} activeOpacity={0.6} key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: 10, backgroundColor: "#596275" }} >
                                 {/*<Image source={item.icon} style={{ width: width / 12, height: width / 12, marginRight: 17 }} resizeMode="contain" />*/}
                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: fontScale * 18, marginRight: "auto", color: '#fff' }} >{item.name}</Text>
                                <Text>{console.log(item)}</Text>
                            </TouchableOpacity>
                        )
                        }
                        />
                    </View>
                    <View style={{ flex: 0.1, marginTop: "auto" }} >
                        <Button onPress={this.props.signOut} style={{ borderRadius: width / 9, width: width * 0.4, justifyContent: "center", backgroundColor: "#2FCC71", alignSelf: "center" }} ><Text style={{ color: "#fff", fontFamily: "OpenSans-Regular" }}  >Logout</Text></Button>
                    </View>
                </View>
                }
                onClose={() => this.closeDrawer()} >
                <View style={{ flex: 1, backgroundColor: "#272727" }}>
                    {this.props.children}
                </View>
            </Drawer>
        )
    }
}