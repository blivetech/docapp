import React, {Component} from 'react';
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
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {SwipeRow, List, Content} from 'native-base';
import { RadioGroup } from "react-native-btr";
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import CustomHeader from '../Header/CustomHeader';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import Dash from 'react-native-dash';
import * as CONSTANT from '../Constants/Constant';

class MessageDoctor extends Component {
  constructor(props) {
    super(props);
      (this.state = {
        data: [],
        isLoading: true,
        fetchMessageDetail: [],
        message: '',
        fetching_from_server:false
      });
  }
  componentDidMount() {
  }
  SendMessage = async () => {
    const {message} = this.state;
    const {params} = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem('projectUid');

    if (message == '') {
      Alert.alert("Oops" , "Please add a Message");
      this.setState({email: 'Please add message'});
    } else {
        this.setState({fetching_from_server : true})
      axios
        .post(CONSTANT.BaseUrl + 'store_message', {
          receiver_id: params.id,
          author_id: Uid,
          message:message,
          status:'0'
        })
        .then(async response => {
          if (response.status == 200) {
            this.setState({
              message: '',
              fetching_from_server : false
            });
            Alert.alert("Success" , "Message Sent Successfully")
          } else if (response.status == 200) {
              this.setState({fetching_from_server : false})
            Alert.alert(response.type);
          }
        })
        .catch(error => {
            this.setState({fetching_from_server : false})
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
 
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={'Send Message'} />
        <ScrollView>
        <TextInput
            multiline={true}
            placeholder={"Type Message Here..."}
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            style={styles.TextInputLayout}
            onChangeText={message => this.setState({message})}></TextInput>
            {/* <TouchableOpacity
              onPress={this.SendMessage}
              style={{
                paddingTop: 10,
                paddingBottom:10,
                paddingLeft:20 ,
                paddingRight:20,
                backgroundColor: CONSTANT.primaryColor,
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                color: 'white',
                fontSize: 15,
                textAlign: 'center',
                
                }}
              >
                Send Now
            </Text>
            {this.state.fetching_from_server == true ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
            </TouchableOpacity> */}


            <TouchableOpacity
          onPress={this.SendMessage}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Send Now</Text>
          {this.state.fetching_from_server == true ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
        </ScrollView>
        
      </View>
    );
  }
}
export default withNavigation(MessageDoctor);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  HomeHeaderText: {
    height: 45,
    paddingLeft: 10,
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: '#dddddd',
    color: '#323232',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop:15
  },
  TextInputLayout: {
    height: 150,
    color: '#323232',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginTop:10,
    marginRight:10,
    marginLeft: 10,
    marginBottom: 10,
    textAlignVertical:'top'
  },
  loadMoreBtn: {
    width:150,
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft:20 ,
    paddingRight:20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',

  },
  
});
