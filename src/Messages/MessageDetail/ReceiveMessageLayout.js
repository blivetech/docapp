import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'
import {
  Tooltip,
  Button,
} from 'react-native-ui-kitten';


class ReceiveMessageLayout extends Component {
  
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}
export default  withNavigation(ReceiveMessageLayout);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    flexDirection:'row',
    borderColor:'#dddddd',
    borderWidth: 1,
  },
  
 
});
