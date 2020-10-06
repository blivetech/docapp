import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import RNRestart from 'react-native-restart';
import axios from "axios";
import * as CONSTANT from '../Constants/Constant';
import { Button } from "native-base";

class LoginScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isProgress: false,
      fetching_from_server:false
    };
  }
  login = () => {
    const { username, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (username == "") {
      //alert("Please enter Email address");
      this.setState({ email: "Please enter Email address" });
    } else if (reg.test(username) === false) {
      //alert("Email is Not Correct");
      this.setState({ email: "Email is Not Correct" });
      return false;
    } else if (password == "") {
      this.setState({ email: "Please enter password" });
    } else { 
    //   this.openProgressbar();
    this.setState({fetching_from_server : true})
      axios
        .post(
          CONSTANT.BaseUrl + "user/do-login",
          {
            email: username,
            password: password
          }
        )
        .then(async response => {
          if (response.status === 200) {
            await AsyncStorage.setItem(
              "full_name",
              response.data.profile.pmeta.am_first_name + " " + response.data.profile.pmeta.am_last_name
            );
            await AsyncStorage.setItem(
              "user_type",
              response.data.profile.pmeta.user_type
            );
            await AsyncStorage.setItem(
              "profile_img",
              response.data.profile.pmeta.profile_img
            );
            // await AsyncStorage.setItem(
            //   "profileBanner",
            //   response.data.profile.pmeta.banner_img
            // );
            await AsyncStorage.setItem(
              "profileType",
              response.data.type
            );
            await AsyncStorage.setItem(
              "projectUid",
              JSON.stringify(response.data.profile.umeta.id)
            );
            await AsyncStorage.setItem(
              "projectProfileId",
              JSON.stringify(response.data.profile.umeta.profile_id)
            );
            this.setState({ isProgress: false })
            RNRestart.Restart();
          } else if (response.status === 203){
            this.setState({ isProgress: false , fetching_from_server : false });
            alert("Please Check Your Email / Password or Check Network ");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };

  render() {
    return (
      this.state.isProgress ?
        <CustomProgressBar /> :
        <View style={{ flex: 1 ,backgroundColor:"#fff"}}>
        
          <View style={styles.container}>
            <Text style={{ padding: 10, margin: 10, color: "red" }}>
              {this.state.email}
            </Text>

            {/* <Image
              style={{ width: 150 , height:80, resizeMode: "center", alignSelf: "center" }}
              source={require("../../Assets/Images/SplashImage.png")}
            /> */}
              <Text
              style={{
                textAlign: "left",
                alignSelf: "left",
                color: "#333",
                fontWeight:"bold",
                fontSize:"18dp"
              }}
            >Login
          </Text>
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                color: "#807f7f"
              }}
            >{CONSTANT.Loginmain}
          </Text>

            <View
              style={{
                width: "90%",
                borderWidth: 0.6, borderRadius: 4, margin: 10, borderColor: '#dddddd'
              }}>
               
                
              <TextInput
                style={{ fontSize: 15, padding: 5, height: 40, color: '#323232' }}
                underlineColorAndroid="transparent"
                name="username"
                placeholder={CONSTANT.LoginEmail}
                placeholderTextColor="#807f7f"
                onChangeText={username => this.setState({ username })}
              />
              <View
                style={{ borderBottomColor: "#dddddd", borderBottomWidth: 0.6 }}
              />
              <TextInput
                style={{ fontSize: 15, padding: 5, height: 40, color: '#323232' }}
                underlineColorAndroid="transparent"
                editable={true}
                secureTextEntry={true}
                name="password"
                placeholder= {CONSTANT.LoginPassword}
                placeholderTextColor="#807f7f"
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <TouchableOpacity
          onPress={this.login}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>{CONSTANT.LoginButton}</Text>
          {this.state.fetching_from_server == true ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
          </TouchableOpacity>
            <Text
              onPress={() => this.props.navigation.navigate("ForgetPassword")}
              style={{
                textAlign: "center",
                alignSelf: "center",
                color: "#616161",
                fontSize: 15,
                margin: 10
              }}
            >
               {CONSTANT.LoginForget}
          </Text>
          </View>
          <View style={{ height: "15%" , backgroundColor:'#3d4461' , alignItems:'center' , alignContent:'center' }}>
            <Text
              onPress={() => this.props.navigation.navigate("SignupScreen")}
              style={{
                textAlign: "center",
                alignSelf: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 18,
                top:15,
                alignContent:'center',
                textAlignVertical:'center'
              }}
            >
               {CONSTANT.LoginMoveSignup}
          </Text>
          
          </View>
          {/* <Button
          style={{width:'100%' , height:'15%' , backgroundColor:'#3d4461'}}
          title="Press Me"
          /> */}

         
        </View>
    );
  }
}
const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25, position: 'absolute' }}>
        <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
        <ActivityIndicator size="large" color={CONSTANT.primaryColor} />
      </View>
    </View>
  </Modal>
);
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
     height:'85%',
    justifyContent: "center",
    alignItems: "center"
  },
  loadMoreBtn: {
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft:20 ,
    paddingRight:20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  
  },
});
