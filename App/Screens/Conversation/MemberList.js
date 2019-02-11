import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Input, Button, Picker, Icon, Spinner, ListItem } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from "react-redux";
// import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import AppActions from '../../Store/Actions/AppActions/index';
const mapStateToProps = state => {
    console.log("reducer state", state);
    return {
        isProgress: state.appRecuder["isProgress"],
        user: state.authReducer['user'],
        isError: state.appRecuder["isError"],
        errorText: state.appRecuder["errorText"],
        token: state.authReducer["token"],
        allUsers: state.appRecuder["allUsers"]

    };
};
const mapDispatchToProps = dispatch => {
    return {

        getAllUsers: (userType, token) => dispatch(AppActions.getAllUsers(userType, token))

    };
};

class MemberList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getAllUsers(this.props.navigation.getParam("userType"), this.props.token);
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                {this.props.isProgress ?
                    <Spinner /> :
                    <FlatList data={this.props.allUsers && this.props.allUsers}
                        renderItem={({ item, index }) =>
                            <ListItem onPress={() => { this.props.navigation.navigate("chat", { memberInfo: item }) }} >
                                <Text> {item.name} </Text>
                            </ListItem>
                        }
                    />}
            </View>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberList); 