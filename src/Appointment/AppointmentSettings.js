import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView,Switch, Text, TouchableOpacity, TextInput, Image, FlatList,ActivityIndicator, PanResponder, Alert, Dimensions } from "react-native";
import { withNavigation, DrawerActions } from 'react-navigation';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from '../Constants/Constant';

import AddSetting from './AddSetting';
import AvailableLocation from './AvailableLocation';
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class AppointmentSettings extends Component {
    state={
   
    }
    

  render() {

    return (
      <View style={styles.container}>
     <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={'Appointment Settings'} />
 
        <ScrollableTabView tabBarTextStyle={{fontSize:15}} tabBarUnderlineStyl={{color:'#3fabf3'}} tabBarActiveTextColor="#3d4461" style={{height:'100%' }} showsHorizontalScrollIndicator={false}>
        <AddSetting  tabLabel="Settings" />
        <AvailableLocation tabLabel="Locations" />

      </ScrollableTabView>

      </View>
    );
  }
}
export default withNavigation(AppointmentSettings);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  
});
