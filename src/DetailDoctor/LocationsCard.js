import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity,FlatList , StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'

class LocationsCard extends Component {
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
  render() {
    return (
      <TouchableOpacity  activeOpacity={.7} onPress={()=> this.props.navigation.navigate("DetailDoctorScreen")} style={styles.container}>
<View >
      <View style={styles.MainTopRatedStyle}>
      <View style={styles.ImageLayoutStyle}>
      
      <Image
          resizeMode={"cover"} style={styles.ImageStyle}
          source={this.props.image}
      />
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
      </View>
      <View style={styles.docContentstyle}>
      <Text style={styles.titleStyle}>{this.props.specialityName}</Text>
      <View style={{flexDirection:'row',marginTop:2}}>
          <Text style={styles.DocName}>{this.props.Name}</Text>
          <AntIcon
                    name="heart"
                    color={"#3fabf3"}
                    size={12}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2,
                      marginLeft: 2,
                      marginRight: 1
                    }}
                  />
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
      </View>
      <Text numberOfLines={1} style={{marginTop:2 , color:"#767676" , fontSize:13}}>{this.props.subHeading}</Text>
      {/* <View style={{flexDirection:'row' ,marginTop:2}}>
      <StarRating
                disabled={true}
                maxStars={5}
                starSize={16}
                fullStarColor={"#fecb02"}
                emptyStarColor={"#fecb02"}
                rating={4}
                selectedStar={rating => this.onStarRatingPress(rating)}
              />
              <Text style={{marginLeft:10 , color:'#767676', fontSize:13}}>2100 Feedback</Text>
      </View> */}
      <View style={{marginTop:3 ,flexDirection:'row' }}>
      <AntIcon
                    name="pushpino"
                    color={"#3d4461"}
                    size={11}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2,
                      marginLeft: 2,
                      marginRight: 1 , marginRight:5
                    }}
                  />
          <Text style={{color:"#767676", fontSize:13}}>{this.props.location}</Text>
      </View>
      <View style={{marginTop:2 ,flexDirection:'row' }}>
      <AntIcon
                    name="calendar"
                    color={"#3d4461"}
                    size={11}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2, 
                      marginLeft: 2,
                      marginRight: 1 , marginRight:5
                    }}
                  />
                  <FlatList
                    horizontal={true}
                    style={{}}
                    data={this.props.booking_days}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({item}) => (
                      <Text style={{color:"#76d7c4", fontSize:13}}>{item.name}  </Text>
                    )
                    }
                  />
        
      </View>
      <View style={{marginTop:2 ,flexDirection:'row' }}>
      <AntIcon
                    name="like2"
                    color={"#3d4461"}
                    size={11}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2,
                      marginLeft: 2,
                      marginRight: 1 , marginRight:5
                    }}
                  />
      <Text style={{color:"#767676", fontSize:13}}>Onboard Doctors: {this.props.onboard_doctors}</Text>
      </View>
      {/* <View style={{marginTop:2 ,flexDirection:'row' }}>
      <AntIcon
                    name="wallet"
                    color={"#3d4461"}
                    size={11}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2,
                      marginLeft: 2,
                      marginRight: 1
                      , marginRight:5
                    }}
                  />
      <Text style={{color:"#767676", fontSize:13}}>Starting From $50</Text>
      </View> */}
      <View style={{marginTop:2 ,flexDirection:'row' }}>
      <AntIcon
                    name="calendar"
                    color={"#3d4461"}
                    size={11}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 2,
                      marginLeft: 2,
                      marginRight: 1,  marginRight:5
                    }}
                  />
      <Text style={{color:'#76d7c4', fontSize:13}}>Availability: {this.props.availability}</Text>
      </View>

      </View>
      </View>
      </View>
      </TouchableOpacity>
      
    );
  }
}
export default  withNavigation(LocationsCard);
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
    marginBottom:8,
    marginRight:2,
    paddingRight:5
  },
  MainTopRatedStyle:{
    flexDirection:'row'
  },
  ImageStyle:{
    flex: 1,
    width:120 ,
  
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  docContentstyle:{
      flexDirection:'column',
      justifyContent:'center',
      marginLeft:10,
      marginBottom:10
  },
  titleStyle:{
      color:'#6cb7f0',
      fontSize:13,
      marginTop:10
  },
  ImageLayoutStyle:{
    elevation:4,
    shadowColor:'#000',
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
    overflow:'hidden',
    width:120,
    height:150,
  },
  DocName:{
      color:'#3d4461',
      fontSize:15,
      fontWeight:'500'
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
 
});
