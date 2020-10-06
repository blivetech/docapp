import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Text, TouchableOpacity , Alert, FlatList, ActivityIndicator, Image, Dimensions } from "react-native";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import TopRatedCard from '../Home/TopRatedCard';
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from "../Constants/Constant";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class SearchResultTopCategory extends Component { 
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  state = {
    data: [],
    Toataldata: [],
    page: 1,
    isLoading: true
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
      "listing/get_doctors?listing_type=search&specialities=" + params.Speciality + "&page_number=" + this.state.page
    );  
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ data: [], isLoading: false }); // empty data set 
    } else {
      this.setState({ data: this.state.data.concat(json) });
      this.setState({ Toataldata: json[0].total, isLoading: false });
    }
  };
  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState({
        page: this.state.page + 1
      },
        console.log("This is my page count", this.state.page),
        this.fetchFreelancerData
      )

      this.onEndReachedCalledDuringMomentum = true;
    }
  }
  _listEmptyComponent = () => {
    return (
      <View style={{ flexDirection: 'column', justifyContent: "center", height: "100%", width: "100%", alignContent: 'center' }}>
        <Image style={{ resizeMode: 'contain', height: 200, width: 200, alignSelf: 'center' }}
          source={require('../../Assets/Images/arrow.png')}
        />
        <Text style={{ fontSize: 25, color: '#3d4461', fontWeight: "700", alignSelf: 'center' }}>Oops , No Record Found</Text>
      </View>
    )
  }
  render() {
    const {
      isLoading
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={'Search Result'} />
        {isLoading ? (
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
        <ScrollView>
          {
            this.state.Toataldata != "" ?
              <Text style={styles.searchText}>
                {this.state.data.length} - {this.state.Toataldata} Search result found:
         </Text>
              : null
          }

          <View style={{ marginLeft: 7, marginRight: 7 }}>
            {this.state.data.length >= 1 ?
            <FlatList
              style={{ paddingLeft: 5 }}
              data={this.state.data}
              ListEmptyComponent={this._listEmptyComponent}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item }) =>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.props.navigation.navigate('DetailDoctorScreen', {
                      itemId:item.ID,
                    });
                  }}
                >
                  <TopRatedCard
                    profileImage={{ uri: `${item.image}` }}
                    specialities={`${entities.decode(item.specialities[0].name)}`}
                    name={`${entities.decode(item.name)}`}
                    sub_heading={`${entities.decode(item.sub_heading)}`}
                    total_rating={`${entities.decode(item.total_rating)}`}
                    average_rating={`${entities.decode(item.average_rating)}`}
                    featured_check={`${entities.decode(item.featured)}`}
                    verified={`${entities.decode(item.is_verified)}`}
                    verified_medically={`${entities.decode(item.is_verified)}`}
                    role={`${entities.decode(item.role)}`}
                  />
                </TouchableOpacity>
              }
              extraData={this.state}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            />
             :
                <View
                  style={styles.favArea}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.favImageStyle}
                    source={require('../../Assets/Images/arrow.png')}
                  />
                  <Text
                    style={styles.favOopsText}>
                    Oops
                  </Text>
                  <Text style={styles.favNoDataText}>
                    No Record Found
                  </Text>
                </View>
                 }
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default SearchResultTopCategory;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchText: {
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 15,
    
  },
  searchTextBold: {
    color: "#3d4461",
    marginLeft: 10,
    fontWeight: "900",
    fontSize: 20,
    marginTop: -8
  },
  searchNoResultArea: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    alignContent: "center"
  },
  searchNoResultImage: {
    resizeMode: "contain",
    height: 200,
    width: 200,
    alignSelf: "center"
  },
  searchNoResultText: {
    fontSize: 25,
    color: "#3d4461",
    fontWeight: "700",
    alignSelf: "center"
  },
  searchMainArea: {
    justifyContent: "center",
    height: "100%"
  },
  searchMainStyle: {
    height: 30,
    width: 30,
    borderRadius: 60,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5
  },
  searchListArea: {
    marginLeft: 7,
    marginRight: 7
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    
  },
  searchListStyle: { paddingLeft: 5 },
  favArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favImageStyle: {
    width: 250,
    height: 250,
  },
  favOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  favNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },
});
