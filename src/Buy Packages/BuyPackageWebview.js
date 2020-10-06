import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from "../Constants/Constant";
import { WebView } from "react-native-webview";
class BuyPackageWebview extends Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={styles.buyPackageMainArea}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={styles.buyPackageTouchableArea}
          >
          <AntIcon name="back" size={25} color={"#fff"} />
          </TouchableOpacity>
          <View style={styles.buyPackageBuyNowArea}>
            <View style={styles.buyPackageBuyNowTextArea}>
              <Text style={styles.buyPackageBuyNowTextStyle}>
                {CONSTANT.BuyPackagesBuyNow}
              </Text>
            </View>
          </View>
        </View>
        <WebView source={{ uri: params.url }} />
      </View>
    );
  }
}
export default BuyPackageWebview;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  buyPackageMainArea: {
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    backgroundColor: CONSTANT.primaryColor,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10
  },
  buyPackageTouchableArea: {
    flexDirection: "column",
    width: "20%",
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  buyPackageBuyNowArea: {
    flexDirection: "column",
    width: "60%",
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  buyPackageBuyNowTextArea: {
    flexDirection: "row",
    display: "flex",
    alignSelf: "center"
  },
  buyPackageBuyNowTextStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    height: 30,
    marginTop: 9
  }
});
