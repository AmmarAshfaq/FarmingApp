import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Text, Icon, Item, Input } from 'native-base'

class CropPrice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rates: [
        {
          name: 'Onion',
          price: 'Rs 30/Kg',
          weight: '50 Kg'
        },
        {
          name: 'Cucumber',
          price: 'Rs 20/Kg'
        },
        {
          name: 'Garlic',
          price: 'Rs 200/Kg'
        },
        {
          name: 'Carrot',
          price: 'Rs 30/Kg'
        },
        {
          name: 'Red Cabbage',
          price: 'Rs 45/Kg'
        },
        {
          name: 'White Cabbage',
          price: 'Rs 40/Kg'
        },
        {
          name: 'Eggplant',
          price: 'Rs 40/Kg'
        },
        {
          name: 'Red Pepper',
          price: 'Rs 60/Kg'
        },
        {
          name: 'Sweet Potato',
          price: 'Rs 40/Kg'
        },
        {
          name: 'Red Chili',
          price: 'Rs 70/Kg'
        },
        {
          name: 'Onion',
          price: 'Rs 30/Kg'
        },
        {
          name: 'Celery',
          price: 'Rs 45/Kg'
        },
        {
          name: 'Spring Onion',
          price: 'Rs 50/Kg'
        },
        {
          name: 'Turnip',
          price: 'Rs 70/Kg'
        },
        {
          name: 'Avocado',
          price: 'Rs 80/Kg'
        },
        {
          name: 'Green Been',
          price: 'Rs 40/Kg'
        },
        {
          name: 'Pumpkin',
          price: 'Rs 60/Kg'
        },
        {
          name: 'Apple Golden',
          price: 'Rs 350/Kg'
        },
        {
          name: 'Banana',
          price: '1 Dozen/114 Rs'
        },
        {
          name: 'Blue Berries',
          price: 'Rs 669'
        },
        {
          name: 'Fresh Cherry',
          price: 'Rs 340/Kg'
        },
        {
          name: 'Kiwi Fruit',
          price: 'Rs 490/Kg'
        },
        {
          name: 'Lychee',
          price: 'Rs 390/Kg'
        },
        {
          name: 'Green Grapes',
          price: 'Rs 290/Kg'
        },
        {
          name: 'Fresh Pear',
          price: 'Rs 160/Kg'
        },
        {
          name: 'Mango Chaunsa',
          price: 'Rs 190/Kg',
          weight: '20 Kg'
        },
        {
          name: 'Garma',
          price: 'Rs 199'
        },
        {
          name: 'Fresh Plum',
          price: 'Rs 320/Kg'
        },
        {
          name: 'Fresh Apricot',
          price: 'Rs 110/Kg'
        },
        {
          name: 'Fresh Peach',
          price: 'Rs 200/Kg'
        },
        {
          name: 'Raspberries',
          price: 'Rs 699'
        },
        {
          name: 'Sapodilla',
          price: 'Rs 156/Kg'
        },
        {
          category: 'Fruit',
          name: 'Pomegranate-White',
          price: 'Rs 99/Kg',
          weight: '20 Kg',
          city: 'Hyderabad'
        },
        {
          category: 'Fruit',
          name: 'Dates',
          price: 'Rs 475',
          weight: '200 g',
          city: 'Hyderabad'
        },
        {
          category: 'Fruit',
          name: 'Watermelon',
          price: 'Rs 220',
          weight: '4 Kg',
          city: 'Lahore'
        },
        {
          category: 'Fruit',
          name: 'Pineapple',
          price: 'Rs 39',
          weight: '1 Piece Fruit',
          city: 'Hyderabad'
        }
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
      rates: this.state.rates.filter(
        item => item.name.toLowerCase().indexOf(event.toLowerCase()) > -1
      )
    })
  }

  

  render () {
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#272727' }}>
          <Item style={{ marginLeft: 10, marginRight: 10 }}>
            <Icon active name='search' style={{color:'#fff'}} />
            <Input
              placeholder='Search'
              onChangeText={event => this.changeState(event)}
            />
          </Item>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 25
            }}
          >
            <Text
              style={{
                fontFamily: 'Muli-Ligth',
                fontWeight: 'normal',
                color: '#fff'
              }}
            >
              View Price
            </Text>
          </View>

          <View style={styles.container}>
            <StatusBar
             
              hidden
            />
            {this.state.rates.map((item, key) => (
              <View
                style={[styles.row, { flex: 1, flexDirection: 'row' }]}
                key={key}
              >
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ alignSelf:'center',justifyContent:'center',top:20}}>{item.name}</Text>
                  
                  <Text style={{alignSelf:'center', justifyContent:'center',top:20 }}>{item.price}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{alignSelf:'center',justifyContent:'center',top:20 }}>{item.name}</Text>
                 
                  <Text style={{alignSelf:'center', justifyContent:'center',top:20 }}>{item.price}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
    paddingTop: 0,

    alignItems: 'center',
    marginTop: 20
  },
  img: {
    width: 120,
    height: 120
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 80
  },
  btn: {
    width:100,
    height:100,
    margin: 5,
    borderBottomWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor:'#fff',
    borderRadius:60
  }
})

export default CropPrice
