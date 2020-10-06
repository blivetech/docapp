import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Text, TouchableOpacity, TextInput, Image, FlatList,ActivityIndicator , AsyncStorage, PanResponder, Alert, Dimensions } from "react-native";
import { SwipeRow, List, Content, ListItem, Separator } from 'native-base';
import { Input, InputProps, Button } from "react-native-ui-kitten";
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import EducationAndExperienceLayout from './EducationAndExperienceLayout';
import AntIcon from "react-native-vector-icons/AntDesign";
import DocumentPicker from 'react-native-document-picker';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { withNavigation, DrawerActions } from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import AddListCard from './AddListCard';
import Dash from 'react-native-dash';
import ImagePicker from 'react-native-image-crop-picker';
import * as CONSTANT from '../Constants/Constant';
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class PersonalDetail extends Component {

  constructor(props) {

    super(props);
    this.array = [
    ],
      this.arrayExperience = [
      ],
      this.arrayEducation = [
      ],
      this.state = {
        base64_data:'',
        FirstName:'',
        LastName:'',
        DisplayName:'',
        BaseName:'',
        SubHeading:'',
        ShortDescription:'',
        Description:'',
        Address:'',
        Latitude:'',
        Longitude:'',
        Registration:'',
        StratingPrice:'',
        Description:'',
        arrayHolder: [],
        itemHolder:[],
        items:[],
        ExperienceData:[],
        EducationData:[],
        AwardData:[],
        DownloadData:[],
        MembershipData:[],
        arrayHolder_Experience: [],
        arrayHolder_Education: [],
        AddExperienceForm: false,
        textInput_Holder: '',
        ViewExperienceForm: 'false',
        touchableOpacityHeight: 55,
        ExpCompanyName:'',
        ExpDescription:'',
        ExpEndDate:'',
        ExpStartingDate:'',
        ExpJobTitle:'',
        EduDescription:'',
        EduEndDate:'',
        EduInstituteName:'',
        EduInstituteTitle:'',
        EduStartingDate:'',
        AwardTitle:'',
        AwardYear:'',
        Memberdata:'',
        refreshing: true,
        awardrefresh: false,
        ExpRefresh:false,
        EduRefresh:false,
        DownloadRefresh:false,
        Memberfresh:false,
        isLoading: true,
        image: null,
        images: [],
        storedValue: "",
        storedType: "",
        profileImg: "",
        type: "",
        id: "",
      }
  }

  componentWillMount() {
    this.setState({ arrayHolder: [...this.array] })
    this.setState({ arrayHolder_Experience: [...this.arrayExperience] })
    // this.fetchProfileData();
    this.getUser();
  }
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      this.fetchProfileData();
    } catch (error) {
      // alert(error)
    }
  };

  fetchProfileData = async () => {
    const id = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl +
      "profile/setting?id="+id
    );

    const json = await response.json();
    console.log("This is Json" + JSON.stringify(json));
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error'){
      this.setState({ ProfileData: [] }); // empty data set 
    } else {
      this.setState({ ProfileData: json });
      this.setState({ MembershipData: json.memberships });
      this.setState({ ExperienceData: json.am_experiences });
      this.setState({ EducationData: json.am_education });
      this.setState({ AwardData: json.am_award });
      this.setState({ DownloadData: json.am_downloads, isLoading: false });
      this.setState({ FirstName: json.am_first_name });
      this.setState({ LastName: json.am_last_name });
      this.setState({ DisplayName: json.display_name });
      this.setState({ BaseName: json.am_name_base });
      this.setState({ ShortDescription: json.am_short_description });
      this.setState({ SubHeading: json.am_sub_heading });
      this.setState({ Description: json.content });
      this.setState({ Address: json.address });
      this.setState({ Latitude: json.latitude });
      this.setState({ Longitude: json.longitude });
      this.setState({ Registration: json.reg_number });
      this.setState({ StratingPrice: json.am_starting_price });
    }
  };

  joinDataEducation = () => {
    this.arrayEducation.push({ titleExpe: "Add Education" });
    this.setState({ arrayHolder_Education: [...this.arrayEducation] });
  }
  joinDataExperience = () => {
    this.setState({
      AddExperienceForm: true
    })
  }
  HandleEditForm = () => {
    this.setState({ ViewExperienceForm: "true" });
  }
  increaseHeight = () => {
    this.setState({ touchableOpacityHeight: 530 });
  }
  joinData = () => {
    this.array.push({ title: this.state.textInput_Holder });
    this.setState({ arrayHolder: [...this.array] });
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetItem(item) {
  }
  removeItem = (key) => {
    let data = this.state.arrayHolder
    data = data.filter((item) => item.key !== key)
    this.setState({ data })
  }
  UpdateProfileData = async() => {
    const Uid = await AsyncStorage.getItem("projectUid");
    const {
      FirstName,
      LastName,
      DisplayName,
      BaseName,
      SubHeading,
      Description,
      Address,
      Latitude,
      Longitude,
      ShortDescription,
      ExperienceData,
      EducationData,
      AwardData,
      Registration,
      DownloadData,
      MembershipData,
      StratingPrice
    } = this.state;
    console.log(
      FirstName,
      LastName,
      DisplayName,
      BaseName,
      SubHeading,
      Description,
      Address,
      Latitude,
      Longitude,
      ShortDescription,
      ExperienceData,
      EducationData,
      AwardData,
      Registration,
      DownloadData,
      MembershipData,
      StratingPrice
      );
    if(this.state.FirstName == ""){
      this.setState({
        FirstName: this.state.ProfileData.am_first_name
      })
    }
    if(this.state.LastName == ""){
      this.setState({
        FirstName: this.state.ProfileData.am_last_name
      })
    }
    if(this.state.SubHeading === ''){
      this.setState({
        FirstName: this.state.ProfileData.am_sub_heading
      })
    }
    axios
      .post(
        CONSTANT.BaseUrl + "profile/store_profile_setting",
        {
          user_id: Uid,
          first_name:FirstName,
          last_name: LastName,
          display_name: DisplayName,
          // base_name: BaseName,
          // subheading: SubHeading,
          // am_starting_price:StratingPrice,
          // short_desc:Description,
          // location:'2',
          // address:Address,
          // longitude:Longitude,
          // latitude:Latitude,
          // education:EducationData,
          // experience:ExperienceData,
          // awards:AwardData,
          // attachments:DownloadData,
          // registration_number:Registration,
          // membership:MembershipData,
        }
      )
      .then((response) => {
        Alert.alert("Hello" , JSON.stringify(response))
        if (response.status === 200) {
            this.setState({ isUpdatingLoader: false });
            Alert.alert("Profile Updated Successfully", response.data.message);
        } else if (response.status === 203) {
          Alert.alert("Error" , response.data.message);
        }
      }, (error) => {
        Alert.alert("Hello" , JSON.stringify(error.message))
        console.log(error.message);
      });
      // .then(function (response) {
      //   console.log(response)
      // if (response.status === 200) {
      //     this.setState({ isUpdatingLoader: false });
      //     Alert.alert("Profile Updated Successfully", response.data.message);
      // } else if (response.status === 203) {
      //   Alert.alert("Error" , response.data.message);
      // }
      // })
      // .catch(function (error) {
      //   Alert.alert("Hello" , JSON.stringify(error.message))
      //   console.log(error.message);
      // });
 
      // .then(async (response) => {
      //   console.log(response)
      // if (response.status === 200) {
      //     this.setState({ isUpdatingLoader: false });
      //     Alert.alert("Profile Updated Successfully", response.data.message);
      // } else if (response.status === 203) {
      //   Alert.alert("Error" , response.data.message);
      // }
      // })
      // .catch((error)=> {
      //   Alert.alert("Hello" , JSON.stringify(error.message))
      //   console.log(error.message);
      // });
  }
  pickMultiple() {
    try {
      DocumentPicker.pickMultiple({
      })
        .then(DownloadData => {
          this.setState({
            image: null,
            images: DownloadData,
            DownloadRefresh: true,
          });
        })
        .catch(e => alert(e));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }
  fetchExperienceFormData= () => {
    if(this.state.ExpCompanyName == "" && this.state.ExpJobTitle == "" && this.state.ExpDescription == ""){
      Alert.alert('Please Enter The Data Properly');
    }else{
      const {
        ExpCompanyName,
        ExpDescription,
        ExpEndDate,
        ExpStartingDate,
        ExpJobTitle,
      } = this.state;
      this.state.ExperienceData.push({
        company_name: this.state.ExpCompanyName,
        start_date: this.state.ExpStartingDate,
        ending_date: this.state.ExpEndDate,
        job_title: this.state.ExpJobTitle,
        job_description: this.state.ExpDescription
      });
      this.setState({
        ExpRefresh: true,
    })
    }
  }
  
  fetchEducationFormData = () => {
    if(this.state.EduInstituteName == "" && this.state.EduInstituteTitle == "" && this.state.EduDescription == ""){
      Alert.alert('Please Enter The Data Properly');
    }else{
      const {
      EduDescription,
      EduEndDate,
      EduInstituteName,
      EduInstituteTitle,
      EduStartingDate,
      } = this.state;
      this.state.EducationData.push({
        institute_name: this.state.EduInstituteName,
        start_date: this.state.EduStartingDate,
        ending_date: this.state.EduEndDate,
        degree_title: this.state.EduInstituteTitle,
        degree_description: this.state.EduDescription
      });
      this.setState({
        EduRefresh: true,
    })
    }
  }
  fetchAwardsData= ()=>{
    if(this.state.AwardTitle == "" && this.state.AwardYear ){
      Alert.alert('Please Enter The Data Properly');
    }else{
      const {
        AwardTitle,
        AwardYear,
      } = this.state
      this.state.AwardData.push({
        title: this.state.AwardTitle,
        year: this.state.AwardYear,
      });
      this.setState({
        awardrefresh: true,
    })
    }
  }
  fetchMembershipData= ()=>{
    if(this.state.Memberdata == "" ){
      Alert.alert('Please Enter The Data Properly');
    }else{
      const {
      Memberdata,
      } = this.state
      this.state.MembershipData.push({
        name: this.state.Memberdata,
      });
      this.setState({
        Memberfresh: true,
    })
    }
  }

  pickSingleProductBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true
    })
      .then(image => {
        this.setState({
          image: {
            uri: `data:${image.mime};base64,` + image.data,
            width: image.width,
            height: image.height
          },
          images: null
        });
        this.setState({
          base64_data: image.data
        })
      })
      .catch(e => console.log(e));
  }
  
  render() {
    const {
      FirstName,
      LastName,
      DisplayName,
      BaseName,
      SubHeading,
      ShortDescription,
      isLoading
    } = this.state;
    const { storedValue, storedType, profileImg } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={'Profile Settings'} />
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
        <ScrollView>
          <View style={{
            backgroundColor: '#fff', margin: 10, borderRadius: 4, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000",
          }}>
            <Text style={{ color: '#3d4461', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Your Details</Text>
            
              {this.state.ProfileData && storedType == 'doctor' ?
                <TextInput defaultValue={`${entities.decode(this.state.ProfileData.am_name_base)}`} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Select gender" style={styles.TextInputLayout}   onChangeText={BaseName => this.setState({ BaseName })}></TextInput>
                : storedType == 'doctor' ?
                <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Select gender" style={styles.TextInputLayout} />
                :null
              }
           
            {this.state.ProfileData && storedType == "doctor" || storedType ==  "hospital" ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Sub Heading" style={styles.TextInputLayout} onChangeText={SubHeading => this.setState({ SubHeading })}>{`${entities.decode(this.state.ProfileData.am_sub_heading)}`}</TextInput>
              :  storedType == "doctor" || storedType ==  "hospital" ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Sub Heading" style={styles.TextInputLayout} />
              : null
            }
            {this.state.ProfileData ?
              <TextInput defaultValue={`${entities.decode(this.state.ProfileData.am_first_name)}`} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="First Name" style={styles.TextInputLayout} onChangeText={FirstName => this.setState({ FirstName })}></TextInput>
              :
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="First Name" style={styles.TextInputLayout}></TextInput>
            }
            {this.state.ProfileData ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Last Name" style={styles.TextInputLayout} onChangeText={LastName => this.setState({ LastName })}>{`${entities.decode(this.state.ProfileData.am_last_name)}`}</TextInput>
              :
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Last Name" style={styles.TextInputLayout} />
            }
            {this.state.ProfileData && storedType == "doctor" || storedType ==  "hospital" ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Username" style={styles.TextInputLayout} onChangeText={DisplayName => this.setState({ DisplayName })}>{`${entities.decode(this.state.ProfileData.display_name)}`}</TextInput>
              :   storedType == "doctor" || storedType ==  "hospital" ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Username" style={styles.TextInputLayout} />
              : null
            }
            {this.state.ProfileData  && storedType == 'doctor'?
              <TextInput multiline={true} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Starting Price" style={styles.TextInputLayoutContent} onChangeText={StratingPrice => this.setState({ StratingPrice })}>{`${entities.decode(this.state.ProfileData.am_starting_price)}`}</TextInput>
              : storedType == 'doctor' ?
              <TextInput multiline={true} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Starting Price" style={styles.TextInputLayoutContent} />
              : null           
            }
            {this.state.ProfileData  &&   storedType == "doctor" || storedType ==  "hospital" ?
              <TextInput multiline={true} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Description" style={styles.TextInputLayoutContent} onChangeText={Description => this.setState({ Description })}>{`${entities.decode(this.state.ProfileData.content)}`}</TextInput>
              :  storedType == "doctor" || storedType ==  "hospital" ?
              <TextInput multiline={true} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Description" style={{ paddingLeft: 10, height: 150, alignItems: 'flex-start', borderRadius: 2, borderWidth: 0.6, borderColor: '#dddddd', marginLeft: 10, marginRight: 10, marginBottom: 10 }} />
              : null
            }
          </View>
          {
            storedType == "doctor" || storedType == "hospital" &&
<View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
            <Text style={{ color: '#3d4461', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Your Location</Text>
            {this.state.ProfileData ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Select Location" style={styles.TextInputLayout} >{`${entities.decode(this.state.ProfileData.location)}`}</TextInput>
              :
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Select Location" style={styles.TextInputLayout} />}
            {this.state.ProfileData ?
              <TextInput multiline={true} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Your Address" style={styles.TextInputLayout} onChangeText={Address => this.setState({ Address })}>{`${entities.decode(this.state.ProfileData.address)}`}</TextInput>
              :
              <TextInput multiline={true} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Your Address" style={styles.TextInputLayout} />}
            {this.state.ProfileData ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Longitude" style={styles.TextInputLayout} onChangeText={Longitude => this.setState({ Longitude })}>{`${entities.decode(this.state.ProfileData.longitude)}`}</TextInput>
              :
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Longitude" style={styles.TextInputLayout} />}
            {this.state.ProfileData ?
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Latitude" style={styles.TextInputLayout} onChangeText={Latitude => this.setState({ Latitude })}>{`${entities.decode(this.state.ProfileData.latitude)}`}</TextInput>
              :
              <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Latitude" style={styles.TextInputLayout} />}
          </View>
          }
          
          <View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
            <Text style={{ color: '#3d4461', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Profile Photo</Text>

            <View res style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, overflow: 'hidden' }}>
              <TouchableOpacity onPress={() => this.pickSingleProductBase64(false)} style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 4, borderStyle: 'dashed', borderColor: '#dddddd', borderWidth: 0.6, height: 150, width: '60%', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <AntIcon onPress={this.joinData}
                    name="plus"
                    color={"#767676"}
                    size={27}
                  />
                  <Text style={{ color: '#767676', fontSize: 17 }}>Add Profile Photo</Text>
                </View>
              </TouchableOpacity>
              {
                this.state.ProfileData ?
                  <Image style={{ width: '40%', height: 150, borderRadius: 4 }}
                    source={{ uri: `${this.state.ProfileData.profile_image_url}` }} />
                  :
                  <Image style={{ width: '40%', height: 150, borderRadius: 4 }}
                    source={{ uri: `${this.state.fetchImages >= 1 ? this.state.fetchImages : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'} ` }}
                  />
              }
            </View>
          </View>
          {
            storedType == 'doctor' &&
            <View style={{
              backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowColor: "#000", borderRadius: 4,
            }}>
              <Text style={{ color: '#3d4461', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Membership</Text>
              <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                <TextInput onChangeText={Memberdata => this.setState({ textInput_Holder: Memberdata })} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Value Here" style={{ paddingLeft: 10, borderRadius: 2, height: 50, color: '#323232', borderWidth: 0.6, borderColor: '#dddddd', marginBottom: 10, width: '80%' }} />
               {/* <TextInput onChangeText={Memberdata => this.setState({ textInput_Holder: data })} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Value Here" style={{ paddingLeft: 10, borderRadius: 2, height: 50, color: '#323232', borderWidth: 0.6, borderColor: '#dddddd', marginBottom: 10, width: '80%' }} /> */}
                <View style={{ backgroundColor: '#3d4461', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 50, width: '20%', justifyContent: 'center', flexDirection: 'row' }}>
                  <AntIcon 
                  onPress={()=> this.fetchMembershipData()}
                    name="plus"
                    color={"#fff"}
                    size={20}
                    style={{ top: 15 }}
                  />
                </View>
              </View>
              {/* {
                this.state.arrayHolder != null ?
                <View style={{ marginLeft: 3, marginBottom: 2 }}>
                  <SwipeableFlatList
                    data={this.state.arrayHolder}
                    renderItem={({ item }) => (
                      <View style={{ borderWidth: 0, margin: 3, height: 45, flexDirection: "column", paddingTop: 12, backgroundColor: "#f7f7f7" }}>
                        <Text style={{ color: '#323232', fontSize: 15, paddingLeft: 5 }}  > {item.title}  </Text>
                      </View>
                    )}
                    renderRight={({ item }) => (
                      <TouchableOpacity style={{ height: 45, margin: 3, width: 45, backgroundColor: '#fe736e', justifyContent: 'center', flexDirection: 'row', }}
                      // onPress={() => this.deleteAddressVideo(item)}
                      >
                        <AntIcon
                          name="delete"
                          color={"#fff"}
                          size={16}
                          style={{ top: 13, right: -3 }}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
                : null
              } */}
              {
                this.state.MembershipData ?
                  <FlatList
                    style={{ paddingLeft: 5 }}
                    data={this.state.MembershipData}
                    extraData={this.state.Memberfresh}
                    renderItem={({ item }) =>
                      <View style={{ borderWidth: 0, margin: 2, flexDirection: "column", paddingTop: 12, paddingBottom: 12, backgroundColor: "#f7f7f7" }}>
                        <Text style={{
                          color: '#484848',
                          fontSize: 15,
                          marginLeft: 10,
                          marginRight: 10,
                          marginTop: 2,
                          fontWeight: '400',
                          marginBottom: 5
                        }}>
                          {item.title}</Text>
                      </View>
                    }
                  />
                  :
                  null
              }
            </View>

          }
          
          {
            storedType == "doctor" &&
            <View>
              <View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#3d4461', width: '70%', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Experience</Text>
              <TouchableOpacity onPress={() => this.joinDataExperience()} style={{ width: '30%', marginBottom: 15, marginLeft: 10, marginTop: 15 }}>
                {/* <Text   style={{color:'#3d4461'  , fontSize:13 }}>Add Now (+)</Text> */}
              </TouchableOpacity>
            </View>
 
            <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
              <View style={{ marginTop: 10 }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Company Name"
                  onChangeText={ExpCompanyName => this.setState({ ExpCompanyName })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Starting Date"
                  onChangeText={ExpStartingDate => this.setState({ ExpStartingDate })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="End Date"
                  onChangeText={ExpEndDate => this.setState({ ExpEndDate })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  onChangeText={data => this.setState({ textInput_Holder: data })}
                  placeholderTextColor="#7F7F7F"
                  underlineColorAndroid="transparent"
                  placeholder="Job Title"
                  onChangeText={ExpJobTitle => this.setState({ ExpJobTitle })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Description"
                  onChangeText={ExpDescription => this.setState({ ExpDescription })}
                  style={{
                    paddingLeft: 10,
                    height: 150,
                    alignItems: "flex-start",
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TouchableOpacity
                  onPress={this.fetchExperienceFormData}
                  style={styles.buttonHover}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      top: 18
                    }}>
                    Add Now
                     </Text>
                </TouchableOpacity>
              </View>
              {
                this.state.ExperienceData ?
                  <FlatList
                    style={{ paddingLeft: 5 }}
                    data={this.state.ExperienceData}
                    extraData={this.state.ExpRefresh}
                    renderItem={({ item }) =>
                      <Collapse >
                        <CollapseHeader style={{ flexDirection: 'row', marginTop: 3, height: 50, borderWidth: 0, margin: 0, flexDirection: "column", backgroundColor: "#f7f7f7" }}>
                          <View style={{ flexDirection: 'row', borderWidth: 0, backgroundColor: "#f7f7f7" }}>
                            <Text style={{ paddingLeft: 10, borderRadius: 2, height: 50, borderWidth: 0.6, borderColor: '#dddddd', paddingTop: 15, width: '70%' }}>{item.company_name}</Text>
                            <View style={{ backgroundColor: '#3d4461', height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                              <AntIcon onPress={() => this.HandleEditForm()}
                                name="edit"
                                color={"#fff"}
                                size={20}
                                style={{ top: 15 }}
                              />
                            </View>
                            <View style={{ backgroundColor: '#ff5851', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                              <AntIcon
                                name="delete"
                                color={"#fff"}
                                size={20}
                                style={{ top: 15 }}
                              />
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody >

                          <View style={{ marginTop: 10 }}>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Company Name"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.company_name}</TextInput>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Starting Date"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.start}</TextInput>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="End Date"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.ending}</TextInput>
                            <TextInput
                              onChangeText={data => this.setState({ textInput_Holder: data })}
                              placeholderTextColor="#7F7F7F"
                              underlineColorAndroid="transparent"
                              placeholder="Job Title"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.job_title}</TextInput>
                            <TextInput
                              multiline={true}
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Description"
                              style={{
                                minHeight:45,
                                paddingLeft: 10,
                                alignItems: "flex-start",
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.description}</TextInput>
                            <TouchableOpacity
                              onPress={this.joinData}
                              style={styles.buttonHover}>
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: 14,
                                  fontWeight: "500",
                                  textAlign: "center",
                                  top: 18
                                }}>
                                Add Now
                     </Text>
                            </TouchableOpacity>
                          </View>
                        </CollapseBody>
                      </Collapse>
                    }
                  />
                  : null
              }
            </View>


          </View>
          <View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#3d4461', width: '70%', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Education</Text>
              <TouchableOpacity onPress={() => this.joinDataEducation()} style={{ width: '30%', marginBottom: 15, marginLeft: 10, marginTop: 15 }}>
                {/* <Text   style={{color:'#3d4461'  , fontSize:13 }}>Add Now (+)</Text> */}
              </TouchableOpacity>

            </View>
            <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
              <View >
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Institute Name"
                  onChangeText={EduInstituteName => this.setState({ EduInstituteName })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Starting Date"
                  onChangeText={EduStartingDate => this.setState({ EduStartingDate })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="End Date"
                  onChangeText={EduEndDate => this.setState({ EduEndDate })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  onChangeText={data => this.setState({ textInput_Holder: data })}
                  placeholderTextColor="#7F7F7F"
                  underlineColorAndroid="transparent"
                  placeholder="Institute Title"
                  onChangeText={EduInstituteTitle => this.setState({ EduInstituteTitle })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Description"
                  onChangeText={EduDescription => this.setState({ EduDescription })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    height: 150,
                    alignItems: "flex-start",
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TouchableOpacity
                  onPress={this.fetchEducationFormData}
                  style={styles.buttonHover}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      top: 18
                    }}
                  >
                    Add Now
                     </Text>
                </TouchableOpacity>
              </View>
             
              {
                this.state.EducationData ?
                  <FlatList
                    style={{ paddingLeft: 5 }}
                    data={this.state.EducationData}
                    extraData={this.state.EduRefresh}
                    renderItem={({ item }) =>
                      <Collapse >
                        <CollapseHeader style={{ flexDirection: 'row', marginTop: 2, height: 50, borderWidth: 0, flexDirection: "column", backgroundColor: "#f7f7f7" }}>
                          <View style={{ flexDirection: 'row', borderWidth: 0, backgroundColor: "#f7f7f7" }}>
                            <Text style={{ paddingLeft: 10, borderRadius: 2, height: 50, borderWidth: 0.6, borderColor: '#dddddd', paddingTop: 15, width: '70%' }}>{item.institute_name}</Text>
                            <View style={{ backgroundColor: '#3d4461', height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                              <AntIcon onPress={() => this.HandleEditForm()}
                                name="edit"
                                color={"#fff"}
                                size={20}
                                style={{ top: 15 }}
                              />
                            </View>
                            <View style={{ backgroundColor: '#ff5851', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                              <AntIcon
                                name="delete"
                                color={"#fff"}
                                size={20}
                                style={{ top: 15 }}
                              />
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody >



                          <View style={{ marginTop: 10 }}>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Institute Name"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.institute_name}</TextInput>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Starting Date"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.start}</TextInput>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="End Date"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.ending}</TextInput>
                            <TextInput
                              onChangeText={data => this.setState({ textInput_Holder: data })}
                              placeholderTextColor="#7F7F7F"
                              underlineColorAndroid="transparent"
                              placeholder="Degree Title"
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.degree_title}</TextInput>
                            <TextInput
                              multiline={true}
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Description"
                              style={{
                                minHeight:45,
                                paddingLeft: 10,
                                alignItems: "flex-start",
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.edu_desc}</TextInput>
                            <TouchableOpacity
                              onPress={this.joinData}
                              style={styles.buttonHover}>
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: 14,
                                  fontWeight: "500",
                                  textAlign: "center",
                                  top: 18
                                }}>
                                Add Now
                             </Text>
                            </TouchableOpacity>
                          </View>
                        </CollapseBody>
                      </Collapse>
                    }
                  />
                  : null
              }
            </View>
          </View>
            </View>
          }
          {
            storedType == 'doctor' &&
<View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#3d4461', width: '70%', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Add Your Awards</Text>
              <TouchableOpacity onPress={() => this.joinDataEducation()} style={{ width: '30%', marginBottom: 15, marginLeft: 10, marginTop: 15 }}>
                {/* <Text   style={{color:'#3d4461'  , fontSize:13 }}>Add Now (+)</Text> */}
              </TouchableOpacity>

            </View>
            <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
              <View >
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Award Title"
                  onChangeText={AwardTitle => this.setState({ AwardTitle })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Year"
                  onChangeText={AwardYear => this.setState({ AwardYear })}
                  style={{
                    height: 45,
                    paddingLeft: 10,
                    borderRadius: 2,
                    borderWidth: 0.6,
                    borderColor: "#dddddd",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                />

                <TouchableOpacity
                  onPress={this.fetchAwardsData}
                  style={styles.buttonHover}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      top: 18
                    }}
                  >
                    Add Now
                     </Text>
                </TouchableOpacity>
              </View>

              {
                this.state.AwardData ?
                  <FlatList
                    style={{ paddingLeft: 5 }}
                    data={this.state.AwardData}
                    extraData={this.state.awardrefresh}
                    renderItem={({ item }) =>
                      <Collapse >
                        <CollapseHeader style={{ flexDirection: 'row', marginTop: 2, height: 50, borderWidth: 0, flexDirection: "column", backgroundColor: "#f7f7f7" }}>
                          <View style={{ flexDirection: 'row', borderWidth: 0, backgroundColor: "#f7f7f7" }}>
                            <Text style={{ paddingLeft: 10, borderRadius: 2, height: 50, borderWidth: 0.6, borderColor: '#dddddd', alignSelf: "center", textAlignVertical: 'center', width: '70%' }}>{item.title}</Text>
                            <View style={{ backgroundColor: '#3d4461', height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                              <AntIcon onPress={() => this.HandleEditForm()}
                                name="edit"
                                color={"#fff"}
                                size={20}
                                style={{ top: 15 }}
                              />
                            </View>
                            <View style={{ backgroundColor: '#ff5851', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                              <AntIcon
                                name="delete"
                                color={"#fff"}
                                size={20}
                                style={{ top: 15 }}
                              />
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody >

                          <View style={{ marginTop: 10 }}>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Award Title"
                              onChangeText={AwardTitle => this.setState({ AwardTitle })}
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.title}</TextInput>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder="Award Year"
                              onChangeText={AwardYear => this.setState({ AwardYear })}
                              style={{
                                height: 45,
                                paddingLeft: 10,
                                borderRadius: 2,
                                borderWidth: 0.6,
                                color:'#323232',
                                borderColor: "#dddddd",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10
                              }}
                            >{item.year}</TextInput>

                            <TouchableOpacity
                              onPress={this.fetchAwardsData}
                              style={styles.buttonHover}>
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: 14,
                                  fontWeight: "500",
                                  textAlign: "center",
                                  top: 18
                                }}>
                                Add Now
                     </Text>
                            </TouchableOpacity>
                          </View>
                        </CollapseBody>
                      </Collapse>
                    }
                  />
                  : null
              }
            </View>
          </View>
          }
          
          {
            storedType == "doctor" &&
            <View style={{
              backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowColor: "#000", borderRadius: 4,
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#3d4461', width: '70%', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Downloads</Text>
                <TouchableOpacity onPress={() => this.joinDataEducation()} style={{ width: '30%', marginBottom: 15, marginLeft: 10, marginTop: 15 }}>
                  {/* <Text   style={{color:'#3d4461'  , fontSize:13 }}>Add Now (+)</Text> */}
                </TouchableOpacity>
  
              </View>
              <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
                <TouchableOpacity onPress={() => this.pickMultiple()} style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 4, marginLeft: 2, marginRight: 2, borderStyle: 'dashed', borderColor: '#dddddd', borderWidth: 1, height: 150, width: '100%', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <AntIcon 
                      name="plus"
                      color={"#767676"}
                      size={27}
                    />
                    <Text style={{ color: '#767676', fontSize: 17 }}>Add Files for Download</Text>
                  </View>
                </TouchableOpacity>
  
                {
                  this.state.DownloadData ?
                    <FlatList
                      style={{ paddingLeft: 5 }}
                      data={this.state.DownloadData}
                      extraData={this.state.DownloadRefresh}
                      renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', borderWidth: 0, margin: 2, borderRadius: 4, borderColor: '#dddddd', borderWidth: 0.6, backgroundColor: '#f7f7f7' }}>
                          <View style={{ height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                            <Image resizeMode={"cover"} style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                              source={require('../../Assets/Images/Download.png')} />
                          </View>
                          <View style={{ flexDirection: 'column', width: '70%' }}>
                            <Text style={{ paddingLeft: 10, height: 50, textAlignVertical: 'center' }}>{item.name} {"\n"}{item.size}</Text>
                          </View>
  
  
                          <View style={{ backgroundColor: '#ff5851', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                            <AntIcon
                              name="delete"
                              color={"#fff"}
                              size={20}
                              style={{ top: 15 }}
                            />
                          </View>
                        </View>
                      }
                    />
                    : null
                }
              </View>
            </View>
          }
          {
            storedType == 'doctor' || storedType == 'hospital' &&
            <View style={{
              backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 4, elevation: 3,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowColor: "#000", borderRadius: 4,
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#3d4461', width: '70%', fontSize: 20, fontWeight: "900", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Add Your Registration No.</Text>
                <TouchableOpacity onPress={() => this.joinDataEducation()} style={{ width: '30%', marginBottom: 15, marginLeft: 10, marginTop: 15 }}>
                  {/* <Text   style={{color:'#3d4461'  , fontSize:13 }}>Add Now (+)</Text> */}
                </TouchableOpacity>
                </View>
              <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
              {this.state.ProfileData ?
                <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Registration Number" style={styles.TextInputLayout} onChangeText={Registration => this.setState({ Registration })}>{`${entities.decode(this.state.ProfileData.reg_number)}`}</TextInput>
                :
                <TextInput underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Registration Number" style={styles.TextInputLayout} />}
                <View style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 4, marginLeft: 2, marginRight: 2, borderStyle: 'dashed', borderColor: '#dddddd', borderWidth: 1, height: 150, width: '100%', marginBottom: 10 }}>
  
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <AntIcon onPress={this.joinData}
                      name="plus"
                      color={"#767676"}
                      size={27}
                    />
                    <Text style={{ color: '#767676', fontSize: 17 }}>Add Document</Text>
                  </View>
                </View>
  
                {
                  this.state.ProfileData ?
                    <View style={{ flexDirection: 'row', borderWidth: 0, margin: 2, borderRadius: 4, borderColor: '#dddddd', borderWidth: 0.6, backgroundColor: '#f7f7f7' }}>
                      <View style={{ height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                        <Image resizeMode={"cover"} style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                          source={require('../../Assets/Images/Download.png')} />
                      </View>
                      <View style={{ flexDirection: 'column', width: '70%' }}>
                        <Text style={{ paddingLeft: 10, height: 50, textAlignVertical: 'center' }}>{this.state.ProfileData.document_name} {"\n"}File Size: {this.state.ProfileData.document_size}</Text>
                      </View>
  
  
                      <View style={{ backgroundColor: '#ff5851', borderTopRightRadius: 2, borderBottomRightRadius: 2, height: 50, width: '15%', justifyContent: 'center', flexDirection: 'row' }}>
                        <AntIcon
                          name="delete"
                          color={"#fff"}
                          size={20}
                          style={{ top: 15 }}
                        />
                      </View>
                    </View>
                    : null
                }
              </View>
            </View>
          }
          
          <TouchableOpacity onPress={this.UpdateProfileData} style={{
            backgroundColor: '#3fabf3', height: 60, width: '100%', flexDirection: 'row', justifyContent: 'center', elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000",
          }}>
            <Text style={{ color: '#fff', justifyContent: 'center', fontSize: 16, top: 20 }}>Update all the latest changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(PersonalDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  TextInputLayout: {
    minHeight: 45, color: '#323232', paddingLeft: 10, paddingRight: 10, borderRadius: 2, borderWidth: 0.6, borderColor: '#dddddd', marginLeft: 10, marginRight: 10, marginBottom: 10
  },
  TextInputLayoutContent: {
    minHeight: 45, paddingLeft: 10, paddingRight: 10, borderRadius: 2, borderWidth: 0.6, borderColor: '#dddddd', marginLeft: 10, marginRight: 10, marginBottom: 10
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
  }
});
