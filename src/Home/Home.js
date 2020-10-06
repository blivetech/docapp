import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button,
  Alert
} from 'react-native';
import {Input, InputProps} from 'react-native-ui-kitten';
import TopCategoryCard from './TopCategoryCard';
import {RadioGroup} from 'react-native-btr';
import TopRatedCard from './TopRatedCard';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as CONSTANT from '../Constants/Constant';
import HomeHeader from '../Header/HomeHeader';
import MultiSelect from 'react-native-multiple-select';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class Home extends Component {
  state = {
    radioButtons: [
      {
        label: 'Doctor',
        value: 'doctor',
        checked: true,
        color: '#323232',
        disabled: false,
        size: 7,
      },
      {
        label: 'Hospital',
        value: 'hospital',
        checked: false,
        color: '#323232',
        disabled: false,
        size: 7,
      },
    ],
    isLoading:true,
    title: '',
    data: [],
    TopRatedData: [],
    SpecialityKnown: '',
    projectLocationKnown: '',
    ShowAdvanceSearch: false,
    projectServices:[],
    ProjectSpecialitiesKnown: '',
  };

  componentDidMount(){
    this.getUser();
    this.fetchFeaturedDoctorsData();
    this.HomeSpecialitiesSpinner();
    this.ProjectLocationSpinner();
  }

  fetchFeaturedDoctorsData = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + 'listing/get_doctors?listing_type=featured',
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
  ProjectLocationSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_list?list=location', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectLocation = responseJson;
        this.setState({
          projectLocation,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  HomeSpecialitiesSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get-specilities', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    Alert(JSON.stringify(response))
      .then(response => response.json())
      .then(responseJson => {
        let HomeSpecialities = responseJson;
        this.setState({
          HomeSpecialities,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectServicesSpinner = async () => {
    Alert.alert("I am in " , JSON.stringify(this.state.ProjectSpecialitiesKnown[0]))
    const {
      ProjectSpecialitiesKnown,
      projectServices,
      projectSpecialityServices,
    } = this.state;
    if (ProjectSpecialitiesKnown != '') {
      const response = await fetch(
        CONSTANT.BaseUrl +
          'listing/get-speciality-services?id='+JSON.stringify(ProjectSpecialitiesKnown[0]),
      );
      const json = await response.json();
      Alerta.alert("JSON Data" , JSON.stringify(json))
      console.log(json);
      if (Array.isArray(json) && json && json.type && json.type === 'error') {
        this.setState({projectServices: [], isLoading: false}); // empty data set
      } else {
        this.setState({projectServices: json, isLoading: false});
      }
    }else{
      Alert.alert("I am in else")
    }
};

  Search = () => {
    let selectedItem = this.state.radioButtons.find(e => e.checked == true);
    selectedItem = selectedItem
      ? selectedItem.value
      : this.state.radioButtons[0].value;
    const {title, SpecialityKnown, projectLocationKnown} = this.state;
    this.props.navigation.navigate('SearchResultScreen', {
      title: title,
      selectedItem: selectedItem,
      location: projectLocationKnown,
      Speciality: SpecialityKnown,
    });
  };
  onAdvanceSearchPress = () => {
    this.setState({ShowAdvanceSearch: true});
    this.setState({AdvanceDisplay:'none'});
    
  };
  onCancleSearchPress = () => {
    this.setState({ShowAdvanceSearch: false,
    projectLocationKnown: '',
    projectServicesKnown:'',
    AdvanceDisplay:'flex'});
    
  };
  fetchData = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + 'taxonomies/get-specilities',
    );
    const json = await response.json();
    this.setState({data: json});
    console.log(json);
  };
  getUser = async () => {
    this.fetchData();
  };
  // _listEmptyComponent = () => {
  //   return (
  //     <View style={{ flex: 1, flexDirection: 'column', justifyContent: "center", height: '100%', alignSelf: 'center', alignItems: 'center' }}>
  //       <Image style={{ resizeMode: 'contain', height: 150, width: 150 }}
  //         source={require('../../Assets/Images/arrow.png')}
  //       />
  //     </View>
  //   )
  // }

  render() {
    const {ShowAdvanceSearch , isLoading} = this.state;
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar hidden />}
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <HomeHeader headerText={'Medizoc'} />
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
        <ScrollView>
          <View style={{backgroundColor: '#fff'}}>
            <Text style={styles.locationText}>Start Your Search</Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder="Search doctors, clinics, hospitals, etc."
              onChangeText={title => this.setState({title})}
              style={{
                height: 45,
                paddingLeft: 10,
                borderRadius: 2,
                borderWidth: 0.6,
                borderColor: '#dddddd',
                color: '#323232',
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity onPress={this.Search} style={styles.buttonHover}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '500',
                  textAlign: 'center',
                  justifyContent: 'center',
                  top: 16,
                }}>
                Search
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onAdvanceSearchPress}
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginRight: 10,
                marginBottom: 25,
                marginTop: -65,
                display:this.state.AdvanceDisplay
              }}>
              <Text
                style={styles.AdnanceSearchStyle}>
                ADVANCED {'\n'}SEARCH{' '}
              </Text>
              <AntIcon
                name="bars"
                color={'#767676'}
                size={17}
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 2,
                  marginLeft: 2,
                  marginRight: 1,
                }}
              />
            </TouchableOpacity>
          </View>
          {ShowAdvanceSearch == true ? (
            <View>
              <Text style={styles.AdvanceSearchText}>Narrow Your Search</Text>
              <View style={styles.borderStyle}>
                <RadioGroup
                  color="#3fabf3"
                  labelStyle={{fontSize: 12}}
                  radioButtons={this.state.radioButtons}
                  onPress={radioButtons => this.setState({radioButtons})}
                  style={{
                    paddingLeft: 15,
                    paddingTop: 0,
                    flexDirection: 'row',
                    display: 'flex',
                    width: '100%',
                  }}
                />
              </View>

              <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                <MultiSelect
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={value =>
                    this.setState({projectLocationKnown: value})
                  }
                  uniqueKey="slug"
                  items={this.state.projectLocation}
                  selectedItems={this.state.projectLocationKnown}
                  borderBottomWidth={0}
                  single={true}
                  searchInputPlaceholderText="Search Location..."
                  onChangeInput={text => console.log(text)}
                  selectText="Pick Location"
                  styleMainWrapper={{
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    marginTop: 10,
                  }}
                  styleDropdownMenuSubsection={{
                    backgroundColor: '#fff',
                    paddingRight: -7,
                    height: 60,
                    paddingLeft: 10,
                    borderWidth: 0.6,
                    borderColor: '#fff',
                    borderColor: '#dddddd',
                    borderRadius: 4,
                  }}
                  displayKey="title"
                  submitButtonText="Submit"
                />
              </View>

              <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                <MultiSelect
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={value =>
                    this.setState({
                      projectServices:[],
                      ProjectSpecialitiesKnown: value},
                      this.ProjectServicesSpinner,)
                  }
                  uniqueKey="id"
                  items={this.state.HomeSpecialities}
                  selectedItems={this.state.ProjectSpecialitiesKnown}
                  borderBottomWidth={0}
                  single={true}
                  searchInputPlaceholderText="Search Speciality..."
                  onChangeInput={text => console.log(text)}
                  selectText="Pick Speciality"
                  styleMainWrapper={{
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    marginTop: 10,
                  }}
                  styleDropdownMenuSubsection={{
                    backgroundColor: '#fff',
                    paddingRight: -7,
                    height: 60,
                    paddingLeft: 10,
                    borderWidth: 0.6,
                    borderColor: '#fff',
                    borderColor: '#dddddd',
                    borderRadius: 4,
                  }}
                  displayKey="name"
                  submitButtonText="Submit"
                />
              </View>
              {this.state.projectServices.length >= 1 ? 
              <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                <MultiSelect
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={value =>
                    this.setState({projectServicesKnown: value})
                  }
                  uniqueKey="slug"
                  items={this.state.projectServices}
                  selectedItems={this.state.projectServicesKnown}
                  borderBottomWidth={0}
                  single={true}
                  searchInputPlaceholderText="Search Service..."
                  onChangeInput={text => console.log(text)}
                  selectText="Pick Service"
                  styleMainWrapper={{
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    marginTop: 10,
                  }}
                  styleDropdownMenuSubsection={{
                    backgroundColor: '#fff',
                    paddingRight: -7,
                    height: 60,
                    paddingLeft: 10,
                    borderWidth: 0.6,
                    borderColor: '#fff',
                    borderColor: '#dddddd',
                    borderRadius: 4,
                  }}
                  displayKey="name"
                  submitButtonText="Submit"
                />
              </View>
              : null
              }
              <TouchableOpacity
                onPress={this.Search}
                style={styles.buttonHover}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '500',
                    textAlign: 'center',
                    top: 18,
                  }}>
                  Apply Filter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onCancleSearchPress}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginRight: 10,
                  marginBottom: 25,
                  marginTop: -65,
                }}>
                <Text
                  style={styles.AdnanceSearchStyle}>
                  CLEAR {'\n'}FILTERS{' '}
                </Text>
                <AntIcon
                  name="close"
                  color={'#767676'}
                  size={17}
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    marginLeft: 2,
                    marginRight: 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {/* <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#3d4461',
              height: 70,
              width: '100%',
              borderBottomLeftRadius: 50,
              paddingLeft: 15,
              paddingRight: 15,
            }}>
            <View
              style={{
                width: '30%',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowColor: '#000',
                elevation: 3,
              }}>
              <Image
                source={require('../../Assets/Images/docdemo.png')}
                style={{
                  height: 75,
                  width: 75,
                  position: 'absolute',
                  bottom: 0,
                }}></Image>
            </View> */}
            {/* <View style={{width: '40%', justifyContent: 'center'}}>
              <Text style={{color: '#d4d5d9', fontSize: 12}}>
                Are You a Doctor?
              </Text>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
                Join Our Team
              </Text>
            </View>
            <View style={{width: '30%', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={()=> this.props.navigation.navigate("SignupScreen")}
                style={{
                  height: 40,
                  width: 105,
                  backgroundColor: '#3fabf3',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 15}}>Join Now</Text>
              </TouchableOpacity>
            </View> 
          </View>*/}
          <Text style={styles.TopCategoryTextStyle}>Top Categories:</Text>
          <View style={styles.TopCatCardManagment}>
            <ScrollView
              style={{marginTop: 15, marginLeft: -5}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <FlatList
                data={this.state.data}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'SearchResultTopCategory',
                        {
                          Speciality: item.slug,
                        },
                      )
                    }>
                    <TopCategoryCard
                      imageUri={{uri: `${item.url}`}}
                      name={`${entities.decode(item.name)}`}
                      colorCode={item.color}
                    />
                  </TouchableOpacity>
                )}
                horizontal={true}
              />
            </ScrollView>
          </View>
          <Text style={styles.TopRatedTextStyle}>Featured Doctors:</Text>
          <View style={styles.TopRatedCardManagment}>
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
                    specialities={`${item.specialities.length >= 1 ? entities.decode(
                      item.specialities[0].name,
                    ): null}`}
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
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  BannerTextStyle: {
    color: '#fff',
  },
  BannerTextDocStyle: {
    fontWeight: '700',
    color: '#fff',
  },
  locationText: {
    fontSize: 20,
    margin: 10,
    color: '#fe736e',
    fontWeight: '700',
  },
  AdvanceSearchText: {
    fontSize: 20,
    margin: 10,
    color: '#3d4461',
    fontWeight: '700',
  },
  inputText: {
    marginLeft: 10,
  },
  input: {
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyle: {
    width: 150,
    height: 45,
    backgroundColor: '#3fabf3',
    borderBottomColor: '#3fabf3',
    marginLeft: 15,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: {width: 1, height: 13},
    fontSize: 15,
  },
  DocbuttonStyle: {
    width: 100,
    height: 50,
    backgroundColor: '#3fabf3',
    borderBottomColor: '#3fabf3',
    marginLeft: 15,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: {width: 1, height: 13},
    fontSize: 17,
    top: 10,
    alignSelf: 'flex-end',
    marginRight: 15,
  },

  singleline: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.6,
  },
  CurrentLocationStyle: {
    backgroundColor: '#fcfcfc',
    padding: 15,
    flexDirection: 'row',
  },
  CurrentLocationTextStyle: {
    color: '#55acee',
    fontSize: 16,
  },
  iconStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mainHeader: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: '#3d4461',
    height: 65,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    elevation: 3,
    borderBottomLeftRadius: 50,
    overflow: 'hidden',
    flexDirection: 'row',
    textAlign: 'right',
  },
  docdemostyle: {
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  buttonStyledoc: {
    width: 145,
    height: 50,
    backgroundColor: '#3fabf3',
    borderBottomColor: '#3fabf3',
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    fontSize: 17,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  TopCategoryTextStyle: {
    color: '#3d4461',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,

    fontWeight: '700',
  },
  TopRatedTextStyle: {
    color: '#3d4461',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: '700',
  },
  TopCatCardManagment: {
    marginRight: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  TopRatedCardManagment: {
    marginRight: 5,
    marginLeft: 5,
  },
  AdnanceSearchStyle: {
    color: '#767676',
    fontSize: 15,
    textAlign: 'right',
  },
  borderStyle: {
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: '#dddddd',
    backgroundColor: '#fff',
    height: 55,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  buttonHover: {
    width: 120,
    height: 50,
    backgroundColor: '#3fabf3',
    borderBottomColor: '#3fabf3',
    marginLeft: 10,
    borderWidth: 0,
    marginTop: 5,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    elevation: 3,
    fontSize: 13,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
