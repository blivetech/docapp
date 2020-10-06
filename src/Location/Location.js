import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Text } from "react-native";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";

class Location extends Component {
  focus=()=>{
    return
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <ScrollView>
          <Text style={styles.locationText}>Search Location</Text>
          <Input
            style={styles.input}
            textStyle={styles.inputText}
            placeholder="Search Location"
          />
          <Button onPress={()=> this.props.navigation.navigate("Home")} style={styles.buttonStyle}>Search</Button>
          <View style={styles.singleline} />
          <View style={styles.CurrentLocationStyle}>
            <Text style={styles.CurrentLocationTextStyle}>
              Use My Current Location
            </Text>
            <View style={styles.iconStyle}>
              <AntIcon name="earth" color="#ff5851" size={15} />
            </View>
          </View>
          <View style={styles.singleline} />
        </ScrollView>
      </View>
    );
  }
}
export default Location;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  locationText: {
    margin: 15,
    color: "#fe736e",
    fontWeight: "700"
  },
  inputText: {
  },
  input: {
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyle: {
    width: 130,
    height: 50,
    backgroundColor: "#3fabf3",
    borderBottomColor: "#3fabf3",
    marginLeft: 15,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: { width: 1, height: 13 },
  },
  singleline: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.6
  },
  CurrentLocationStyle: {
    backgroundColor: "#fcfcfc",
    padding: 15,
    flexDirection: "row"
  },
  CurrentLocationTextStyle: {
    color: "#55acee",
  },
  iconStyle: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    
  }
});
