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
  ActivityIndicator,
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
import * as CONSTANT from "../Constants/Constant";

class AppointmentListPatient extends Component {
  state = {
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    showAlert: false,
    AppointmentData: [],
    isDateTimePickerVisible: false,
    current_date: "",
    selected_date: "",
    TypeError: false,
    isBlinking: false,
    date: new Date(),
    isLoading: true
  };
  blinkingInterval = false;

  componentWillUnmount() {
    clearInterval(this.blinkingInterval);
    this.blinkingInterval = false;
  }

  componentDidMount() {
    this.getUser();
    this.ShowCurrentDate();
    if (!this.blinkingInterval) {
      this.blinkingInterval = setInterval(() => {
        this.setState({
          isBlinking: !this.state.isBlinking
        });
      }, 800);
    }
  }
  onDateChange(date) {
    this.setState(
      {
        date: date.date
      },

      this.fetchAppointments
    );
  }
  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      current_date: date + "-" + month + "-" + year
    });
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
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
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      this.fetchAppointments();
    } catch (error) {
      // alert(error)
    }
  };
  fetchAppointments = async () => {
    const { id, date } = this.state;
    Moment.locale("en");
    var selected_date = Moment(date).format("YYYY-MM-DD");
    const response = await fetch(
      CONSTANT.BaseUrl +
        "appointments/get_listing?user_id=" +
        id +
        "&user_type=regular_users" +
        "&appointment_date=" +
        selected_date
    );
 
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ AppointmentData: [], isLoading: false }); // empty data set
    } else {
      this.setState({ AppointmentData: json, isLoading: false });
      if (AppointmentData[0].hasOwnProperty("type")) {
        this.setState({
          TypeError: true
        });
      }
    }
  };
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    Moment.locale("en");
    var dt = "2016-05-02";
    this.setState({
      current_date: Moment(date).format("DD-MM-YYYY")
    });
    this.hideDateTimePicker();
  };

  render() {
    const isDateBlocked = date => date.isBefore(Moment(), "day");
    Moment.locale("en");
    var dt = "2016-05-02T00:00:00";
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={"Appoinments"} />
        {isLoading ? (
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
        <ScrollView>
          <View style={{ margin: 10, borderRadius: 4, overflow: "hidden" }}>
            <View
              style={{
                borderRadius: 5,
                overflow: "hidden",
                borderColor: "#dddddd",
                borderWidth: 0.6
              }}
            >
              <Dates
                textColor={"#323232"}
                mode={"date"}
                isDateBlocked={isDateBlocked}
                date={this.state.date}
                onDatesChange={date => this.onDateChange(date)}
              />
            </View>
          </View>
          <View
            style={{ marginRight: 10, flexDirection: "column", width: "100%" }}
          >
            <Text style={styles.TopCategoryTextStyle}>
              Recent Appointments:
            </Text>
            {this.state.AppointmentData.length >= 1 ? (
              // <View style={{backgroundColor:'#000' , height:200 ,width:200}}>
              // </View>
              <FlatList
                style={{ paddingLeft: 5 }}
                data={this.state.AppointmentData}
                ListEmptyComponent={this._listEmptyComponent}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    // onPress={() =>
                    //   this.props.navigation.navigate("AppointmentDetailPage", {
                    //     id: item.ID
                    //   })
                    // }
                  >
                    <View
                      style={{
                        backgroundColor: "#fff",
                        margin: 10,
                        borderRadius: 4,
                        flexDirection: "row",
                        elevation: 3,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowColor: "#000"
                      }}
                    >
                      <View style={{ flexDirection: "column", margin: 15 }}>
                        <Text
                          style={{
                            color: "#323232",
                            fontFamily:CONSTANT.PoppinsBold,
                            fontSize: 18
                          }}
                        >
                          {item.day}
                        </Text>
                        <Text style={{ color: "#323232", fontSize: 14  ,  fontFamily:CONSTANT.PoppinsMedium,}}>
                          {item.month}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderLeftWidth: 0.4,
                          marginTop: 5,
                          marginBottom: 5,
                          borderLeftColor: "#767676"
                        }}
                      />
                      <View style={styles.circle}></View>
                      {item.image != "" ? (
                        <Image
                          source={item.image}
                          resizeMode="contain"
                          style={styles.ImageStyle}
                        />
                      ) : (
                        <Image
                          source={{
                            uri:
                              "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAIAAgADASIAAhEBAxEB/8QAXwABAQEBAQAAAAAAAAAAAAAAAAMCAQYBAQAAAAAAAAAAAAAAAAAAAAAQAQACAAYCAwEBAQEAAAAAAAABAhExUWFxEzIDIUGhgRJCkREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A92AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMxGcgDM+ysZfLM+2fr4BRybVjOUptac5cBXspq1ExOSBFprOMAuFZi0YwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk3rH2zPtj6gGzHDNKfZadmcZnMFZ9lY3Zn26QwA7N7T9uDsUtP0Dg3Hq1lqPXWPrEEsJnJqPXadlQEreuaxjjiyvMYxMIA36pzhRGk4WhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcm9YzlztruDROP0x213O2u4Oz2TlhDM+u85y7213O2u4M9Vtjqts1213O2u4M9Vtjqts1213O2u4OR6p+5aj11jP5c7a7nbXcG4iIygY7a7nbXcGxjtrudtdwbGO2u5213BtO3rmZmYwd7a7nbXcHOq2sKMdtdztruDYx213d7a7g0ORes5S6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5Norm7af8xihMzM4yDc+3SGZvaftwBT1R/wBSey+HxGbVYwrCV5xtIOAp1RqCYp1RrJ1RrIJinVGsnVGsgmKdUaydUayCYp1RrJ1RrIJinVGsnVGsgmKdUaydUayCYp1RrJ1RrIJinVGsnVGsgmKdUaydUayCYp1RrJ1RrIJinVGsnVGoJqeu+PxOacxhODtZwtALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAx7coTV9kY14SBv10iYxlSIiMoT9U5woAhbynldC3lPIEZwuhGcLgA5a0VjGQdEp9lpy+HP8AdtQWE6+2f+v/AFSJifmAAAAAAAAAAAAAAAAAQt5TyVzjkt5TyVzjkFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJjGJhBdG8YWkCk4WhZBeJxiJAQt5TyuhbynkCM4XQjOFwJ+PlG1ptOKns8ZSAAAa9dsJw+pZAXAAAAAAAAGeyP9YfWrQAAAAAAIW8p5K5xyW8p5K5xyC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACftjKVGfZGNZ2BJX1zjXDRJv1T8zGoKIW8p5XQt5TyBGcLoRnC4OXjGsorpXp/mdgZAAIjGcBT10/6n+A2AAAAAAne/wBR/ZL3+o/ssAN0vh8TkwAuJ0vh8TkoAAAACFvKeSucclvKeSuccguAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZgCE/E4O1nC0S77IwtyyC6FvKeV6/MRwhbynkCM4XQjOFwAAYn1ROXw51TqoAzX11jeWgAAAAATvf6j+yXv8AUf2WAAAAAG6Xw+JyYAXE6Xw+JyUAABC3lPJXOOS3lPJXOOQXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj2x8RKa14xrKILV8Y4Rt5TytXxjhG3lPIEZwuhGcLgAAA5a0VjGQLWisYy5S/+vifiUrWm04yAuM0v/r4nNoBO9/qP7Je/1H9lgAAAAAAAABul8PicmAFxn1+LQIW8p5K5xyW8p5K5xyC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACExhMwul7IwtjqClfGOEbeU8rV8Y4Rt5TyBGcLoRnC4AFrRWMZBy1orGMo2tNpxktabTjIAAA1PsmYw/wDZZAAAAAAAAAAAAAV9Xj/WmfV4/wBaBC3lPJXOOS3lPJXOOQXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY9sfGOjZaMazAOV8Y4Rt5TytXxjhG3lPIEZwuhGcLgWmKxjKNrTacZU9nikAAAAAAAAAAAAAAAAAACvq8f60z6vH+tAhbynkrnHJbynkrnHILgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIW8p5XQt5TyBGcLoRnC4M+zxSWtX/UYZMdW/4DA31b/h1b/gMDfVv+HVv+AwN9W/4dW/4DA31b/h1b/gMDfVv+HVv+AwN9W/4dW/4DA31b/h1b/gMDfVv+HVv+AwN9W/4dW/4DXq8f605Wv+YwzdBC3lPJXOOS3lPJXOOQXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQt5Tyul7IwtO4MxnC6Dv+76gsI9l9TsvqCwj2X1Oy+oLCPZfU7L6gsI9l9TsvqCwj2X1Oy+oLCPZfU7L6gsI9l9TsvqCwj2X1Oy+oLCPZfU7L6gsI9l9TsvqCwj2X1Oy+oOW8p5K5xyO0jG0bfILAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWrFodARmsxm4uAgL4GAIC+BgCAvgYAgL4GAIC+BgCAvgYAgL4GAIC+BgCAvgYAgL4GAIC+ACMVmcoVrWKxu6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="
                          }}
                          style={styles.ImageStyle}
                        />
                      )}
                      <View style={{ alignSelf: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "700" ,  fontFamily:CONSTANT.PoppinsMedium, }}>
                          {item.name}
                        </Text>
                        <Text style={{ fontSize: 13  , fontFamily:CONSTANT.PoppinsMedium,}}>
                          Status: {item.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  height: "100%",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  resizeMode={"contain"}
                  style={{ width: 150, height: 150 }}
                  source={require("../../Assets/Images/arrow.png")}
                />
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "700",
                    marginVertical: 10
                  }}
                >
                  Oops,
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "700" }}>
                  No Data Available
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(AppointmentListPatient);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  TopCategoryTextStyle: {
    color: "#3d4461",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
    fontFamily:CONSTANT.PoppinsBold,
  },
  textGlowing: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    color: "#1abc9c",
    fontSize: 35,
    fontWeight: "700"
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "#fe736e",
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row"
  },
  ImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: "center",
    position: "relative",
    marginRight: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
