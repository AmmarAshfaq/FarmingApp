import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import {
  Text,
  Icon,
  Item,
  Input,
} from 'native-base'
import Ripple from 'react-native-material-ripple'
import ElevatedView from 'react-native-elevated-view'

class CropList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectValue: [
        { cityName: 'Karachi' },
        { cityName: 'Lahore' },
        { cityName: 'Hyderabad' },
        { cityName: 'Multan' },
        { cityName: 'Sakhar' },
        { cityName: 'Peshawar' },
        { cityName: 'Skardu' },
        { cityName: 'Murre' },
        { cityName: 'Faisalabad' },
        { cityName: 'Islamabad' }
      ]
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
      selectValue: this.state.selectValue.filter(
        item => item.cityName.toLowerCase().indexOf(event.toLowerCase()) > -1
      )
    })
  
  }
  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#272727' }}>
        <Item style={{ marginLeft: 10, marginRight: 10 }}>
          <Icon active name='search' style={{color:'#fff'}}/>
          <Input
            placeholder='Search'
            onChangeText={event => this.changeState(event)}
          />
        </Item>
        <ElevatedView elevation={3} style={styles.stayElevated} />
        <FlatList
          data={this.state.selectValue}
          //
          renderItem={({ item }) => (
            <ElevatedView elevation={3} style={styles.stayElevated}>
              <Ripple
                rippleDuration={900}
                onPress={() => this.props.navigation.navigate('cropPrice')}
                style={{ flex: 1 }}
              >
                <View style={styles.buttonContainer}>
                  <Text style={styles.heading}>{item.cityName}</Text>
                </View>
              </Ripple>
            </ElevatedView>
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

export default CropList
