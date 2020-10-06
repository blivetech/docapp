import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions
} from "react-native";
import { SwipeRow, List, Content } from "native-base";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import Dash from "react-native-dash";

class AddAwardLayout extends Component {
  constructor(props) {
    super(props);
    (this.array = []),
      (this.state = {
        arrayHolder: [],
        textInput_Holder: ""
      });
  }
  componentWIllMount() {
    this.setState({ arrayHolder: [...this.array] });
  }
  joinData = () => {
    this.array.push({ title: this.state.textInput_Holder });

    this.setState({ arrayHolder: [...this.array] });
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  };

  GetItem(item) {
    Alert.alert(item.title);
  }
  removeItem = key => {
    let data = this.state.arrayHolder;
    data = data.filter(item => item.key !== key);
    this.setState({ data });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
  
        <View>
            <View style={{flexDirection:'row' , marginLeft:10 , marginRight:10 ,marginBottom:10 , marginTop:10}}>
            <Text style={{paddingLeft:10, borderRadius:2  , height:50 , borderWidth:0.6 , borderColor:'#dddddd'  , marginBottom:10 , paddingTop:15 , width:'70%'}}>Add Experience</Text>
             <View style={{backgroundColor:'#3d4461'  , height:50 , width:'15%' ,justifyContent:'center' , flexDirection:'row'}}>
             <AntIcon 
                    name="edit"
                    color={"#fff"}
                    size={20}
                    style={{top:15}}
                  />
             </View>
             <View style={{backgroundColor:'#ff5851' , borderTopRightRadius:2 ,borderBottomRightRadius:2  , height:50 , width:'15%' ,justifyContent:'center' , flexDirection:'row'}}>
             <AntIcon 
                    name="delete"
                    color={"#fff"}
                    size={20}
                    style={{top:15}}
                  />
             </View>
            </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder="Company Name"
                style={{
                  height:45,
                  paddingLeft: 10,
                  borderRadius: 2,
                  borderWidth: 0.6,
                  borderColor: "#dddddd",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10
                }}
              />
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder="Starting Date"
                style={{
                  height:45,
                  paddingLeft: 10,
                  borderRadius: 2,
                  borderWidth: 0.6,
                  borderColor: "#dddddd",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10
                }}
              />
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder="End Date"
                style={{
                  height:45,
                  paddingLeft: 10,
                  borderRadius: 2,
                  borderWidth: 0.6,
                  borderColor: "#dddddd",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10
                }}
              />
              <TextInput
                onChangeText={data => this.setState({ textInput_Holder: data })}
                placeholderTextColor="#7F7F7F"
                underlineColorAndroid="transparent"
                placeholder="Job Title"
                style={{
                  height:45,
                  paddingLeft: 10,
                  borderRadius: 2,
                  borderWidth: 0.6,
                  borderColor: "#dddddd",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10
                }}
              />
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder="Description"
                style={{
                  height:45,
                  paddingLeft: 10,
                  height: 150,
                  alignItems: "flex-start",
                  borderRadius: 2,
                  borderWidth: 0.6,
                  borderColor: "#dddddd",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10
                }}
              />
              <TouchableOpacity
                onPress={this.joinData}
                style={styles.buttonHover}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "500",
                    textAlign: "center",
                    top: 18
                  }}
                >
                  Add Now
                </Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(AddAwardLayout);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
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























