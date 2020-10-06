import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView,Switch, Text, TouchableOpacity, TextInput, Image, FlatList,ActivityIndicator, PanResponder, Alert, Dimensions } from "react-native";
import { withNavigation, DrawerActions } from 'react-navigation';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from '../Constants/Constant';

import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import AccountSecuritySetting from './AccountSecuritySetting';
import ManageEmailNotification from './ManageEmailNotification';
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class SecuritySettings extends Component {
    state={
        switchfeaturedValue: false,
        sendSwitchFeaturedValue: "",
    }
    

  render() {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={'Security Settings'} />
 
        <ScrollableTabView tabBarTextStyle={{fontSize:15}} tabBarUnderlineStyl={{color:'#3fabf3'}} tabBarActiveTextColor="#3d4461" style={{height:'100%' }} showsHorizontalScrollIndicator={false}>
        <ChangePassword  tabLabel="Password" />
        <DeleteAccount tabLabel="Account" />
        {/* <AccountSecuritySetting tabLabel="Security" />
        <ManageEmailNotification tabLabel="Email" /> */}
      </ScrollableTabView>

      </View>
    );
  }
}
export default withNavigation(SecuritySettings);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  TextInputLayout: {
    minHeight: 45, color: '#323232', paddingLeft: 10, paddingRight: 10, borderRadius: 2, borderWidth: 0.6, borderColor: '#dddddd', marginLeft: 10, marginRight: 10, marginBottom: 10
  },
  TextInputLayoutContent: {
    minHeight: 45, paddingLeft: 10, paddingRight: 10, borderRadius: 2, borderWidth: 0.6, borderColor: '#dddddd', marginLeft: 10, marginRight: 10, marginBottom: 10
  },
  buttonHover: {
    width: 150,
    height: 50,
    backgroundColor: "#3fabf3",
    borderBottomColor: "#3fabf3",
    marginLeft: 15,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: { width: 1, height: 13 },
    fontSize: 13,
    borderRadius: 4,
    overflow: "hidden"
  }
});
