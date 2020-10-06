import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Text,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions
} from "react-native";
import { SwipeRow, List, Content } from "native-base";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomHeader from "../Header/CustomHeader";
import Dash from "react-native-dash";
import Dates from "react-native-dates";
import Moment from "moment";
import axios from "axios";
import * as CONSTANT from "../Constants/Constant";
import Spinner from 'react-native-loading-spinner-overlay';
class SubmitCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      data: [],
      default_color: "",
      storedValue: "",
      storedType: "",
      profileImg: "",
      type: "",
      id: "",
      Pid: "",
      isLoading: true,
      spinner:false,
      fetchPackages: [],
      Name: "",
      address: "",
      location: "",
      Notes: "",
      Customerid: "",
      S_address1: "",
      S_city: "",
      S_company: "",
      S_country: "",
      S_first_name: "",
      S_last_name: "",
      S_state: "",
      B_address1: "",
      B_city: "",
      B_conpany: "",
      B_country: "",
      B_email: "",
      B_first_name: "",
      B_last_name: "",
      B_phone: "",
      B_state: "",
      isProgress: false
    };
  }
  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      const Address = await AsyncStorage.getItem("Address");
      const Location = await AsyncStorage.getItem("Location");
      const s_address1 = await AsyncStorage.getItem("shipping_address1");
      const s_city = await AsyncStorage.getItem("shipping_city");
      const s_company = await AsyncStorage.getItem("shipping_company");
      const s_country = await AsyncStorage.getItem("shipping_country");
      const s_first_name = await AsyncStorage.getItem("shipping_first_name");
      const s_last_name = await AsyncStorage.getItem("shipping_last_name");
      const s_state = await AsyncStorage.getItem("shipping_state");
      const b_address1 = await AsyncStorage.getItem("billing_address_1");
      const b_city = await AsyncStorage.getItem("billing_city");
      const b_conpany = await AsyncStorage.getItem("billing_company");
      const b_country = await AsyncStorage.getItem("billing_country");
      const b_email = await AsyncStorage.getItem("billing_email");
      const b_first_name = await AsyncStorage.getItem("billing_first_name");
      const b_last_name = await AsyncStorage.getItem("billing_last_name");
      const b_phone = await AsyncStorage.getItem("billing_phone");
      const b_state = await AsyncStorage.getItem("billing_state");

      if (storedValue !== null) {
        this.setState({ Name: storedValue });
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ Customerid: id });
      } else {
        //  alert('something wrong')
      }
      if (Address !== null) {
        this.setState({ address: Address });
      } else {
        //  alert('something wrong')
      }
      if (Location !== null) {
        this.setState({ location: Location });
      } else {
        //  alert('something wrong')
      }
      if (s_address1 !== null) {
        this.setState({ S_address1: s_address1 });
      } else {
        //  alert('something wrong')
      }
      if (s_city !== null) {
        this.setState({ S_city: s_city });
      } else {
        //  alert('something wrong')
      }
      if (s_company !== null) {
        this.setState({ S_company: s_company });
      } else {
        //  alert('something wrong')
      }
      if (s_country !== null) {
        this.setState({ S_country: s_country });
      } else {
        //  alert('something wrong')
      }
      if (s_first_name !== null) {
        this.setState({ S_first_name: s_first_name });
      } else {
        //  alert('something wrong')
      }
      if (s_last_name !== null) {
        this.setState({ S_last_name: s_last_name });
      } else {
        //  alert('something wrong')
      }
      if (s_state !== null) {
        this.setState({ S_state: s_state });
      } else {
        //  alert('something wrong')
      }
      if (b_address1 !== null) {
        this.setState({ B_address1: b_address1 });
      } else {
        //  alert('something wrong')
      }
      if (b_city !== null) {
        this.setState({ B_city: b_city });
      } else {
        //  alert('something wrong')
      }
      if (b_conpany !== null) {
        this.setState({ B_conpany: b_conpany });
      } else {
        //  alert('something wrong')
      }
      if (b_country !== null) {
        this.setState({ B_country: b_country });
      } else {
        //  alert('something wrong')
      }
      if (b_email !== null) {
        this.setState({ B_email: b_email });
      } else {
        //  alert('something wrong')
      }
      if (b_first_name !== null) {
        this.setState({ B_first_name: b_first_name });
      } else {
        //  alert('something wrong')
      }
      if (b_last_name !== null) {
        this.setState({ B_last_name: b_last_name });
      } else {
        //  alert('something wrong')
      }
      if (b_phone !== null) {
        this.setState({ B_phone: b_phone });
      } else {
        //  alert('something wrong')
      }
      if (b_state !== null) {
        this.setState({ B_state: b_state });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // Error saving data
      // alert(error)
      console.log(error);
    }
  };

  SubmitCodeData = async () => {
    this.setState({
      spinner: true
    })
    const { code } = this.state;

    const Uid = await AsyncStorage.getItem("projectUid");
    if (code) {
      axios
        .post(CONSTANT.BaseUrl + "verify-appointment-code", {
          user_id: Uid,
          code: code
        })
        
        .then(async response => {
          if (response.status === 200) {
            console.log(response)
            this.setState({ isUpdatingLoader: false  , spinner: false});
            this.props.navigation.navigate("AppointmentListPatient")
            // this.createCheckOutPage();
          } else if (response.status === 203) {
            console.log(response)
            this.setState({ isUpdatingLoader: false  , spinner: false});
          }
        })
        .catch(error => {
         
          console.log(error);
        });
    } else {
      Alert.alert("Error", "Please Enter Code");
    }
  };
  createCheckOutPage = async () => {
    this.setState({
      spinner: true
    })
    const {
      Uid,
      Notes,
      Customerid,
      S_address1,
      S_city,
      S_company,
      S_country,
      S_first_name,
      S_last_name,
      S_state,
      B_address1,
      B_city,
      B_conpany,
      B_country,
      B_email,
      B_first_name,
      B_last_name,
      B_phone,
      B_state
    } = this.state;

    var billing_info_map = {};
    billing_info_map["address_1"] = B_address1;
    billing_info_map["city"] = B_city;
    billing_info_map["company"] = B_conpany;
    billing_info_map["country"] = B_country;
    billing_info_map["email"] = B_email;
    billing_info_map["first_name"] = B_first_name;
    billing_info_map["last_name"] = B_last_name;
    billing_info_map["phone"] = B_phone;
    billing_info_map["state"] = B_state;
    var shipping_info_map = {};
    shipping_info_map["address_1"] = S_address1;
    shipping_info_map["city"] = S_city;
    shipping_info_map["company"] = S_company;
    shipping_info_map["country"] = S_country;
    shipping_info_map["first_name"] = S_first_name;
    shipping_info_map["last_name"] = S_last_name;
    shipping_info_map["state"] = S_state;
    var payment_data_map_array = {};
    payment_data_map_array["order_type"] = "booking";
    payment_data_map_array["customer_id"] = Customerid;
    payment_data_map_array["customer_note"] = Notes;
    payment_data_map_array["shipping_methods"] = "stripe";
    payment_data_map_array["sameAddress"] = "1";
    payment_data_map_array["billing_info"] = billing_info_map;
    payment_data_map_array["shipping_info"] = shipping_info_map;
    var payment_data = JSON.stringify(payment_data_map_array);

    axios
      .post(CONSTANT.BaseUrl + "user/create_checkout_page", {
        payment_data: payment_data
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({ isUpdatingLoader: false  , spinner: false});
          this.props.navigation.navigate("PayAppointmentCheckout", {
            url: response.data.url
          });
          console.log("Updated Successfully" + JSON.stringify(response));
        } else if (response.status === 203) {
          this.setState({ isUpdatingLoader: false  , spinner: false});

        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };
  render() {
    const isDateBlocked = date => date.isBefore(Moment(), "day");
    Moment.locale("en");
    var dt = "2016-05-02T00:00:00";
  //  const { spinner } = this.state;
    return (
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" /> */}
        {/* <CustomHeader headerText={"Verify Password"} /> */}
        {/* {spinner ? 
         <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          color={'#fff'}
          textStyle={{
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            color:'#000',
            elevation: 5,
           
          }}
          />
        : null}  */}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            margin: 10,
            elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000"
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 15 }}>
            Please add Authentication Code
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            placeholder="Password"
            onChangeText={code => this.setState({ code })}
            style={{
              height: 45,
              paddingLeft: 10,
              borderRadius: 2,
              borderWidth: 0.6,
              borderColor: "#dddddd",
              color: "#323232",
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10
            }}
          />

          <TouchableOpacity
            onPress={this.SubmitCodeData}
            style={{
              alignItems: "center",
              height: 40,
              margin: 10,
              borderRadius: 4,
              width: "50%",
              alignSelf: "center",
              backgroundColor: CONSTANT.primaryColor
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#fff",
                paddingTop: 10
              }}
            >
              Submit Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default withNavigation(SubmitCode);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  }
});
