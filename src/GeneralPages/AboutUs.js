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

class AboutUs extends Component {
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
        <CustomHeader headerText={'About Us'} />
        <ScrollView>
        <View>
                <Text style={{margin:20 , fontSize:20 , }}>
                 {CONSTANT.AboutUsMain}
                </Text>
                <View style={{flexDirection:'row' , marginLeft:20}}>
                    <Text style={{fontSize:16 }}>Company:      </Text>
                    <Text style={{fontSize:16 }}>{CONSTANT.AboutUsCompanyName}</Text>
                </View>
                <View style={{flexDirection:'row' , marginLeft:20}}>
                    <Text style={{fontSize:16 }}>APP version:    </Text>
                    <Text style={{fontSize:16 }}>{CONSTANT.AboutUsAppVersion}</Text>
                </View>
            </View>
        </ScrollView>
        
      </View>
    );
  }
}
export default withNavigation(AboutUs);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  
});
