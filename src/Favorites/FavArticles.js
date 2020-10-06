import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage,
  FlatList,
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
import {withNavigation} from 'react-navigation';
import ArticlesCard from '../DetailDoctor/ArticlesCard';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import {Button} from 'native-base';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class FavArticles extends Component {
    state = {
        data: [],
        TopRatedData: [],
    };

    componentDidMount(){
        this.fetchFavArticlesData();
    }
      fetchFavArticlesData = async () => {
        const id = await AsyncStorage.getItem("projectUid");
        const response = await fetch(
          CONSTANT.BaseUrl +
          "user/get_wishlist?profile_id="+id+'&type=articles'
        );
        const json = await response.json();
        if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
          this.setState({ TopRatedData: [], isLoading: false }); // empty data set 
        } else {
          this.setState({ TopRatedData: json, isLoading: false });
        }
      };
  render() {
    return (
        <View style={styles.container}>
        <View style={styles.TopRatedCardManagment}>
        {
           this.state.TopRatedData.length >= 1 ?
           <FlatList
           style={{}}
           data={this.state.TopRatedData}
           keyExtractor={(x, i) => i.toString()}
           renderItem={({item}) => (
             <ArticlesCard
               image={{uri: `${item.image}`}}
               likes={`${item.likes}`}
               views={`${item.views}`}
               category={`${entities.decode(item.category.title)}`}
               title={`${entities.decode(item.title)}`}
               date={`${entities.decode(item.publish_date)}`}
             />
           )}
         />
           :
           <View style={{flex:1 , marginTop:"40%"  , alignContent:'center' , height:'100%' , width:'100%' , flexDirection:'column', justifyContent:'center' , alignItems:'center'}}>
             <Image
             resizeMode={'contain'}
              style={{width: 250, height: 250}}
              source={require('../../Assets/Images/arrow.png')}
             />
             <Text style={{fontSize:25 , fontWeight:'700' , marginVertical:10}}>Oops,</Text>
             <Text style={{fontSize:17 , fontWeight:'700' }}>No Data Available</Text>
           </View>
         }
       
           </View>
       </View>
    );
  }
}
export default withNavigation(FavArticles);
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      TopRatedCardManagment: {
        marginRight: 5,
        marginLeft: 5
      },
});
