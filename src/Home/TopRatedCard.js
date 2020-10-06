import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class TopRatedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5
        };
      }
      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
  render(){
    return (
      <View  style={styles.container}>
      <View >
      <View style={styles.MainTopRatedStyle}>
      <View style={styles.ImageLayoutStyle}>
      <Image
          resizeMode="contain" style={styles.ImageStyle}
          source={this.props.profileImage}
      />
      {
        this.props.featured_check == "yes" && 
           <View
                style={{
                    position:'absolute',
                    overflow:'hidden',
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderRightWidth: 30,
                    borderTopWidth: 30,
                    borderTopLeftRadius: 4,
                    overflow: "visible",
                    borderRightColor: "transparent",
                    borderTopColor: "#ff5851"
                }}
              />
      }
      {
        this.props.featured_check == "yes" && 
                <Image
           resizeMode={'contain'} style={{
            position:'absolute',
            width:15,
            height:15,
            top:4,
            left:3
           }}
          source={require('../../Assets/Images/featured.png')}
      />
      }
      
      </View>
      <View style={styles.docContentstyle}>
      <Text style={styles.titleStyle}>{this.props.specialities}</Text>
      <View style={{flexDirection:'row',marginTop:2}}>
          <Text style={styles.DocName}>{this.props.name}</Text>
          {
            this.props.verified_medically == "yes" &&
            <AntIcon
            name="star"
            color={"#3fabf3"}
            size={13}
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginTop: 2,
              marginLeft: 4,
              marginRight: 1
            }}
          />
          }
                  {
                    this.props.verified == "yes" && 
                    <AntIcon
                    name="checkcircle"
                    color={"#1abc9c"}
                    size={12}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2,
                      marginLeft: 2,
                      marginRight: 1
                    }}
                  />
                  }
                
      </View>
      {this.props.role == "doctor" ?
      <Text numberOfLines={1} style={{marginTop:2 , color:"#767676" , marginRight:5 , fontSize:13}}>{this.props.sub_heading}</Text>
      :
      <Text style={{marginTop:2 , color:"#767676" , paddingRight: 5  , marginRight:5 , fontSize:13}}>{this.props.sub_heading}</Text>
      }
      {
        this.props.role == "doctor" &&
        <View style={{flexDirection:'row' ,marginTop:4}}>
        <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={13}
                  fullStarColor={"#fecb02"}
                  emptyStarColor={"#fecb02"}
                  rating={this.props.average_rating}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                />
                <Text style={{marginLeft:10 , color:'#767676' , fontSize:13 , marginTop:-2}}>{this.props.total_rating} Feedback</Text>
        </View>
      }
     
      </View>
      </View>
      </View>
      </View>
      
    );
  }
}
export default  withNavigation(TopRatedCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    borderRadius:4,
    flexDirection:'row',
    margin:3,
  },
  MainTopRatedStyle:{
    margin:10,
    flexDirection:'row',
    overflow:'hidden'
  },
  ImageStyle:{
    height:90,
    width:90 ,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  docContentstyle:{
      flexDirection:'column',
      marginLeft:10,
      alignSelf:'center'
  },
  titleStyle:{
      color:'#6cb7f0',
      fontSize:13
  },
  ImageLayoutStyle:{
    elevation:4,
    shadowColor:'#000',
    borderRadius:4,
    overflow:'hidden',
    width:90,
    height:90
  },
  DocName:{
      color:'#3d4461',
      fontSize:15,
      fontWeight:'500',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
 
});
