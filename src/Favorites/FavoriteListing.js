import React, {Component} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import * as CONSTANT from '../Constants/Constant';
import CustomHeader from '../Header/CustomHeader';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import FavDoctors from './FavDoctors';
import FavHospitals from './FavHospitals';
import FavArticles from './FavArticles';
import {Button} from 'native-base';
class FavoriteListing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={'Favorite Listing'} />
        <ScrollableTabView
          tabBarTextStyle={{fontSize: 15}}
          tabBarUnderlineStyl={{color: '#3fabf3'}}
          tabBarActiveTextColor="#3d4461"
          style={{height: '100%'}}
          showsHorizontalScrollIndicator={false}>
          <FavDoctors tabLabel="Doctors" />
          <FavHospitals tabLabel="Hospitals" />
          {/* <FavArticles tabLabel="Articles" /> */}
        </ScrollableTabView>
      </View>
    );
  }
}
export default FavoriteListing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
