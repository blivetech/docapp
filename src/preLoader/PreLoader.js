import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  ActivityIndicator,
  StatusBar
} from "react-native";
import BouncingPreloader from 'react-native-bouncing-preloader';
import AntIcon from "react-native-vector-icons/AntDesign";

class PreLoader extends Component {
  state = {
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    showAlert: false
  };

  componentDidMount() {
    setTimeout(() => {
      this._checkUserLoginStatus();
    }, 1000);
  }
  _checkUserLoginStatus = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      console.log(storedValue, storedType, profileImg, type);
      if (storedValue != null) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("Welcome");
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
      }
      if (type !== null){
        this.setState({ type });
      } else {
      }
    } catch (error) {
      console.log(error);
      this.props.navigation.navigate("LoginScreen");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#cc4641" barStyle="light-content" />
        <View style={styles.splashBackground}>
        <Image style={styles.splashImageStyle}
          source={require('../../Assets/Images/SplashImage.png')}
        />
        {/* <BouncingPreloader style={styles.splashImageStyle}
          icons={[
            require('../../Assets/Images/SplashImage.png'),
          ]}
          leftRotation="-680deg"
          rightRotation="360deg"
          leftDistance={-180}
          rightDistance={-250}
          speed={2200} /> */}
         <ActivityIndicator style={styles.indicatorStyle} color="#fe736e" />
        </View>
      </View>
    );
  }
}
export default PreLoader;
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },splashBackground:{
    backgroundColor: '#e8f6ff',
    height: "100%",
  },splashImageStyle:{
    justifyContent:'center',
    alignSelf:'center',
    top:'45%',
    width:150,
    height:100,
    resizeMode: "center"
  },indicatorStyle:{
    top:'80%'
  }
});
