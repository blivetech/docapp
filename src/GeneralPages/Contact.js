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

class Contact extends Component {
  constructor(props) {
    super(props);
      (this.state = {
       
      });
  }
  componentDidMount() {
  }
 
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={'Contact Support'} />
        <ScrollView>
        <View style={{margin: 20 ,justifyContent:'center' , alignContent:'center' , alignSelf:'center'}}>

                    <Text style={{fontSize:20 ,fontFamily:CONSTANT.PoppinsBold,justifyContent:'center' , alignContent:'center' , alignSelf:'center'}}>{CONSTANT.ContactNumberHeader}</Text>
                    <Text style={{fontSize:18 ,justifyContent:'center' , alignContent:'center' , alignSelf:'center' , marginTop:10 , fontFamily:CONSTANT.PoppinsMedium,}}>{CONSTANT.ContactNumberOne}</Text>
                    <Text style={{fontSize:18 ,justifyContent:'center' , alignContent:'center' , alignSelf:'center' , fontFamily:CONSTANT.PoppinsMedium,}}>{CONSTANT.ContactNumberTwo}</Text>

                    <Text style={{fontSize:20 ,fontFamily:CONSTANT.PoppinsBold,justifyContent:'center' , alignContent:'center' , alignSelf:'center' , marginTop:20}}>{CONSTANT.ContactEmailHeader}</Text>
                    <Text style={{fontSize:18 ,justifyContent:'center' , alignContent:'center' , alignSelf:'center' , marginTop:10 , fontFamily:CONSTANT.PoppinsMedium,}}>{CONSTANT.ContactEmailOne}</Text>
                    <Text style={{fontSize:18 ,justifyContent:'center' , alignContent:'center' , alignSelf:'center' , fontFamily:CONSTANT.PoppinsMedium,}}>{CONSTANT.ContactEmailTwo}</Text>
               
            </View>
         
        </ScrollView>
        
      </View>
    );
  }
}
export default withNavigation(Contact);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  
});
