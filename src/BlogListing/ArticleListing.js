import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar , FlatList, ScrollView, Text , Picker, Image , ActivityIndicator  , Alert, TextInput  , ImageBackground} from "react-native";

import { withNavigation, DrawerActions } from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from '../Constants/Constant';
import ArticleListCard from './ArticleListCard';
import ArticleDetailPage from './ArticleDetailPage';
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class ArticleListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          selectedItems: [],
          SpecialityKnown:[],
          Title:'',
          Description:'',
          Search:'',
          Refresh:false,
        };
      }
    componentWillMount(){
    
     this.fetchBlogList();
    }
    fetchBlogList = async () => {
        const response = await fetch(
          CONSTANT.BaseUrl +
          "listing/get_articles"
        );
        const json = await response.json();
        if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
          this.setState({ BlogList: [], isLoading: false }); // empty data set 
        } else {
          this.setState({ BlogList: json, isLoading: false });
          this.setState({ BlogListCat: json[0].name, isLoading: false });
        }
    };
     
  render() {
    let data = this.state.HomeSpecialities;

    const { isLoading} = this.state;
    
    return (
      <View style={styles.container}>
          <CustomHeader headerText={'Blog Listing'}/>
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
           <Text style={styles.searchTextBold}>
                Article Listing
            </Text>
         { this.state.BlogList.length >= 1 ?
         <FlatList
         style={{ paddingLeft: 5 }}
         data={this.state.BlogList}
         extraData={this.state.Refresh}
         ListEmptyComponent={this._listEmptyComponent}
         keyExtractor={(x, i) => i.toString()}
         renderItem={({ item }) =>
           <TouchableOpacity
           onPress={() => {
            this.props.navigation.navigate('ArticleDetailPage', {
              itemId:item.ID,
            });
          }}
             activeOpacity={0.9}>
             <ArticleListCard
             image={{ uri: `${item.image_url}` }}
             title={`${entities.decode(item.title)}`}
             date={`${entities.decode(item.posted_date)}`}
             view={item.views}
             category={`${entities.decode(item.categories.name)}`}
             />
           </TouchableOpacity>
         }
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
    );
  }
}
export default withNavigation(ArticleListing);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f7f7f7",

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
  },
  searchTextBold:{
    color:'#3d4461',
    marginLeft:10,
    marginTop:15 , marginBottom:15 , 
    fontWeight:'700',
    fontSize:20,

}
 
});
