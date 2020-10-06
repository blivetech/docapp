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
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import * as CONSTANT from '../Constants/Constant';
import TopRatedCard from '../Home/TopRatedCard';
import {withNavigation} from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import {Button} from 'native-base';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class FavDoctors extends Component {
  state = {
    data: [],
    TopRatedData: [],
    isLoading:true,
  };

  componentDidMount() {
    this.fetchFavDoctorsData();
  }
  fetchFavDoctorsData = async () => {
    const id = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl + 'user/get_wishlist?profile_id=' + id + '&type=doctors',
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({TopRatedData: [], isLoading: false}); // empty data set
    } else {
      this.setState({TopRatedData: json, isLoading: false});
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={{justifyContent: 'center', height: '100%'}}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={{
                height: 30,
                width: 30,
                borderRadius: 60,
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                elevation: 5,
              }}
            />
          </View>
        ) : null}
        <View style={styles.TopRatedCardManagment}>
          {this.state.TopRatedData.length >= 1 ? (
            <FlatList
              style={{paddingLeft: 5}}
              data={this.state.TopRatedData}
              ListEmptyComponent={this._listEmptyComponent}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  // onPress = { () => this.props.navigation.navigate("DetailDoctorScreen", {doc_id: item.ID})}
                  onPress={() => {
                    this.props.navigation.navigate('DetailDoctorScreen', {
                      itemId: item.ID,
                    });
                  }}>
                  <TopRatedCard
                    profileImage={{uri: `${item.image}`}}
                    specialities={`${entities.decode(item.specialities.title)}`}
                    name={`${entities.decode(item.name)}`}
                    sub_heading={`${entities.decode(item.subheading)}`}
                    total_rating={`${entities.decode(item.total_rating)}`}
                    average_rating={`${entities.decode(item.average_rating)}`}
                    featured_check={`${entities.decode(item.featured)}`}
                    verified={`${entities.decode(item.is_verified)}`}
                    verified_medically={`${entities.decode(item.is_verified)}`}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: '40%',
                alignContent: 'center',
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode={'contain'}
                style={{width: 250, height: 250}}
                source={require('../../Assets/Images/arrow.png')}
              />
              <Text
                style={{fontSize: 25, fontWeight: '700', marginVertical: 10}}>
                Oops,
              </Text>
              <Text style={{fontSize: 17, fontWeight: '700'}}>
                No Data Available
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default withNavigation(FavDoctors);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopRatedCardManagment: {
    marginRight: 5,
    marginLeft: 5,
  },
});
