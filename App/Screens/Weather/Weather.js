import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

export default class Weather extends Component {
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
  render () {
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
              Today's Weather
            </Text>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#30333612' }}>
            <Text style={[styles.tableColumn]}>Temperature(Max/Min)</Text>
            <Text style={styles.tableColumn}>Humidity</Text>
            <Text style={styles.tableColumn}>RainFall</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.tableColumn}>44'C/22'C</Text>
            <Text style={styles.tableColumn}>57%</Text>
            <Text style={styles.tableColumn}>No</Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, marginLeft: 5,
            backgroundColor: '#F5FCFF',
            marginRight: 5, }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text
              style={[styles.tableColumn2, { backgroundColor: '#30333645' }]}
            >
              Dates
            </Text>
            <Text style={[styles.tableColumn2, styles.weekColor]}>Mon</Text>
            <Text style={[styles.tableColumn2, styles.weekColor]}>Tue</Text>
            <Text style={[styles.tableColumn2, styles.weekColor]}>Wed</Text>
            <Text style={[styles.tableColumn2, styles.weekColor]}>Thu</Text>
            <Text style={[styles.tableColumn2, styles.weekColor]}>Fri</Text>
            <Text style={[styles.tableColumn2, styles.weekColor]}>Sat</Text>
            <Text style={[styles.tableColumn2, styles.weekColor]}>Sun</Text>
          </View>
          <View style={{ flex: 4, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <FlatList
                horizontal
                data={list}
                renderItem={({ item }) => (
                  <View>
                    <Text
                      style={[
                        styles.tableColumn2,
                        { backgroundColor: '#30333645' }
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={[styles.tableColumn2, styles.weekColor]}>
                      {item.key}
                    </Text>
                    <Text style={[styles.tableColumn2, styles.weekColor]}>
                      {item.key}
                    </Text>
                    <Text style={[styles.tableColumn2, styles.weekColor]}>
                      {item.key}
                    </Text>
                    <Text style={[styles.tableColumn2, styles.weekColor]}>
                      {item.key}
                    </Text>
                    <Text style={[styles.tableColumn2, styles.weekColor]}>
                      {item.key}
                    </Text>
                    <Text style={[styles.tableColumn2, styles.weekColor]}>
                      {item.key}
                    </Text>
                    <Text style={[styles.tableColumn2, styles.weekColor]}>
                      {item.key}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

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
