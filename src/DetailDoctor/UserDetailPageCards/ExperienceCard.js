import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class ExperienceCard extends Component {

  render() {
    return (
      <TouchableOpacity  activeOpacity={.7} onPress={()=> this.props.navigation.navigate("DetailDoctorScreen")} style={styles.container}>
       <View style={styles.mainLayoutServices}>
             <Text  style={styles.mainServiceName}>{this.props.name}({this.props.start} - {this.props.end})</Text>
             <Text  style={styles.mainServiceName2}>{this.props.title}</Text>
       </View>
      </TouchableOpacity>
      
    );
  }
}
export default  withNavigation(ExperienceCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    marginTop:2,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft:3,
    marginRight:3,
    marginBottom:5,
    borderRadius:4,
  }, 
  mainLayoutServices:{
   flexDirection:'column',
  },
  ImageStyle:{
      margin:15
  },
  mainServiceName:{
      color:'#484848',
      fontSize:15,
      marginLeft:20,
      marginRight:20,
      marginTop:15,
      fontWeight:'400'
  },
  mainServiceName2:{
    color:'#484848',
    fontSize:13,
    marginLeft:20,
    marginRight:20,
    marginBottom:15
  }
});
