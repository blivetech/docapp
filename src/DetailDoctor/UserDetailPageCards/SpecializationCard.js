import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class SpecializationCard extends Component {

  render() {
    return (
        <TouchableOpacity  activeOpacity={.7} onPress={()=> this.props.navigation.navigate("DetailDoctorScreen")} style={styles.container}>
        <View style={styles.mainLayoutServices}>
        <View style={styles.circle} />
              <Text style={styles.mainServiceName}>{this.props.name}</Text>
        </View>
       </TouchableOpacity>
  
    );
  }
}
export default  withNavigation(SpecializationCard);
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor:'#ffffff',
    marginTop:2,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    borderRadius:4,
  }, 
  mainLayoutServices:{
   flexDirection:'row',
  },
  ImageStyle:{
      margin:15
  },
  mainServiceName:{
      color:'#484848',
      fontSize:15,
      marginLeft:10,
      marginTop:15,
      marginRight:25,
      fontWeight:'400',
      marginBottom:15
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: '#fe736e',
    marginTop:20,
    marginLeft:20
}

});
