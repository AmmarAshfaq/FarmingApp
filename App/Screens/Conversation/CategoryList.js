import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Spinner, ListItem } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
// import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.authReducer["isProgress"],
        user: state.authReducer['user'],
        isError: state.authReducer["isError"],
        errorText: state.authReducer["errorText"],
        token: state.authReducer["token"]

    };
};
const mapDispatchToProps = dispatch => {
    return {

        // getTokenAndUser: (token, user) => dispatch(AuthActions.getUserAndTokenFromAsyncStorage(token, user))

    };
};

class CategoryList extends Component {
    constructor(props) {
        super(props);
    }
    setUserType = (userType) => {
        this.props.navigation.navigate("memberList", { userType })
    }
    render() {
        return (
            <View style={{ flex: 1, }} >

                {this.props.user.userType == "farmer" ? < FlatList data={[{ name: "Expert", userType: "expert" }, { name: "Buyer", userType: "buyer" }, { name: "Company", userType: "company" }]} renderItem={({ item, index }) =>
                    <ListItem onPress={() => this.setUserType(item.userType)} >
                        <Text> {item.name} </Text>
                    </ListItem>
                } /> :
                    <View />
                }
                {this.props.user.userType == "expert" ? < FlatList data={[{ name: "Farmer", userType: "farmer" }]} renderItem={({ item, index }) =>
                    <ListItem onPress={() => this.setUserType(item.userType)} >
                        <Text> {item.name} </Text>
                    </ListItem>
                } /> :
                    <View />
                }
                {this.props.user.userType == "buyer" ? < FlatList data={[{ name: "Farmer", userType: "farmer" }, { name: "Company", userType: "company" }]} renderItem={({ item, index }) =>
                    <ListItem onPress={() => this.setUserType(item.userType)} >
                        <Text> {item.name} </Text>
                    </ListItem>
                } /> :
                    <View />
                }
                {this.props.user.userType == "company" ? < FlatList data={[{ name: "Expert", userType: "expert" }, { name: "Buyer", userType: "buyer" }, { name: "Farmer", userType: "farmer" }]} renderItem={({ item, index }) =>
                    <ListItem onPress={() => this.setUserType(item.userType)} >
                        <Text> {item.name} </Text>
                    </ListItem>
                } /> :
                    <View />
                }
            </View>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList); 