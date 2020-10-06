import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Text , Image  , Dimensions} from "react-native";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";

class TopCategoryCard extends Component {
  render() {
    return (
      <View style={styles.container}>
      
      <View style={[ styles.CardMainView, {backgroundColor: this.props.colorCode ,} ]}>
        
         {/* <View style={{backgroundColor:"#000" , opacity:0.6}}> */}
         <View style={styles.ThirdLayerStyle}>
        </View>
        <View style={styles.SecondLayerStyle}>
         </View>
      {/* </View> */}
         <View style={styles.FirstLayerStyle}>
         <Image resizeMode={'contain'} style={styles.CatImageStyle}
          source={this.props.imageUri}
        />
         </View>
        
        <Text numberOfLines={1} style={{color:'#fff' ,  fontSize:17, top:28  , marginLeft:25  , marginRight:20}}>{this.props.name}</Text>
       </View>

      </View>
    );
  }
}
export default TopCategoryCard;
const styles = StyleSheet.create({
  container: {
    padding:5,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
  },
  CardMainView:{
    flexDirection:'row',
    borderRadius:4,
    height:80,
    elevation:3,
    shadowColor:'#000',
    overflow:'hidden',
  },
  ThirdLayerStyle:{ 
    flexDirection:'row',
    position:'relative',
    backgroundColor:'#fff',
    opacity:0.16,
    width:80,
    height:80,
    borderTopRightRadius:40,
    borderBottomRightRadius:40,
    
  },
  SecondLayerStyle:{
    marginLeft:-88,
    backgroundColor:'#fff',
    opacity:0.32,
    width:80,
    height:80,
    borderTopRightRadius:40,
    borderBottomRightRadius:40,
    
  },
  FirstLayerStyle:{
    flexDirection:'column',
    marginLeft:-89,
    backgroundColor:'#fff',
    width:80,
    height:80,
    borderTopRightRadius:40,
    borderBottomRightRadius:40,
    alignContent:'center',
    alignItems:'center'
  },
  CatImageStyle:{
      width:40,
      height:40,
      alignSelf:'center',
      justifyContent:'center',
      top:20,
      left:5
  }
});
