import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class DownloadCard extends Component {

  render() {
    return (
        <TouchableOpacity  activeOpacity={.7} onPress={()=> this.props.navigation.navigate("DetailDoctorScreen")} style={styles.container}>
         <View style={{backgroundColor:'#fff' , padding:15 , borderRadius:4}}>
        <View style={{flexDirection:'row' }}>
         
         <Image resizeMode={"cover"} style={{height:50 , width:50 , borderRadius:50/2}}
         source={require('../../../Assets/Images/Download.png')}      />
         <View style={{flexDirection:'column'  , marginTop:8 }}>
         <Text numberOfLines={1} style={{color:'#484848' , fontSize:15 , marginLeft:10 , fontWeight:"500"}}>{this.props.name}</Text>
         <Text numberOfLines={1}  style={{color:'#484848' , fontSize:13 , marginLeft:10 }}>{this.props.size}</Text>

         </View>
         </View>
         <View style={{ alignSelf:'flex-end' , marginRight:5 , marginTop:-40 , marginBottom:15}}>
         <AntIcon
         name="download"
         color={"#484848"}
         size={15}
         style={{
           alignSelf: "center",
           textAlign: "center",
           marginTop: 2,
           marginLeft: 2,
           marginRight: 1,
           top:4,
           left:1
         }}
       />
         </View> 
         </View>
       </TouchableOpacity>
  
    );
  }
}
export default  withNavigation(DownloadCard);
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor:'#fff',
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
  

});
