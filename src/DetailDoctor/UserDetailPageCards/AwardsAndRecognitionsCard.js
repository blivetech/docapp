import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class AwardsAndRecognitionsCard extends Component {

  render() {
    return (
        <TouchableOpacity  activeOpacity={.7} onPress={()=> this.props.navigation.navigate("DetailDoctorScreen")} style={styles.container}>
        <View style={styles.mainLayoutServices}>
              <Text style={styles.mainServiceName}>{this.props.title} ( {this.props.year} )</Text>
        </View>
       </TouchableOpacity>
  
    );
  }
}
export default  withNavigation(AwardsAndRecognitionsCard);
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
   flexDirection:'row',
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
      marginRight:10,
      fontWeight:'400',
      marginBottom:15
  }

});
