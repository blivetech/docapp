import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class CustomHeader extends Component {
  // constructor(props){
  //     super(props);
  //     this.showSearch = this.showSearch.bind(this);// you should bind this to the method that call the props

  render() {
    return (
      // <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("SearchScreen")}>

      <View>
          { Platform.OS === "ios" &&
       <StatusBar hidden />

        }
    <View
          style={{
            height: 60,
            paddingLeft: 15,
            paddingRight: 15,
            width: "100%",
            backgroundColor: "#3fabf3",
            flexDirection: "row",
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 10
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={{
              flexDirection: "column",
              width: "20%",
              display: "flex",
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <AntIcon name="back" size={25} color={"#fff"} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              width: "60%",
              display: "flex",
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                alignSelf: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#fff",
                  height: 30,
                  marginTop: 9,
                  width:'100%',
                  textAlign:'center'
                }}>
                {this.props.headerText}
              </Text>
            </View>
          </View>
        </View>
      </View>
      // </TouchableOpacity>
    );
  }
}
export default withNavigation(CustomHeader);
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3d4461",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10
  }
});
