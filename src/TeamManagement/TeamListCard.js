import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, ImageBackground, Text, Alert, AsyncStorage, TouchableOpacity, TextInput, Image, FlatList, PanResponder, Dimensions } from "react-native";
import { SwipeRow, List, Content } from 'native-base';
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import Dash from 'react-native-dash';
import SwipeCards from 'react-native-swipeable-cards';
import * as CONSTANT from '../Constants/Constant';
class TeamListCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View >
          <View style={styles.MainTopRatedStyle}>
            <View style={styles.ImageLayoutStyle}>
              <Image
                resizeMode="contain" style={styles.ImageStyle}
                source={this.props.TeamImage}
              />
            </View>
            <View style={styles.docContentstyle}>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <Text style={styles.DocName}>{this.props.name}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <Text style={{ color: '#767676', fontSize: 13, marginTop: -2 }}>Status: </Text>
                <Text style={{ marginLeft: 5, color: '#767676', fontSize: 13, fontWeight: '700', marginTop: -2 }}>{this.props.status}</Text>
              </View>
   
            </View>
            <View style={{alignSelf:'flex-end'  , justifyContent:'center' ,  backgroundColor: '#fff', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 60, width:'25%' }}>
                              <AntIcon
                                name="delete"
                                color={"#ff5851"}
                                size={20}
                               
                              />
                            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default withNavigation(TeamListCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    borderRadius: 4,
    flexDirection: 'row',
    margin: 3,
    overflow:'hidden'
  },
  MainTopRatedStyle: {
    width:'100%',
    margin: 10,
    flexDirection: 'row',
    overflow:'hidden'
  },
  ImageStyle: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  docContentstyle: {
    flexDirection: 'column',
    marginLeft: 10,
    alignSelf: 'center', width:'60%'
  },
  titleStyle: {
    color: '#6cb7f0',
    fontSize: 13
  },
  ImageLayoutStyle: {
    elevation: 4,
    shadowColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    width: 60,
    height: 60
  },
  DocName: {
    color: '#3d4461',
    fontSize: 15,
    fontWeight: '700',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
