import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  ScrollView,
  Text,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from '../Constants/Constant';
import {withNavigation, DrawerActions} from 'react-navigation';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

class LocationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchLocation: [],
      fetchLocationMondaySlots: [],
      fetchLocationTuesdaySlots: [],
      fetchLocationWednesdaySlots: [],
      fetchLocationThursdaySlots: [],
      fetchLocationFridaySlots: [],
      fetchLocationSaturdaySlots: [],
      fetchLocationSundaySlots: [],
    };
  }
  componentDidMount() {
    this.fetchLocationDetail();
  }

  fetchLocationDetail = async () => {
    const {params} = this.props.navigation.state;
    const id = await AsyncStorage.getItem('projectUid');
    Alert.alert('Data:' + JSON.stringify(params.id) + id);
    const response = await fetch(
      CONSTANT.BaseUrl +
        'appointment/get_location_detail?id=' +
        JSON.stringify(params.id) +
        '&user_id=' +
        id,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchLocation: [], isLoading: false}); // empty data set
    } else {
      this.setState({fetchLocation: json});
      this.setState({fetchLocationMondaySlots: json.mon.slots});
      this.setState({fetchLocationTuesdaySlots: json.tue.slots});
      this.setState({fetchLocationWednesdaySlots: json.wed.slots});
      this.setState({fetchLocationThursdaySlots: json.thu.slots});
      this.setState({fetchLocationFridaySlots: json.fri.slots});
      this.setState({fetchLocationSaturdaySlots: json.sat.slots});
      this.setState({fetchLocationSundaySlots: json.sun.slots});
    }
  };

  render() {
    const {
      fetchLocation,
      fetchLocationMondaySlots,
      fetchLocationTuesdaySlots,
      fetchLocationThursdaySlots,
      fetchLocationWednesdaySlots,
      fetchLocationFridaySlots,
      fetchLocationSaturdaySlots,
      fetchLocationSundaySlots,
    } = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader headerText={'Location Detail'} />
        {this.state.fetchLocation && (
          <ScrollView>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 6,
                margin: 5,
                flexDirection: 'row',
                padding: 10,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowColor: '#000',
                elevation: 3,
              }}>
              <View>
                <Image
                  style={{width: 75, height: 75, borderRadius: 6}}
                  source={{uri: fetchLocation.image}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  margin: 10,
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#3FABF3', fontSize: 13}}>
                  {fetchLocation.status}
                </Text>
                <Text
                  style={{
                    color: '#3D4461',
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  {fetchLocation.user_name}
                </Text>
                <FlatList
                  style={{}}
                  data={this.state.fetchLocation.selected_day}
                  ListEmptyComponent={this._listEmptyComponent}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({item}) => (
                    <View>
                      <Text
                        style={{
                          color: '#858585',
                          fontSize: 12,
                          marginRight: 5,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  )}
                  horizontal={true}
                />
              </View>
            </View>
            <Text
              style={{
                color: '#3d4461',
                width: '70%',
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 15,
                marginLeft: 10,
                marginTop: 10,
              }}>
              Days I Offer My Services:
            </Text>
            {fetchLocationMondaySlots && (
              <Collapse>
                <CollapseHeader
                  style={{height: 70, marginTop: 10, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      elevation: 3,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowColor: '#000',
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      height: 70,
                    }}>
                    <TouchableOpacity>
                      <View style={styles.mainLayoutServices}>
                        <Text numberOfLines={1} style={styles.mainServiceName}>
                          Monday
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={'#484848'}
                      size={17}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: -42,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '100%'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={this.login}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: '25%',
                          alignSelf: 'center',
                          backgroundColor: '#2FBC9C',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 10,
                          }}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      {fetchLocationMondaySlots.length != 0 && (
                        <TouchableOpacity
                          onPress={this.login}
                          style={{
                            alignItems: 'center',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                            width: '25%',
                            alignSelf: 'center',
                            backgroundColor: '#F95851',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#fff',
                              paddingTop: 10,
                            }}>
                            Delete All
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <FlatList
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      data={this.state.fetchLocationMondaySlots}
                      extraData={this.state}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            margin: 3,
                            width: '48%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              marginHorizontal: 10,
                            }}>
                            {item.start_time} - {item.end_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.spaces}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  </View>
                </CollapseBody>
              </Collapse>
            )}

            {fetchLocationTuesdaySlots && (
              <Collapse>
                <CollapseHeader
                  style={{height: 70, marginTop: 10, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      elevation: 3,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowColor: '#000',
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      height: 70,
                    }}>
                    <TouchableOpacity>
                      <View style={styles.mainLayoutServices}>
                        <Text numberOfLines={1} style={styles.mainServiceName}>
                          Tuesday
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={'#484848'}
                      size={17}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: -42,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '100%'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={this.login}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: '25%',
                          alignSelf: 'center',
                          backgroundColor: '#2FBC9C',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 10,
                          }}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      {fetchLocationTuesdaySlots.length != 0 && (
                        <TouchableOpacity
                          onPress={this.login}
                          style={{
                            alignItems: 'center',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                            width: '25%',
                            alignSelf: 'center',
                            backgroundColor: '#F95851',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#fff',
                              paddingTop: 10,
                            }}>
                            Delete All
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <FlatList
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      data={this.state.fetchLocationTuesdaySlots}
                      extraData={this.state}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            margin: 3,
                            width: '48%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              marginHorizontal: 10,
                            }}>
                            {item.start_time} - {item.end_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.spaces}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  </View>
                </CollapseBody>
              </Collapse>
            )}

            {fetchLocationWednesdaySlots && (
              <Collapse>
                <CollapseHeader
                  style={{height: 70, marginTop: 10, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      elevation: 3,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowColor: '#000',
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      height: 70,
                    }}>
                    <TouchableOpacity>
                      <View style={styles.mainLayoutServices}>
                        <Text numberOfLines={1} style={styles.mainServiceName}>
                          Wednesday
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={'#484848'}
                      size={17}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: -42,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '100%'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={this.login}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: '25%',
                          alignSelf: 'center',
                          backgroundColor: '#2FBC9C',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 10,
                          }}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      {fetchLocationWednesdaySlots.length != 0 && (
                        <TouchableOpacity
                          onPress={this.login}
                          style={{
                            alignItems: 'center',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                            width: '25%',
                            alignSelf: 'center',
                            backgroundColor: '#F95851',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#fff',
                              paddingTop: 10,
                            }}>
                            Delete All
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <FlatList
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      data={this.state.fetchLocationWednesdaySlots}
                      extraData={this.state}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            margin: 3,
                            width: '48%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              marginHorizontal: 10,
                            }}>
                            {item.start_time} - {item.end_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.spaces}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  </View>
                </CollapseBody>
              </Collapse>
            )}

            {fetchLocationThursdaySlots && (
              <Collapse>
                <CollapseHeader
                  style={{height: 70, marginTop: 10, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      elevation: 3,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowColor: '#000',
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      height: 70,
                    }}>
                    <TouchableOpacity>
                      <View style={styles.mainLayoutServices}>
                        <Text numberOfLines={1} style={styles.mainServiceName}>
                          Thursday
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={'#484848'}
                      size={17}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: -42,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '100%'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={this.login}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: '25%',
                          alignSelf: 'center',
                          backgroundColor: '#2FBC9C',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 10,
                          }}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      {fetchLocationThursdaySlots.length != 0 && (
                        <TouchableOpacity
                          onPress={this.login}
                          style={{
                            alignItems: 'center',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                            width: '25%',
                            alignSelf: 'center',
                            backgroundColor: '#F95851',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#fff',
                              paddingTop: 10,
                            }}>
                            Delete All
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <FlatList
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      data={this.state.fetchLocationThursdaySlots}
                      extraData={this.state}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            margin: 3,
                            width: '48%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              marginHorizontal: 10,
                            }}>
                            {item.start_time} - {item.end_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.spaces}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  </View>
                </CollapseBody>
              </Collapse>
            )}

            {fetchLocationFridaySlots && (
              <Collapse>
                <CollapseHeader
                  style={{height: 70, marginTop: 10, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      elevation: 3,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowColor: '#000',
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      height: 70,
                    }}>
                    <TouchableOpacity>
                      <View style={styles.mainLayoutServices}>
                        <Text numberOfLines={1} style={styles.mainServiceName}>
                          Friday
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={'#484848'}
                      size={17}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: -42,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '100%'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={this.login}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: '25%',
                          alignSelf: 'center',
                          backgroundColor: '#2FBC9C',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 10,
                          }}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      {fetchLocationFridaySlots.length != 0 && (
                        <TouchableOpacity
                          onPress={this.login}
                          style={{
                            alignItems: 'center',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                            width: '25%',
                            alignSelf: 'center',
                            backgroundColor: '#F95851',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#fff',
                              paddingTop: 10,
                            }}>
                            Delete All
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <FlatList
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      data={this.state.fetchLocationFridaySlots}
                      extraData={this.state}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            margin: 3,
                            width: '48%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              marginHorizontal: 10,
                            }}>
                            {item.start_time} - {item.end_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.spaces}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  </View>
                </CollapseBody>
              </Collapse>
            )}

            {fetchLocationSaturdaySlots && (
              <Collapse>
                <CollapseHeader
                  style={{height: 70, marginTop: 10, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      elevation: 3,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowColor: '#000',
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      height: 70,
                    }}>
                    <TouchableOpacity>
                      <View style={styles.mainLayoutServices}>
                        <Text numberOfLines={1} style={styles.mainServiceName}>
                          Saturday
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={'#484848'}
                      size={17}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: -42,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '100%'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={this.login}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: '25%',
                          alignSelf: 'center',
                          backgroundColor: '#2FBC9C',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 10,
                          }}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      {fetchLocationSaturdaySlots.length != 0 && (
                        <TouchableOpacity
                          onPress={this.login}
                          style={{
                            alignItems: 'center',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                            width: '25%',
                            alignSelf: 'center',
                            backgroundColor: '#F95851',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#fff',
                              paddingTop: 10,
                            }}>
                            Delete All
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <FlatList
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      data={this.state.fetchLocationSaturdaySlots}
                      extraData={this.state}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            margin: 3,
                            width: '48%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              marginHorizontal: 10,
                            }}>
                            {item.start_time} - {item.end_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.spaces}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  </View>
                </CollapseBody>
              </Collapse>
            )}

            {fetchLocationSundaySlots && (
              <Collapse>
                <CollapseHeader
                  style={{height: 70, marginTop: 10, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      elevation: 3,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowColor: '#000',
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      height: 70,
                    }}>
                    <TouchableOpacity>
                      <View style={styles.mainLayoutServices}>
                        <Text numberOfLines={1} style={styles.mainServiceName}>
                          Sunday
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={'#484848'}
                      size={17}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: -42,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '100%'}}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={this.login}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: '25%',
                          alignSelf: 'center',
                          backgroundColor: '#2FBC9C',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 10,
                          }}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      {fetchLocationSundaySlots.length != 0 && (
                        <TouchableOpacity
                          onPress={this.login}
                          style={{
                            alignItems: 'center',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                            width: '25%',
                            alignSelf: 'center',
                            backgroundColor: '#F95851',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#fff',
                              paddingTop: 10,
                            }}>
                            Delete All
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <FlatList
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      data={this.state.fetchLocationSundaySlots}
                      extraData={this.state}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item)}
                          style={{
                            flexDirection: 'column',
                            margin: 3,
                            width: '48%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            height: 45,
                            borderColor: CONSTANT.primaryColor,
                            borderWidth: 0.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              marginHorizontal: 10,
                            }}>
                            {item.start_time} - {item.end_time}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            Space: {item.spaces}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  </View>
                </CollapseBody>
              </Collapse>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}
export default withNavigation(LocationDetail);
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
