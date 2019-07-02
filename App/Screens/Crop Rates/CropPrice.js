import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,Dimensions
} from 'react-native'
const {width,height} = Dimensions.get('window')
import { Text, Icon, Item, Input } from 'native-base'
import { connect } from 'react-redux';
const numColumns = 2;
class CropPrice extends Component {
  constructor(props) {
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

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return (
        <View
          style={{
            backgroundColor: "#4D243D",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            margin: 1,
            height: Dimensions.get("window").width / numColumns,
            backgroundColor: "transparent"
          }}
        />
      );
    }
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          margin: 1
        }}

        onPress={() => { }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.4 }}>
            <Text style={{ color: '#fff',fontSize:width/24,fontWeight:'bold' }}>
              Name: {item.cropName}
            </Text>
          </View>

          <View style={{ flex: 0.3,fontSize:width/32 }}>
            <Text style={{ color: '#fff' }}>
              Max Price: {item.cropMax}
            </Text>
          </View>
          <View style={{ flex: 0.3,fontSize:width/32  }}>

            <Text style={{ color: '#fff' }}>
              Min Price: {item.cropMin}
            </Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };
  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };
  render() {
    const { navigate } = this.props.navigation

    return (
      <ScrollView style={{backgroundColor: '#272727'}}>
        <View style={{ flex: 1, backgroundColor: '#272727' }}>
          <View style={{ flex: 0.2 }}>

            {/* <Item style={{ marginLeft: 10, marginRight: 10 }}>
              <Icon active name='search' style={{ color: '#fff' }} />
              <Input
                placeholder='Search'
                onChangeText={event => this.changeState(event)}
              />
            </Item> */}
          </View>
          <View style={{ flex: 0.1 }}>

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
          </View>


          <View style={{ flex: 0.7 }}>
            <FlatList
              data={this.formatData(this.props.cropRateList, numColumns)}
              style={{ flex: 1 }}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </View>
          {/* {
              
              this.state.rates.map((item, key) => (
              <View
                style={[styles.row, { flex: 1, flexDirection: 'row' }]}
                key={key}
              >
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ alignSelf: 'center', justifyContent: 'center', top: 20 }}>{item.name}</Text>

                  <Text style={{ alignSelf: 'center', justifyContent: 'center', top: 20 }}>{item.price}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{ alignSelf: 'center', justifyContent: 'center', top: 20 }}>{item.name}</Text>

                  <Text style={{ alignSelf: 'center', justifyContent: 'center', top: 20 }}>{item.price}</Text>
                </TouchableOpacity>
              </View>
            ))} */}
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
    width: 100,
    height: 100,
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
    backgroundColor: '#fff',
    borderRadius: 60
  }
})

const mapStateToProps = (state) => {
  return {
    cropRateList: state.appRecuder["cropRateList"]
  }
}
export default connect(mapStateToProps, null)(CropPrice);
