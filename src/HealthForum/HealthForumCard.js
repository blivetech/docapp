import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class HealthForumCard extends Component {
  render() {
    return (
      <View  activeOpacity={.7} style={styles.container}>
       <View style={styles.mainLayoutServices}>
           <View style={{flexDirection:'row', marginLeft:20,
      marginRight:20,marginTop:10 , paddingRight:10
     }}>
          <View style={{width: 50, height: 50 ,  borderRadius:25,borderColor:"#ff5851",borderWidth:2,alignItems:'center' , justifyContent:'center' , alignSelf:'center',}}>
          <Image
          style={{ width:30 , height:30 }}
          source={this.props.image}
        />
          </View>
           
        <View style={{flexDirection:"column"}}>
        <Text  style={{
            color:'#484848',
            fontSize:16,
            marginLeft:20,
            fontWeight:'700',
            marginRight:20,
        }}>{this.props.name}</Text>
             <Text  style={{ color:'#3d4461',
    fontSize:13,
    marginLeft:20,
    marginRight:20,}}>{this.props.date}</Text>
             <Text  style={styles.mainServiceName2}>{this.props.answer} Answers</Text>
        </View>
           </View>
             <Text  style={{
               color:'#484848',
               fontSize:13,
               lineHeight:20,
               marginTop:10,
               marginLeft:20,
               marginRight:20,
               marginBottom:10
             }}>{this.props.detail}</Text>
       </View>
      </View>
    );
  }
}
export default  withNavigation(HealthForumCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    marginTop:2,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft:10,
    marginRight:10,
    marginBottom:5,
    borderRadius:4,
    overflow:'hidden'
  }, 
  mainLayoutServices:{
   flexDirection:'column',overflow:'hidden'
  },
  ImageStyle:{
      margin:15
  },
  mainServiceName:{
      color:'#484848',
      fontSize:15,
      marginLeft:20,
      marginRight:20,
      fontWeight:'400'
  },
  mainServiceName2:{
    color:'#3d4461',
    fontSize:13,
    marginLeft:20,
    marginRight:20,

  }
});
