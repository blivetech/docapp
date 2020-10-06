import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  Text,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import StarRating from 'react-native-star-rating';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../Header/CustomHeader';
import {withNavigation, DrawerActions} from 'react-navigation';
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';
import {RadioGroup} from 'react-native-btr';
import Dates from 'react-native-dates';
import SelectMultiple from 'react-native-select-multiple';
import Moment from 'moment';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import * as CONSTANT from '../Constants/Constant';
import {ScrollView} from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class BookAppointment extends Component {
  constructor(props) {
    super(props);
    this.arraySpeciality = [];
    this.arrayServices = [];
    this.state = {
      isLoading:true,
      projectHospitalKnown: '',
      RelationDataKnown: '',
      sday: '',
      sdate: '',
      stime: '',
      desc:'',
      projectServicesHosPrice: '',
      ServiceRefresh: false,
      count: 0,
      UniqueArray:[],
      appointment: [],
      arrayHolder_Speciality: [],
      arrayHolder_Services: [],
      projectServices: [],
      doctorSlot: [],
      projectSpecialityServices: [],
      isChecked: [],
      selectedServices: [],
      projectSelectedServiceKnown: [],
      sp:[],
      date: new Date(),
      radioButtonsforStartAs: [
        {
          label: 'My Self',
          value: 'myself',
          checked: true,
          color: '#323232',
          disabled: false,
          width: '33.33%',
          size: 6,
        },
        {
          label: 'Someone Else',
          value: 'someone',
          checked: false,
          color: '#323232',
          disabled: false,
          width: '33.33%',
          size: 6,
        },
      ],
      RelationData: [
        {
          name: 'Brother',
          value: 'brother',
        },
        {
          name: 'Wife',
          value: 'wife',
        },
        {
          name: 'Mother',
          value: 'mother',
        },
        {
          name: 'Sister',
          value: 'sister',
        },
      ],
    };
  }
  componentDidMount() {
    this.setState({arrayHolder_Speciality: [...this.arraySpeciality]});
    this.setState({arrayHolder_Services: [...this.arrayServices]});
    this.ProjectHospitalSpinner();
  }
  selectedServiceData = (item ,ID ) => {
    //this.state.projectSelectedServiceKnown.push({ id : item.service_id})
    // if(typeof this.state.sp[ID] == 'undefined'){
    //   this.state.sp[ID] = new Array();
    //   this.state.sp[ID][item.service_id] = item.service_id;
    // } else{
    //   this.state.sp[ID][item.service_id] = item.service_id;
    // }
    this.state.sp.push({
      speciality: ID,
      service: [item.service_id],
    });
    // if(typeof this.state.sp['service'] == 'undefined'){
    //   this.state.sp['service'] = new Array();
    //   this.state.sp['speciality'] = ID;
    //   this.state.sp['service'][item.service_id] = item.service_id;
    // } else{
    //   this.state.sp['speciality'] = ID;
    //   this.state.sp['service'][item.service_id] = item.service_id;
    // }
    this.state.projectSelectedServiceKnown.push(this.state.sp)
    console.log("My sp " , this.state.sp)
    this.state.UniqueArray.push({
      price: item.service_price,
      service_title: item.service_title,
    });
    var items = this.state.UniqueArray;
    var a = items.reduce((accumulator, current) => {
      if (checkIfAlreadyExist(current)) {
        return accumulator;
      } else {
        return [...accumulator, current];
      }
      function checkIfAlreadyExist(currentVal) {
        return accumulator.some((item) => {
          return (item.service_title === currentVal.service_title);
        });
      }
    }, []);
    this.setState({
      ServiceRefresh: true,
      UniqueArray: a
    });
    var total = 0;
    for (let i = 0; i < a.length; i++) {
      total += parseFloat(a[i].price);
      this.getTotalCharges(total);
    }
  };
  getTotalCharges = total => {
    var FianlTotal =
      parseFloat(total)
       +
      parseFloat(this.state.projectServices[0].fee);
    this.setState({
      totalCharges: FianlTotal,
    });
  };
  onSelectionsChange = selectedServices => {
    // selectedServices is array of { label, value }
    this.setState({selectedServices});
  };
  onDateChange(date) {
    this.setState(
      {
        date: date.date,
      },
      this.DoctorSlots,
    );
  }
  joinDataForSpecialities = item => {
    this.arraySpeciality.push({
      speciality: item.speciality_id,
      services: [...this.arrayServices],
    });
    this.setState(
      {arrayHolder_Speciality: [...this.arraySpeciality]},
      // console.log('Data:', JSON.stringify([...this.arraySpeciality])),
    );
  };
  joinDataForServices = item => {
    this.arrayServices.push({
      id: item.service_id,
      title: item.service_title,
      price: item.service_price,
    });
    this.setState({arrayHolder_Services: [...this.arrayServices]});
  };
  ProjectHospitalSpinner = async () => {
    const {params} = this.props.navigation.state;
    return fetch(
      CONSTANT.BaseUrl + 'appointment/get_hospital?user_id=' + params.id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        let projectHospital = responseJson;
        this.setState({
          projectHospital,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  ProjectServicesSpinner = async () => {
    const {
      projectHospitalKnown,
      projectServices,
      projectSpecialityServices,
    } = this.state;
    if (projectHospitalKnown != '') {
      const response = await fetch(
        CONSTANT.BaseUrl +
          'appointment/get_hospital_services?user_id=' +
          projectHospitalKnown,
      );
      const json = await response.json();
      if (Array.isArray(json) && json && json.type && json.type === 'error') {
        this.setState({projectServices: [], isLoading: false}); // empty data set
      } else {
        this.setState(
          {projectServices: json, isLoading: false,
            projectServicesHosPrice: json,
            isLoading: false,},
          this.setState({
            projectSpecialityServices: json.services,
            isLoading: false,
          }),
        );
      }
      this.DoctorSlots();
    }
  };

  DoctorSlots = async () => {
    const {
      projectHospitalKnown,
      projectServices,
      projectSpecialityServices,
      date,
    } = this.state;
    const {params} = this.props.navigation.state;
    if (projectHospitalKnown != '') {
      Moment.locale('en');
      var str = Moment(date).format('ddd');
      var day = str.toLowerCase();
      var selected_date = Moment(date).format('YYYY-MM-DD');
      const response = await fetch(
        CONSTANT.BaseUrl +
          'appointment/get_appointment_slots?hospital_id=' +
          projectHospitalKnown +
          '&doctor_id=' +
          params.id +
          '&day=' +
          day +
          '&date=' 
          +
          selected_date,
      );
      const json = await response.json();
      if (
        Array.isArray(json) &&
        json[0] &&
        json.type &&
        json.type === 'error'
      ) {
        this.setState({doctorSlot: [], isLoading: false}); // empty data set
      } else {
        this.setState({doctorSlot: json, isLoading: false});
      }
    }
  };
  selectedSlotData = item => {
    const {date} = this.state;
    Moment.locale('en');
    var str = Moment(date).format('ddd');
    var day = str.toLowerCase();
    var selected_date = Moment(date).format('YYYY-MM-DD');
    const {sdate, sday, stime} = this.state;
    this.setState({
      sdate: selected_date,
      sday: day,
      stime: item.start_time,
    });
  };

  BookAppointment = async () => {
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true,
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
    const {
      arrayHolder_Speciality,
      day,
      date,
      time,
      appointment,
      projectHospitalKnown,
    } = this.state;
    const {sdate, sday, stime} = this.state;
    console.log(sdate);
    console.log(sday);
    const {params} = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem('projectUid');
    axios.post(CONSTANT.BaseUrl + 'appointmentBooking', {
      patient: selectedItemforStartAs,
      hospital: projectHospitalKnown,
      patient_id: Uid,
      doctor_id: params.id,
      speciality: this.state.sp,
      total_charges: this.state.totalCharges,
      comments: this.state.desc,
      day: sday,
      date: sdate,
      time: stime
    })
    .then(response => {
      console.log(response)
      if (response.status === 200){
      this.setState({isUpdatingLoader: false});
      this.props.navigation.navigate('VerifyPasswordForBooking');
      } else if (response.status === 203) {
        Alert.alert('Error'  ,  response.data.message);
      }
    })
    .catch(error => {
        Alert.alert('Oops'  ,  "You Are not allowed to perform any action on our demo Application");
        console.log(error.response)
    });
    //     axios.post(CONSTANT.BaseUrl + 'appointmentBooking', {
    //     patient: 'myself',
    //     hospital: projectHospitalKnown,
    //     patient_id: Uid,
    //     doctor_id: params.id,
    //     speciality: this.state.projectSelectedServiceKnown,
    //     total_charges: this.state.totalCharges,
    //     comments: 'sss',
    //     day: sday,
    //     date: sdate,
    //     time: stime,
    // }).then(async response => {
    //     if (response.status === 200){
    //       this.setState({isUpdatingLoader: false});
    //       Alert.alert('Updated Successfully', JSON.stringify(response));
    //       // this.props.navigation.navigate('VerifyPasswordForBooking');
    //     } else if (response.status === 203) {
    //       Alert.alert('Error' + response.data.message);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  HanldeSelectedServiceDelete = (item, index) => {
    var FianlTotal =
      parseFloat(this.state.totalCharges) - parseFloat(item.price);
    this.setState({
      totalCharges: FianlTotal,
      ServiceRefresh:true,
    });
    this.state.UniqueArray.splice(index, 1);
  };

  render() {
    const isDateBlocked = date => date.isBefore(Moment(), 'day');
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true,
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
      const {isLoading} = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader headerText={'Book Appointment'} />
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flexDirection: 'column',
            backgroundColor: '#f7f7f7',
            margin: 10,
            borderRadius: 6,
            overflow: 'hidden',
            elevation: 3,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowColor: '#000',
          }}>
          <View
            style={{
              marginLeft: 5,
              flexDirection: 'column',
              backgroundColor: '#f7f7f7',
              marginTop: 10,
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontWeight: '700',
                marginBottom: 5,
                color: '#f7395a',
              }}>
              Who is visiting to Doctor?
            </Text>
            <RadioGroup
              color={CONSTANT.primaryColor}
              labelStyle={{fontSize: 14}}
              radioButtons={this.state.radioButtonsforStartAs}
              onPress={radioButtons => this.setState({radioButtons})}
              style={{
                paddingTop: 0,
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 0,
                marginLeft: 13,
                display: 'flex',
                width: '100%',
                alignSelf: 'center',
                alignContent: 'center',
                textAlign: 'center',
              }}
            />
            {selectedItemforStartAs == 'someone' && (
              <View>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Search doctors, clinics, hospitals, etc."
                  onChangeText={title => this.setState({title})}
                  style={{
                    height: 55,
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
                <View
                  style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                  <MultiSelect
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={value =>
                      this.setState({
                        RelationDataKnown: value,
                      })
                    }
                    uniqueKey="value"
                    items={this.state.RelationData}
                    selectedItems={this.state.RelationDataKnown}
                    borderBottomWidth={0}
                    single={true}
                    // onChangeInput={this.ProjectServicesSpinner}
                    //onChangeInput={ this.ProjectServicesSpinner()}
                    searchInputPlaceholderText="Pick Relation..."
                    selectText="Pick Relation"
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
              </View>
            )}

            <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
              <MultiSelect
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState(
                    {
                      projectHospitalKnown: value,
                    },
                    this.ProjectServicesSpinner,
                  )
                }
                uniqueKey="id"
                items={this.state.projectHospital}
                selectedItems={this.state.projectHospitalKnown}
                borderBottomWidth={0}
                single={true}
                //onChangeInput={this.ProjectServicesSpinner}
                //onChangeInput={this.ProjectServicesSpinner()}
                searchInputPlaceholderText="Pick Hospital..."
                selectText="Pick Hospital"
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
            {this.state.projectServices && (
              <View>
                <FlatList
                  style={{paddingLeft: 5, paddingBottom: 5, marginBottom: 5}}
                  data={this.state.projectServices}
                  extraData={this.state}
                  renderItem={({item, index}) => (
                    <Collapse>
                      <CollapseHeader
                        style={{height: 70, marginBottom: 20}}>
                        <View
                          style={{
                            backgroundColor: '#ffffff',
                            elevation: 3,
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.2,
                            shadowColor: '#000',
                            marginRight: 10,
                            marginTop: 10,
                            marginLeft: 3,
                            marginBottom: 10,
                            borderRadius: 4,
                            height: 70,
                          }}>
                          <TouchableOpacity
                            onPress={() => this.joinDataForSpecialities(item)}>
                            <View style={styles.mainLayoutServices}>
                              <Image
                                resizeMode="cover"
                                style={styles.ImageStyle}
                                source={{uri: item.speciality_image}}
                              />
                              <View
                                style={{
                                  borderLeftColor: '#dddddd',
                                  borderLeftWidth: 0.6,
                                }}
                              />
                              <Text
                                numberOfLines={1}
                                style={styles.mainServiceName}>
                                {item.speciality_title}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <AntIcon
                            name="down"
                            color={'#484848'}
                            size={17}
                            style={{
                              alignSelf: 'flex-end',
                              marginTop: -42,
                              marginRight: 10,
                            }}
                          />
                        </View>
                      </CollapseHeader>
                      <CollapseBody>
                        <View>
                        <FlatList
                            style={{marginTop:10}}
                            data={this.state.projectServices[index].services}
                            extraData={this.state.ServiceRefresh}
                            keyExtractor={(a, b) => b.toString()}
                            renderItem={({item}) => (
                              <TouchableOpacity
                                onPress={() => this.selectedServiceData(item , this.state.projectServices[index].speciality_id)}
                                style={{
                                  flexDirection: 'column',
                                  borderColor: '#ddd',
                                  borderWidth: 0.3,
                                  marginLeft: 10,
                                  marginRight: 15,
                                  backgroundColor: '#fff',
                                }}>
                                <View
                                  style={{flexDirection: 'row', padding: 10}}>
                                  <Text
                                    style={{
                                      flex: 4,
                                      color: '#323232',
                                      // fontFamily: CONSTANT.PoppinsMedium,
                                    }}>
                                    {item.service_title}
                                  </Text>
                                  <Text
                                    style={{
                                      flex: 1,
                                      color: '#323232',
                                      // fontFamily: CONSTANT.PoppinsMedium,
                                      alignSelf: 'flex-end',
                                    }}>
                                    $ {item.service_price}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          />

                            {/* <View
                              style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                                marginBottom: 10,
                              }}>
                              <MultiSelect
                                ref={component => {
                                  this.multiSelect = component;
                                }}
                                onSelectedItemsChange={value =>
                                  this.setState(
                                    {
                                      projectSelectedServiceKnown: value,
                                      // service:[[this.state.projectServices[index].ID] ,  this.state.projectSelectedServiceKnown],
                                    },
                                    this.createRequiredArray(
                                      this.state.projectServices[index].ID,
                                    ),
                                  )
                                }
                                uniqueKey="service_id"
                                items={
                                  this.state.projectServices[index].services
                                }
                                selectedItems={
                                  this.state.projectSelectedServiceKnown
                                }
                                borderBottomWidth={0}
                                searchInputPlaceholderText="Pick Service..."
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
                                displayKey="service_title"
                                submitButtonText="Submit"
                              />
                            </View> */}
                           
                         
                        </View>
                      </CollapseBody>
                    </Collapse>
                  )}
                />

                {this.state.UniqueArray.length >= 1 && (
                  <Text
                    style={{
                      color: '#f7395a',
                      width: '50%',
                      fontSize: 18,
                      margin: 10,
                      // fontFamily: CONSTANT.PoppinsBold,
                    }}>
                    Selected Services:
                  </Text>
                )}
                {this.state.UniqueArray.length >= 1 && (
                  <FlatList
                    style={styles.messageDetailListStyle}
                    data={this.state.UniqueArray}
                    keyExtractor={(a, b) => b.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          borderColor: '#ddd',
                          borderWidth: 0.3,
                          marginLeft: 10,
                          marginRight: 15,
                          backgroundColor: '#fff',
                        }}>
                        <View
                          style={{flexDirection: 'row', flex: 5, padding: 15}}>
                          <Text
                            style={{
                              flex: 5,
                              color: CONSTANT.primaryColor,
                              // fontFamily: CONSTANT.PoppinsBold,
                            }}>
                            {item.service_title}
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              color: CONSTANT.primaryColor,
                              // fontFamily: CONSTANT.PoppinsMedium,
                              alignSelf: 'flex-end',
                            }}>
                            ${item.price}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => this.HanldeSelectedServiceDelete(item, index)}
                          style={{
                            flex: 1,
                            backgroundColor: '#ff5851',
                            borderTopRightRadius: 2,
                            borderBottomRightRadius: 2,
                            height: 55,
                            justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <AntIcon
                            name="delete"
                            color={'#fff'}
                            size={20}
                            style={{top: 15}}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )}
                  />
                )}
                {this.state.UniqueArray.length >= 1 && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'column',
                      height: 50,
                      borderColor: '#ddd',
                      borderWidth: 0.3,
                      marginLeft: 10,
                      marginRight: 15,
                      backgroundColor: '#fff',
                    }}>
                    <View style={{flexDirection: 'row', padding: 15}}>
                      <Text
                        style={{
                          flex: 6,
                          color: CONSTANT.primaryColor,
                          // fontFamily: CONSTANT.PoppinsBold,
                        }}>
                        Consultation Fee:
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          color: CONSTANT.primaryColor,
                          // fontFamily: CONSTANT.PoppinsMedium,
                          alignSelf: 'flex-end',
                        }}>
                       
                         $ {this.state.projectServices[0].fee}
                        
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                {this.state.UniqueArray.length >= 1 && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'column',
                      height: 50,
                      borderColor: '#ddd',
                      borderWidth: 0.3,
                      marginLeft: 10,
                      marginRight: 15,
                      backgroundColor: '#fff',
                    }}>
                    <View style={{flexDirection: 'row', padding: 15}}>
                      <Text
                        style={{
                          flex: 6,
                          color: CONSTANT.primaryColor,
                          // fontFamily: CONSTANT.PoppinsBold,
                        }}>
                        Total Charges:
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          color: '#f7395a',
                          // fontFamily: CONSTANT.PoppinsBold,
                          alignSelf: 'flex-end',
                        }}>
                        ${this.state.totalCharges}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                <Text
                  style={{
                    color: '#f7395a',
                    width: '50%',
                    fontSize: 18,
                    margin: 10,
                    // fontFamily: CONSTANT.PoppinsBold,
                  }}>
                  Select Date & Time:
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    borderRadius: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    overflow: 'hidden',
                    borderColor: '#dddddd',
                    borderWidth: 0.6,
                  }}>
                  <Dates
                    textColor={'#323232'}
                    mode={'date'}
                    isDateBlocked={isDateBlocked}
                    date={this.state.date}
                    onDatesChange={date => this.onDateChange(date)}
                  />
                </View>
              </View>
            )}
            {this.state.projectServices && (
              <Text
                style={{
                  color: '#f7395a',
                  width: '50%',
                  fontSize: 18,
                  margin: 10,
                  fontWeight: '700',
                }}>
                Available Slots:
              </Text>
            )}
            {this.state.doctorSlot != [] ? (
              <View>
                <FlatList
                  style={{paddingLeft: 5}}
                  data={this.state.doctorSlot}
                  extraData={this.state}
                  renderItem={({item, index}) => (
                    <View style={{width: '30%', margin: 5}}>
                      {item.space <= 0 ? (
                        <View
                          style={{
                            flexDirection: 'column',
                            backgroundColor: '#f7f7f7',
                            borderRadius: 5,
                            height: 45,
                            borderColor: '#dddddd',
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: '700', fontSize: 16}}>
                            {item.start_time}
                          </Text>
                          <Text style={{fontSize: 10, color: '#f7395a'}}>
                            Occupied
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: '700', fontSize: 16}}>
                            {item.start_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.space}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  numColumns={3}
                />
              </View>
            ) : (
              <Text>No Slot Available</Text>
            )}
            {this.state.stime != '' ? (
              <View>
                <Text
                  style={{
                    color: '#f7395a',
                    width: '50%',
                    fontSize: 18,
                    margin: 10,
                    fontWeight: '700',
                  }}>
                  Selected Slot:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    fontWeight: '700',
                    width: '100%',
                  }}>
                  <Text
                    style={{fontSize: 15, width: '33.33%', fontWeight: '700'}}>
                    {this.state.stime}
                  </Text>
                  {/* <Text
                    style={{fontSize: 15, width: '33.33%', fontWeight: '700'}}>
                    {this.state.sdate}
                  </Text>
                  <Text
                    style={{fontSize: 15, width: '33.33%', fontWeight: '700'}}>
                    {this.state.sday}
                  </Text> */}
                </View>
              </View>
            ) : null}

