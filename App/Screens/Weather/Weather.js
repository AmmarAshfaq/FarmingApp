import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux';
import AppActions from '../../Store/Actions/AppActions/index';
class Weather extends Component {
  static navigationOptions = {
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      fontFamily: 'Muli-Light',
      fontWeight: '200'
    },
    headerRight: <View />
  }
  componentDidMount() {
    this.props.getWeatherDetail(this.props.token);
  }
  render() {
    console.log(this.props.weather, "weather")
    const list = [
      { title: 'Karachi', key: "44'C/22'C" },
      { title: 'Lahore', key: "44'C/22'C" },
      { title: 'Hyderabad', key: "44'C/22'C" },
      { title: 'Multan', key: "44'C/22'C" },
      { title: 'Peshawar', key: "44'C/22'C" },
      { title: 'Sukkur', key: "44'C/22'C" },
      { title: 'Faisalabad ', key: "44'C/22'C" },
      { title: 'Quetta', key: "44'C/22'C" },
      { title: 'Islamabad ', key: "44'C/22'C" }
    ]
    return (
      <View style={{ flex: 1, backgroundColor: '#272727' }}>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 25,
            backgroundColor: '#F5FCFF',
            justifyContent: 'space-around',
            borderWidth: 1,
            marginLeft: 5,
            marginRight: 5
          }}
        >
          <View
            style={{
              flex: 0.1,
              padding: 8,
              borderColor: '#000',
              backgroundColor: '#30333645'
            }}
          >
            <Text
              style={{
                fontWeight: 'normal',
                color: '#000',
                fontFamily: 'Muli-Ligth',
                alignSelf: 'center'
              }}
            >
              Weather Detail
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 0.1, backgroundColor: '#30333612' }}>
            <View style={{ flex: 0.2,justifyContent:'center',alignItems:'center' }}>
              <Text style={{ textAlign: 'center', color: '#000' }}>Day</Text>

            </View>
            <View style={{ flex: 0.8, flexDirection: 'row' }}>

              <Text style={[styles.tableColumn]}>Temperature(Max/Min)</Text>
              <Text style={styles.tableColumn}>Humidity</Text>
              <Text style={styles.tableColumn}>RainFall</Text>
            </View>
          </View>
          <View style={{ flex: 0.7, flexDirection: 'row' }}>
            <View style={{ flex: 0.2, flexDirection: 'column' }}>

              <Text style={[styles.tableColumn2, styles.weekColor]}>Mon</Text>
              <Text style={[styles.tableColumn2, styles.weekColor]}>Tue</Text>
              <Text style={[styles.tableColumn2, styles.weekColor]}>Wed</Text>
              <Text style={[styles.tableColumn2, styles.weekColor]}>Thu</Text>
              <Text style={[styles.tableColumn2, styles.weekColor]}>Fri</Text>
              <Text style={[styles.tableColumn2, styles.weekColor]}>Sat</Text>
              <Text style={[styles.tableColumn2, styles.weekColor]}>Sun</Text>
            </View>
            <View style={{ flex: 0.8 }}>

              {
                this.props.weather !== null ?


                  <FlatList
                    data={this.props.weather}
                    style={{ flex: 1, }}
                    renderItem={({ item }) => (
                      <View style={{ flexDirection: 'row', flex: 1 }}>

                        <Text style={styles.tableColumn}>{item.temperature.max}'C / {item.temperature.min}'C</Text>
                        <Text style={styles.tableColumn}>{item.humidity}%</Text>
                        <Text style={styles.tableColumn}>{item.rain.main}</Text>
                      </View>
                    )} />
                  :
                  <View style={{ flexDirection: 'row', flex: 0.1 }}>

                    <Text style={styles.tableColumn}>No Data</Text>
                    <Text style={styles.tableColumn}>No Data</Text>
                    <Text style={styles.tableColumn}>No Data</Text>
                  </View>
              }
            </View>

          </View>

        </View>


      </View>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getWeatherDetail: (token) => {
      dispatch(AppActions.getWeatherDetail(token))
    }
  }
}
function mapStateToProps(state) {
  return {
    token: state.authReducer["token"],
    weather: state.appRecuder["weatherResponse"]
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Weather);
const styles = StyleSheet.create({
  todayData: {
    justifyContent: 'space-around',
    marginLeft: 70,
    marginTop: 30
  },
  tableColumn: {

    width: '33%',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 8,
    fontWeight: '200',
    color: '#000',
    fontFamily: 'Muli-Ligth'
  },
  tableColumn2: {

    textAlign: 'center',
    padding: 8,
    fontWeight: '200',
    color: '#000',
    fontFamily: 'Muli-Ligth'

  },
  tableColumn3: {
    width: '50%'
  },
  weekColor: {
    backgroundColor: '#30333612',
    paddingTop: 15,
    paddingBottom: 15
  }
})
