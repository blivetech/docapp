import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class PatientFeedBackCard extends Component {

  render() {
    return (
      <View  style={styles.container}>
         <View style={{backgroundColor:'#fff' , padding:15 , borderRadius:4}}>
        <View style={{flexDirection:'row' }}>
         
         <Image resizeMode={"cover"} style={{height:40 , width:40 , borderRadius:4}}
         source={this.props.image_url}      />
         <View style={{flexDirection:'column'  , marginTop:5 }}>
         <Text  style={{color:'#484848' , fontSize:15 , marginLeft:10 , fontWeight:"500"}}>{this.props.tagline}</Text>
         <View style={{flexDirection:'row', marginLeft:10  }}>
           {
             this.props.is_verified === "yes" ?
<AntIcon
                    name="checkcircle"
                    color={"#1abc9c"}
                    size={11}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2,
                      marginLeft: 2,
                      marginRight: 1
                    }}
                  />
                  : null
           }
         
         <Text numberOfLines={1}  style={{color:'#484848' , fontSize:13 }}>{this.props.name}</Text>
         <View
          style={{
          borderLeftWidth: 0.6,
          borderLeftColor: '#b0afaf',
          marginLeft:5 , 
          marginRight:5
          }}
        />
         <Text numberOfLines={1}  style={{color:'#484848' , fontSize:13 }}>{this.props.date}</Text>
         </View>

         </View>
         </View>
         <Text style={{marginTop:10}}>
             {this.props.content}
          </Text>
          <View >
            {this.props.recommend === "yes" ?
            <View style={{flexDirection:'row' , marginTop:15 , alignItems:'center'}}>
               <AntIcon
            name="like2"
            color={"#3fabf3"}
            size={13}
           
          /> 
          <Text style={{marginLeft:10 , color:'#3fabf3'}}>{this.props.recommend_text}</Text>
            </View>
           
          : null
            }

          </View>
         </View>

      </View>
      
    );
  }
}
export default  withNavigation(PatientFeedBackCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    marginTop:2,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",

    marginRight:1,
    marginBottom:5,
    borderRadius:4,
  },
  
 
});
