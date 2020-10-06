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

class AccountSecuritySetting extends Component {
    state={
        switchfeaturedValue: false,
        sendSwitchFeaturedValue: "",
        isLoading: true,
    }
    componentDidMount(){
     this.fetchSetting();
    }
    fetchSetting = async() => {
      return fetch(
        CONSTANT.BaseUrl + "profile/get_setting?user_id=12",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          let settingData = responseJson;
          if(settingData.block_val == "on"){
            this.setState({
              switchfeaturedValue: true
            });
          }else if(settingData.block_val == "off"){
            this.setState({
              switchfeaturedValue: false
            });
          }
          this.setState({
            settingData  , 
            isLoading: false,
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
    BlockAaccount = async () => {
        axios
          .post(
            CONSTANT.BaseUrl + "profile/update_block_setting",
            {
              user_id: 12,
              block_setting: this.state.sendSwitchFeaturedValue
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
    togglefeaturedSwitch = value => {
        this.setState({ switchfeaturedValue: value });
        if (value == true) {
          this.state.sendSwitchFeaturedValue = "on";
        } else {
          this.state.sendSwitchFeaturedValue = "off";
        }
      };


  render() {
    const { isLoading} = this.state;
    return (
      <View style={styles.container}>
        {isLoading  ? (
            <View style={{ justifyContent: "center", height: "100%" }}>
              <ActivityIndicator
                size="small"
                color={CONSTANT.primaryColor}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 60,
                  alignContent: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  elevation: 5
                }}
              />
            </View>
          ) : null}
        <ScrollView style={{height:'90%'}}>
         
          <View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
            <Text style={{ color: '#3d4461', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Account Security & Settings</Text>
            <Text style={{ color:'#323232' ,marginLeft:10 , marginRight:10 }}>Consectetur adipisicing eliteiuim seteae eiuteam temporei incidit  utoreas etnalom dolorem maena aliquae uideimate veniam quis  norud exercita ullamco.</Text>
            <View style={{margin:10 , flexDirection:'row' , width:'100%'}}>
                <Text style={{color:'#323232' , width:'85%'}}>Disable my account temporarily</Text>
                <Switch
              style={{ alignSelf: "flex-end", marginTop: -8 ,transform:[{ scaleX: .7 }, { scaleY: .7 }]  }}
              onValueChange={this.togglefeaturedSwitch}
              value={this.state.switchfeaturedValue}
            />
                </View>          
          </View>
        </ScrollView>
        <TouchableOpacity onPress={this.BlockAaccount} style={{
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
export default withNavigation(AccountSecuritySetting);
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
