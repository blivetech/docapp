import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView,Switch, Text, TouchableOpacity , AsyncStorage, TextInput, Image, FlatList,ActivityIndicator, PanResponder, Alert, Dimensions } from "react-native";
import { withNavigation, DrawerActions } from 'react-navigation';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from '../Constants/Constant';
import Location from '../Location/Location';
import RNRestart from "react-native-restart";
import MultiSelect from "react-native-multiple-select";
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class DeleteAccount extends Component {
    state={
        switchfeaturedValue: false,
        sendSwitchFeaturedValue: "",
        ReasonKnown:[],
        password :'',
        retypePass :"",  
        Desc :'' 
    }

    componentDidMount(){
      this.DeleteReasonSpinner();
    }

    DeleteReasonSpinner = async () => {
      return fetch(
        CONSTANT.BaseUrl + "profile/get_remove_reasons",
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
          let Reason = responseJson;
          this.setState({
            Reason
          });
        })
        .catch(error => {
          console.error(error);
        });
    };
    DeleteAccount = async () => {
      const { password , retypePass , Desc } = this.state;
      const { params } = this.props.navigation.state;
      if (password == "" && retypePass == "") {
        //alert("Please enter Email address");
        this.setState({ email: "Please Add Complete Data" });
      } else {
        // this.openProgressbar();
        axios
          .post(
            CONSTANT.BaseUrl + "profile/remove_account",
            {
              user_id: 13,
              password: password,
              retype: retypePass,
              reason: this.state.ReasonKnown[0],
              description: Desc
            }
          )
          .then(async response => {
            if (response.status === 200) {
              alert(response.data.message);
              AsyncStorage.getAllKeys()
              .then(keys => AsyncStorage.multiRemove(keys))
              .then(() => console.log("success data deleted"));
            this.clearAsyncStorage();
            RNRestart.Restart();
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

    return (
      <View style={styles.container}>
        <ScrollView style={{height:'90%'}}>
       
          <View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
               <Text style={{ color: '#3d4461', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Delete Account</Text>       
            <TextInput  underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Password*" style={styles.TextInputLayout}   onChangeText={password => this.setState({ password })}></TextInput>
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Retype Password*" style={styles.TextInputLayout} onChangeText={retypePass => this.setState({ retypePass })}></TextInput>
              <View style={{ marginLeft: 10, marginRight: 10  ,  marginBottom: 10 }}>
              <MultiSelect
              styleMainWrapper={{backgroundColor:'#fff' , borderRadius:4 , marginTop:10   }}
              styleDropdownMenuSubsection={{backgroundColor:'#fff'  , height:55 , paddingLeft:10  , paddingRight:-7 , borderWidth:0.6 , borderColor:'#fff' , borderColor:'#dddddd' , borderRadius:4}}
              style={{marginLeft: 10, marginRight: 10 ,paddingLeft:10 ,  marginBottom: 10}}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ ReasonKnown: value })
                }
                hideTags
                uniqueKey="key"
                items={this.state.Reason}
                selectedItems={this.state.ReasonKnown}
                borderBottomWidth={0}
                single={true}
                selectText="Pick Reason To Leave"
                searchInputPlaceholderText="Reason To Leave"
                onChangeInput={text => console.log(text)}
                displayKey="val"
                styleDropdownMenu={{backgroundColor:'#000'}}
       
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                submitButtonText="Submit"
              />
            </View>
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Description (Optional)" style={styles.TextInputLayout} onChangeText={Desc => this.setState({ Desc })}></TextInput>
          </View>
         
        
          
        </ScrollView>
        <TouchableOpacity onPress={this.DeleteAccount} style={{
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
export default withNavigation(DeleteAccount);
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
