import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView,Switch, Text, TouchableOpacity, TextInput, Image, FlatList,ActivityIndicator, PanResponder, Alert, Dimensions } from "react-native";
import { withNavigation, DrawerActions } from 'react-navigation';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from '../Constants/Constant';
import Location from '../Location/Location';
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class ChangePassword extends Component {
    state={
        switchfeaturedValue: false,
        sendSwitchFeaturedValue: "",
        oldPassword:'',
        newPassword:'',
    }
    change_Password = async () => {
        const { oldPassword ,newPassword } = this.state;
        const { params } = this.props.navigation.state;
        if (oldPassword == "" && newPassword=="") {
          //alert("Please enter Email address");
          this.setState({ email: "Please Add Complete Data" });
        } else {
          // this.openProgressbar();
          axios
            .post(
              CONSTANT.BaseUrl + "profile/update_password",
              {
                user_id: 12,
                password: oldPassword,
                retype: newPassword, 
              }
            )
            .then(async response => {
              if (response.status === 200) {
                alert(response.data.message);
              } else if (response.status === 203) {
                alert(response.data.message);
              }
            })
            .catch(error => {
              alert(error);
              console.log(error);
            });
        }
      }
  render() {
    const {oldPassword , newPassword}= this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={{height:'90%'}}>
          <View style={{
            backgroundColor: '#fff', margin: 10, borderRadius: 4, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000",
          }}>
            <Text style={{ color: '#3d4461', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Change Your Password</Text>       
              <TextInput onChangeText={oldPassword => this.setState({ oldPassword })}  underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Last Remember Password*" style={styles.TextInputLayout}  ></TextInput>
              <TextInput onChangeText={newPassword => this.setState({ newPassword })} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="New Password*" style={styles.TextInputLayout} ></TextInput>
           </View>
          
       
       
        </ScrollView>
        <TouchableOpacity onPress={this.change_Password} style={{
            backgroundColor: '#3fabf3', height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'center', elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000",
          }}>
            <Text style={{ color: '#fff', justifyContent: 'center', fontSize: 16, top: 20 }}>Update all the latest changes</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(ChangePassword);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    marginTop:15,
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
