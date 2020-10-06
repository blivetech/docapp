import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Text , TouchableOpacity  , Keyboard, TextInput  , FlatList, AsyncStorage, Image  , Alert , Dimensions, ActivityIndicator} from "react-native";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ReceiveMessageLayout from './ReceiveMessageLayout';
import axios from 'axios';
import { withNavigation, DrawerActions } from 'react-navigation';
import * as CONSTANT from "../../Constants/Constant";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class MessageDetailLayout extends Component {
  state = {
    data: [],
    isLoading: true,
    fetchMessageDetail: [],
    message:'',
  };
  componentDidMount() {
    this.fetchMessages();
  }
  fetchMessages = async () => {
    
    const Pid = await AsyncStorage.getItem("projectUid");
    const { params } = this.props.navigation.state;
    const response = await fetch(
       CONSTANT.BaseUrl + "message_center/get_messages?user_id="+Pid+"&sender_id="+params.receiver_id
      );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ fetchMessageDetail: [] ,isLoading:false}); // empty data set 
    } else {
      this.setState({ fetchMessageDetail: json.selected , isLoading:false });
      this.setState({ fetchMessageList: json.messages , isLoading:false });
    }
  };
  SendMessage = async () => {
    const { message } = this.state;
    const { params } = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem("projectUid");
    if (message == "") {
      //alert("Please enter Email address");
      this.setState({ email: "Please add message" });
    
    } else {
      
      axios
        .post(
          CONSTANT.BaseUrl + "store_message",
          {
            author_id: Uid,
            receiver_id: params.receiver_id,
            message:message,
            status:'0'
          }
        )
        .then(async response => {
          if(response.status == 200){
            this.setState({
              message:''
            })
            this.fetchMessages();
          }else if(response.status == 200){
            Alert.alert(response.type)
          }
          
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.container}>
       <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
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
       {
         this.state.fetchMessageDetail &&
         <View
         style={{
           height: 60,
           paddingLeft: 15,
           paddingRight: 15,
           width: "100%",
           backgroundColor: "#3d4461",
           flexDirection: "row",
           shadowOffset: { width: 0, height: 2 },
           shadowColor: "#000",
           shadowOpacity: 0.2,
           shadowRadius: 2,
           elevation: 10
         }}
       >
         <TouchableOpacity
           onPress={() => this.props.navigation.goBack(null)}
           style={{
             flexDirection: "column",
             display: "flex",
             alignContent: "center",
             alignSelf: "center",
             justifyContent: "center"
           }}
         >
           <AntIcon name="back" size={25} color={"#fff"} />
         </TouchableOpacity>
         <View
           style={{
             flexDirection: "column",
             display: "flex",
             alignContent: "center",
             alignSelf: "center",
             justifyContent: "center"
           }}
         >
           <View
             style={{
               flexDirection: "row",
             }}
           >
                <View style={styles.MainTopRatedStyle}>
     
     <View style={styles.ImageLayoutStyle}>
     
     <Image
         resizeMode="contain" style={styles.ImageStyle}
         source={{uri: `${this.state.fetchMessageDetail.selected_user_image}`}}
     />
     
     </View>
     <View style={styles.docContentstyle}>
    
     <View  style={{flexDirection:'row'}}>
       {
         this.state.fetchMessageDetail &&
         <Text numberOfLines={1} style={styles.DocName}>{this.state.fetchMessageDetail.selected_user_name}</Text>
       }
    
     </View>
     {this.state.fetchMessageDetail &&
      <Text numberOfLines={1} style={styles.titleStyle}>{this.state.fetchMessageDetail.selected_user_tagline}</Text>
     }
       
     </View>
     
     </View>
         
           </View>
         </View>
       </View>
       }
            <View >
            {this.state.fetchMessageList ?
          <FlatList style={{ height: "80%"  , marginBottom:15 , marginTop:15  }}
            data={this.state.fetchMessageList}
            keyExtractor={(a, b) => b.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity >
                {item.is_sender == "no" ?
                <View style={{flexDirection:'column', margin:5 , width:'100%' , paddingLeft:10}}>
                  <View style={{ alignSelf: 'flex-start' , maxWidth:'80%'  , backgroundColor:'#fff' , borderWidth: 0.6, borderRadius: 6, borderColor: '#dddddd'}}>
                    <Text style={{ color: '#000', fontSize: 13  , color:'#323232' , padding:10}}>{item.message}</Text>
                  </View>
                  <Text style={{color:'#767676' , fontSize:10 ,marginTop:2 , marginLeft:5}}>{item.date}</Text>
                </View>
                
                  :item.is_sender == "yes" ?
                  <View style={{flexDirection:'column', margin:5 , width:'100%' ,paddingRight:15}}>
                  <View style={{ alignSelf: 'flex-end', maxWidth:'80%'  , backgroundColor:CONSTANT.primaryColor , alignItems:'flex-end',justifyContent:'flex-end', borderWidth: 0.6, borderRadius: 6, borderColor: '#dddddd'}}>
                    <Text style={{ color: '#000', fontSize: 13 , padding:10 , color:'#fff' }}>{item.message}</Text>
                  </View>
                  <View style={{flexDirection:'row', alignSelf: 'flex-end', alignItems:'flex-end',justifyContent:'flex-end'}}>
                  <Text style={{color:'#767676' ,fontSize:10 ,marginTop:2 , marginLeft:10}}>{item.date}</Text>
                  <AntIcon style={{marginLeft:5}} name="check" size={13} color={"#4B8B3B"} />
                  </View>
                </View>
                  :
                  null
                }
              </TouchableOpacity>

            )}
            
            keyExtractor={(item, index) => index}
          />
          :
          null
        }
            </View>

            <View style={{ flexDirection: 'row' }}>
          <TextInput multiline={true} placeholder="Please Type Message here..." underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" style={styles.TextInputLayout}   onChangeText={message => this.setState({ message })}></TextInput>
          <TouchableOpacity onPress={this.SendMessage} style={{ backgroundColor: CONSTANT.primaryColor, justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 51, width: '15%' }}>
            <FontAwesome name="send" size={25} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default withNavigation(MessageDetailLayout);
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f7f7f7'
  },
  searchText:{
      marginTop:15,
      marginLeft:10,
      marginBottom:5,
      fontSize:15
  },
  searchTextBold:{
      color:'#3d4461',
      marginLeft:10,
      fontWeight:'900',
      fontSize:20,
      marginTop:-8
  },
  MainTopRatedStyle:{
    marginLeft:20,
    flexDirection:'row',
    alignItems:'center',
  },
  ImageStyle:{
    height:40,
    width:40 ,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius:20
  },
  docContentstyle:{
      flexDirection:'column',
      marginLeft:10
  },
  titleStyle:{
      color:'#fff',
      fontSize:13
  },
  ImageLayoutStyle:{
    elevation:4,
    shadowColor:'#000',
    borderRadius:4,
    overflow:'hidden',
    width:40,
    height:40,
    borderRadius:20
  },
  DocName:{
      color:'#fff',
      fontSize:15,
      fontWeight:'700',
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  TextInputLayout: {
    height: 51, width: '80%' , color: '#323232', paddingLeft: 10, paddingRight: 10, borderTopLeftRadius: 2, borderBottomLeftRadius: 2, borderWidth: 1, borderColor: '#dddddd', marginLeft: 10, marginBottom: 10
  },
});
