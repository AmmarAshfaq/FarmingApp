import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList,Dimensions
} from 'react-native'
import {
  Text,
  Icon,
  Item,
  Input, ListItem,
} from 'native-base'
const {width,height} = Dimensions.get('window')
import Ripple from 'react-native-material-ripple'
import ElevatedView from 'react-native-elevated-view'
import { connect } from 'react-redux';
import AppActions from '../../Store/Actions/AppActions'
class CropList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: []
    }
    this.changeState = this.changeState.bind(this)
  }
  static navigationOptions = {

    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      alignSelf: 'center',
      textAlign: 'center',
      fontFamily: 'Muli-Light',
      fontWeight: '200'
    },
    headerRight: <View />
  }

  changeState = event => {
    console.log(event)
    this.setState({
      selectValue: this.props.cityList.filter(
        item => item.cityName.toLowerCase().indexOf(event.toLowerCase()) > -1
      )
    })

  }
  cropRatesFunc = (url) => {
    this.props.getSpecificCropRates(this.props.token, url)
    this.props.navigation.navigate('cropPrice')
  }

  componentDidMount() {
    this.props.getCropRates(this.props.token)
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#272727' }}>
        <Text style={{ fontSize: width / 16, fontWeight: 'bold', color: '#fff',textAlign:'center' }}>
          City List
        </Text>
        {/* <Item style={{ marginLeft: 10, marginRight: 10 }}>
          <Icon active name='search' style={{ color: '#fff' }} />
          <Input
            placeholder='Search'
            onChangeText={event => this.changeState(event)}
            placeholderTextColor="#fff"
          />
        </Item> */}
        {/*<ElevatedView elevation={3} style={styles.stayElevated} />*/}
        <FlatList
          data={this.props.cityList}
          //
          renderItem={({ item }) => (
            <ListItem onPress={() => this.cropRatesFunc(item.url)}>
              <Text style={{ color: '#fff' }}>{item.cityName}</Text>
              {/*<ElevatedView elevation={3} style={styles.stayElevated}>*/}
              {/*<Ripple*/}
              {/*rippleDuration={900}*/}
              {/*onPress={() => this.props.navigation.navigate('cropPrice')}*/}
              {/*style={{ flex: 1 }}*/}
              {/*>*/}
              {/*<View style={styles.buttonContainer}>*/}
              {/*<Text style={styles.heading}>{item.cityName}</Text>*/}
              {/*</View>*/}
              {/*</Ripple>*/}
              {/*</ElevatedView>*/}
            </ListItem>

          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    alignItems: 'center',
    marginTop: 20
  },
  buttonContainer: {
    padding: 10
  },
  stayElevated: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 3
  },
  heading: {
    fontWeight: 'normal',
    fontFamily: '33535gillsansmt',
    fontSize: 20
  }
})

function mapStateToProps(state) {
  return {
    token: state.authReducer["token"],
    cityList: state.appRecuder["cityList"]
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getCropRates: (token) => {
      dispatch(AppActions.getCropRate(token))
    },
    getSpecificCropRates: (token, url) => {
      dispatch(AppActions.getSpecificCropRate(token, url))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CropList);
