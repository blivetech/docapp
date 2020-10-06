import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import OfferedServicesCard from './UserDetailPageCards/OfferedServicesCard';
import ExperienceCard from './UserDetailPageCards/ExperienceCard';
import SpecializationCard from './UserDetailPageCards/SpecializationCard';
import AwardsAndRecognitionsCard from './UserDetailPageCards/AwardsAndRecognitionsCard';
import DownloadCard from './UserDetailPageCards/DownloadCard';
import { withNavigation, DrawerActions } from 'react-navigation'

class UserDetailPage extends Component {

  render() {
    return (
      <View  style={styles.container}>
      
      </View>

      
    );
  }
}
export default  withNavigation(UserDetailPage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aboutContentStyle:{
    fontSize:15
  }
 
});