<TextInput
              multiline={true}
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder="Description"
              onChangeText={desc => this.setState({desc})}
              style={{
                height: 200,
                paddingLeft: 10,
                marginTop: 10,
                alignItems: 'flex-start',
                borderRadius: 5,
                borderWidth: 0.6,
                borderColor: '#dddddd',
                color: '#323232',
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                textAlignVertical:'top'
              }}
            />
            <TouchableOpacity
              onPress={this.BookAppointment}
              style={{
                alignItems: 'center',
                height: 40,
                margin: 10,
                borderRadius: 4,
                width: '50%',
                alignSelf: 'center',
                backgroundColor: CONSTANT.primaryColor,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  paddingTop: 10,
                }}>
                Book Appointment
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(BookAppointment);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  nextButtonStyle: {
    color: '#fff',
    backgroundColor: '#f7395a',
    borderRadius: 6,
    fontSize: 13,
    padding: 8,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },
  previousButtonStyle: {
    color: '#fff',
    backgroundColor: '#19253f',
    borderRadius: 6,
    fontSize: 13,
    padding: 8,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },
  mainLayoutServices: {
    flexDirection: 'row',
    height: 70,
  },
  ImageStyle: {
    margin: 15,
    width: 35,
    height: 35,
  },
  mainServiceName: {
    color: '#484848',
    fontSize: 15,
    margin: 24,
    fontWeight: '400',
  },
});
