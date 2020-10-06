import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class OfferedServicesCard extends Component {

  render() {
    return (
      <TouchableOpacity  activeOpacity={.7} onPress={()=> this.props.navigation.navigate("DetailDoctorScreen")} style={styles.container}>
       <View style={styles.mainLayoutServices}>
           <Image
                resizeMode="cover" style={styles.ImageStyle}
                source={this.props.logo}/>
             <View style={{ borderLeftColor: '#dddddd',borderLeftWidth: 0.6,}}/>
             <Text numberOfLines={1} style={styles.mainServiceName}>{this.props.name}</Text>
       </View>
       <AntIcon
                    name="down"
                    color={"#484848"}
                    size={17}
                    style={{alignSelf:'flex-end' , marginTop:-42 , marginRight:10}}
                  />
      </TouchableOpacity>
      
    );
  }
}
export default  withNavigation(OfferedServicesCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    marginTop:2,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginRight:3,
    marginLeft:3,
    marginBottom:5,
    borderRadius:4,
    height:70
  }, 
  mainLayoutServices:{
   flexDirection:'row',
   height:70
  },
  ImageStyle:{
      margin:15,
      width:35,
      height:35
  },
  mainServiceName:{
      color:'#484848',
      fontSize:15,
      margin:24,
      fontWeight:'400'
  }
});
