import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, ImageBackground, Text, Alert, AsyncStorage, TouchableOpacity, TextInput, Image, FlatList, PanResponder, Dimensions } from "react-native";
import { SwipeRow, List, Content } from 'native-base';
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomHeader from '../Header/CustomHeader';
import Dash from 'react-native-dash';
import Moment from 'moment';
import * as CONSTANT from '../Constants/Constant';
import axios from "axios";

class AppointmentDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchAppointment: [],
            isLoading: true,
        };
    }
    componentDidMount() {
        this.fetchAppointmentDetail();
    }
    fetchAppointmentDetail = async () => {
        const { params } = this.props.navigation.state;
       

        const response = await fetch(
            CONSTANT.BaseUrl +
            "appointments/get_single?booking_id=" + params.id
        );
        const json = await response.json();
        if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
            this.setState({ fetchAppointment: [], isLoading: false }); // empty data set 
        } else {
            this.setState({ fetchAppointment: json });
        }
    };
    approveAppointment = async ()=>{
        const { params } = this.props.navigation.state;
        axios
        .post(CONSTANT.BaseUrl + "appointments/update_status", {
            booking_id:  params.id,
            status: "accepted"
        })
        .then(async response => {
          if (response.status === 200) {
            console.log(response)
            alert(JSON.stringify(response));
            this.fetchAppointmentDetail();
          } else if (response.status === 203) {
            console.log(response)
            alert(JSON.stringify(response));
          }
        })
        .catch(error => {
          Alert.alert(error);
          console.log(error);
        });
       
    }
    rejectAppointment =async()=>{
        const { params } = this.props.navigation.state;
        axios
        .post(CONSTANT.BaseUrl + "appointments/update_status", {
            booking_id:  params.id,
            status: "rejected"
        })
        .then(async response => {
          if (response.status === 200) {
            console.log(response)
           
            // this.createCheckOutPage();
          } else if (response.status === 203) {
            console.log(response)
           
          }
        })
        .catch(error => {
          Alert.alert(error);
          console.log(error);
        });
       
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
                <CustomHeader headerText={'Appointment Detail'} />
                <ScrollView style={{ backgroundColor: '#f7f7f7' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 6, margin: 15, elevation: 3, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowColor: "#000", }}>
                        <View style={{ flexDirection: 'row', margin: 15, width: '100%', overflow: 'hidden' }}>
                            <View style={{ width: '20%' }}>
                                {
                                    this.state.fetchAppointment ?
                                        <Image
                                            source={{ uri: this.state.fetchAppointment.image }}
                                            style={styles.ImageStyle}
                                        />
                                        :
                                        <Image
                                            source={{ uri: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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' }}
                                            style={styles.ImageStyle}
                                        />

                                }

                            </View>
                            <View style={{ marginLeft: 10, width: '50%' }}>
                                <Text style={{ color: '', fontSize: 13, color: '#3fabf3' }}>General User</Text>
                                {
                                    this.state.fetchAppointment &&
                                    <Text numberOfLines={2} style={{ color: '#323232', fontSize: 17, fontWeight: '700' }}>{this.state.fetchAppointment.name}</Text>
                                }
                                {
                                    this.state.fetchAppointment &&
                                    <Text style={{ color: '#767676', fontSize: 13 }}>{this.state.fetchAppointment.country}</Text>
                                }

                            </View>
                            <View style={{ borderLeftColor: '#767676', borderLeftWidth: 0.4, }} />
                            <View style={{ flexDirection: 'row', width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <View style={{ flexDirection: 'column' }}>

                                    {
                                        this.state.fetchAppointment.post_status == "accepted" ?
                                            <View>
                                                <AntIcon
                                                    name="checkcircle"
                                                    color={"#3fabf3"}
                                                    size={13}
                                                    style={{
                                                        alignSelf: "center",
                                                        textAlign: "center",
                                                        marginTop: 2,
                                                        marginLeft: 2,
                                                        marginRight: 1
                                                    }}
                                                />
                                                <Text style={{ fontSize: 10 }}>Accepted</Text>
                                            </View>

                                            : this.state.fetchAppointment.post_status == "pending" ?
                                                <View>
                                                    <AntIcon
                                                        name="loading1"
                                                        color={"#999999"}
                                                        size={13}
                                                        style={{
                                                            alignSelf: "center",
                                                            textAlign: "center",
                                                            marginTop: 2,
                                                            marginLeft: 2,
                                                            marginRight: 1
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 10 }}>Pending</Text>
                                                </View>

                                                : this.state.fetchAppointment.post_status == "rejected" ?
                                                    <View>
                                                        <AntIcon
                                                            name="circle-with-cross"
                                                            color={"#fe736e"}
                                                            size={13}
                                                            style={{
                                                                alignSelf: "center",
                                                                textAlign: "center",
                                                                marginTop: 2,
                                                                marginLeft: 2,
                                                                marginRight: 1
                                                            }}
                                                        />
                                                        <Text style={{ fontSize: 10 }}>Rejected</Text>
                                                    </View>
                                                    : null
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{ borderBottomColor: '#767676', borderBottomWidth: 0.4, }} />

                        {this.state.fetchAppointment.other_name != "" ?
                            <View style={{ marginLeft: 15, marginTop: 15, marginRight: 15 }}>
                                <Text style={{ fontSize: 15 }}>Patient Name:</Text>
                                {
                                    this.state.fetchAppointment &&
                                    <Text style={{ fontSize: 17 }}>{this.state.fetchAppointment.other_name}</Text>
                                }

                            </View>
                            : null
                        }

                        {this.state.fetchAppointment.other_name != "" ?
                            <View style={{ marginLeft: 15, marginTop: 15, marginRight: 15 }}>
                                <Text style={{ fontSize: 15 }}>Relation With User:</Text>
                                {
                                    this.state.fetchAppointment &&
                                    <Text style={{ fontSize: 17 }}>{this.state.fetchAppointment.other_relation}</Text>
                                }

                            </View>
                            : null
                        }



                        <View style={{ marginLeft: 15, marginTop: 15, marginRight: 15 }}>
                            <Text style={{ fontSize: 15 }}>Appointment Location:</Text>
                            {
                                this.state.fetchAppointment &&
                                <Text style={{ fontSize: 17 }}>{this.state.fetchAppointment.loc_title}</Text>
                            }

                        </View>



                        <View style={{ marginLeft: 15, marginTop: 15, marginRight: 15 }}>
                            <Text style={{ fontSize: 15 }}>Appointment Date:</Text>
                            {
                                this.state.fetchAppointment &&
                                <Text style={{ fontSize: 17 }}>{this.state.fetchAppointment.slots}</Text>
                            }

                        </View>

                        <View style={{ marginLeft: 15, marginTop: 15, marginRight: 15 }}>
                            <Text style={{ fontSize: 15 }}>Charges:</Text>
                            {
                                this.state.fetchAppointment &&
                                <Text style={{ fontSize: 17 }}>{this.state.fetchAppointment.charges}</Text>
                            }

                        </View>

                        <View style={{ marginLeft: 15, marginTop: 15, marginRight: 15 }}>
                            <Text style={{ fontSize: 15 }}>Services Required:</Text>
                            <FlatList
                                data={this.state.fetchAppointment}
                                keyExtractor={(x, i) => i.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity activeOpacity={0.9}>
                                        <View>
                                            <Text>
                                                {item.all_sp_serv.speciality}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>


                        <View style={{ marginLeft: 15, marginTop: 15, marginRight: 15, marginBottom: 15 }}>
                            <Text style={{ fontSize: 15 }}>Comments:</Text>
                            {
                                this.state.fetchAppointment &&
                                <Text style={{ fontSize: 13 }}>{this.state.fetchAppointment.content}</Text>
                            }

                        </View>
                        {
                            this.state.fetchAppointment.post_status == "pending" &&
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity
                                   onPress={()=> this.approveAppointment()}
                                    style={{
                                        alignItems: "center",
                                        height: 40,
                                        margin: 10,
                                        borderRadius: 4,
                                        width: "40%",
                                        alignSelf: "center",
                                        backgroundColor: '#3fabf3'
                                    }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#fff",
                                            paddingTop: 10
                                        }}
                                    >
                                        Approve
                                </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={()=> this.rejectAppointment()}
                                    style={{
                                        alignItems: "center",
                                        height: 40,
                                        margin: 10,
                                        borderRadius: 4,
                                        width: "40%",
                                        alignSelf: "center",
                                        backgroundColor: '#fe736e'
                                    }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#fff",
                                            paddingTop: 10
                                        }}
                                    >
                                        Reject
                                </Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>

                </ScrollView>
            </View>
        );
    }
}
export default withNavigation(AppointmentDetailPage);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    ImageStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: 'center',
        position: 'relative',
        marginRight: 10,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});
