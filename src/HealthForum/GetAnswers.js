import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar , FlatList, ScrollView, Text , Image  , Alert, TextInput , ActivityIndicator  , ImageBackground} from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import * as CONSTANT from '../Constants/Constant';
import axios from "axios";
import MultiSelect from "react-native-multiple-select";
import RBSheet from "react-native-raw-bottom-sheet";
import HealthForumAnswerCard from "./HealthForumAnswerCard";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class GetAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          reply: "",
          isLoading: true,
          Title:'',
          Description:'',
        };
      }
    componentWillMount(){
      this.HomeSpecialitiesSpinner();
     this.fetchHealthForumBasic();
     this.fetchHealthAnswers();
    }
    HomeSpecialitiesSpinner = async () => {
      return fetch(
        CONSTANT.BaseUrl + "taxonomies/get-specilities",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          let HomeSpecialities = responseJson;
          this.setState({
            HomeSpecialities
          });
        })
        .catch(error => {
          console.error(error);
        });
    };
    fetchHealthForumBasic= async()=>{
        const { params } = this.props.navigation.state;
        const response = await fetch(
          CONSTANT.BaseUrl +
          "forums/basic" 
        );
        const json = await response.json();
         
        this.setState({ fetchHealthtitle: json[0].hf_title });
        this.setState({ fetchHealthhf_sub_title: json[0].hf_sub_title });
        this.setState({ fetchHealthhf_description: json[0].hf_description });
    }
    fetchHealthAnswers = async () => {
        const { params } = this.props.navigation.state;
        const response = await fetch(
          CONSTANT.BaseUrl +
          "forums/get_answer?post_id="+params.itemId 
        );
        const json = await response.json();
        if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
          this.setState({ HealthAnswers: [], isLoading: false }); // empty data set 
        } else {
          this.setState({ HealthAnswers: json, isLoading: false });
          this.setState({ HealthAnswersList: json[0].answers, isLoading: false });
        }
      };
      submitAnswer=()=>{
        const { reply } = this.state;
        const { params } = this.props.navigation.state;
        if (reply == "") {
          //alert("Please enter Email address");
          this.setState({ email: "Please type Answer" });
        } else {
          // this.openProgressbar();
          axios
            .post(
              CONSTANT.BaseUrl + "forums/update_answer",
              {
                post_id: params.itemId,
                profile_id:"460",
                answer: reply
              }
            )
            .then(async response => {
              if (response.status === 200) {
                alert(response.data.message);
              } else if (response.status === 203) {
                alert(response.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      
      }
      submitQuestion=()=>{
        const { reply } = this.state;
        const { params } = this.props.navigation.state;
        if (this.state.Title == "" && this.state.Description == "" && this.state.SpecialityKnown[0] == "" ) {
          //alert("Please enter Email address");
          this.setState({ email: "Please Add Complete Data" });
        } else {
          // this.openProgressbar();
          axios
            .post(
              CONSTANT.BaseUrl + "forums/add_question",
              {
              
                user_id:"12",
                speciality:this.state.SpecialityKnown[0],
                title: this.state.Title,
                description:this.state.Description
              }
            )
            .then(async response => {
              if (response.status === 200) {
                alert(response.data.message);
              } else if (response.status === 203) {
                alert(response.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      
      }
  render() {
    const { isLoading} = this.state;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
          <CustomHeader headerText={'Health Forum'}/>
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
          <ImageBackground  source={require('../../Assets/Images/HealthMain.png')} style={{width: '100%', height: 250 , justifyContent:'center' , alignContent:'center' , alignItems:'center'}}>
          <View style={{}}>
              <View style={{flexDirection:"column" , alignContent:'center' , alignItems:'center'}}>
                  {
                      this.state.fetchHealthtitle &&
                      <Text style={{color:'#323232' ,textAlign:'center' , fontSize:13}}>
                      {this.state.fetchHealthtitle}
                      </Text>
                  }
                  {
                       this.state.fetchHealthhf_sub_title &&
                       <Text style={{color:CONSTANT.primaryColor ,  textAlign:'center' , fontSize:25 , fontWeight:'700'}}>
                       {this.state.fetchHealthhf_sub_title}
                       </Text>
                  }
                  {
                       this.state.fetchHealthhf_description &&
                       <Text style={{color:'#323232',textAlign:'center' , fontSize:13 , marginLeft:30 , marginRight:30}}>
                       {this.state.fetchHealthhf_description}
                       </Text>
                  }
                  <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                alignItems: "center",
                height: 40,
                margin: 15, 
                borderRadius: 4,
                width: "70%",
                alignSelf: "center",
                backgroundColor: '#3fabf3'
              }}>
              <Text
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#fff",
                  marginLeft:15,
                  marginRight:15,
                  paddingTop: 10
                }}
              >
                 Post Your Question
            </Text>
            </TouchableOpacity>
              </View>

          </View>
        </ImageBackground>
        <View style={{
            backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10 , marginTop:10, borderRadius: 4, elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowColor: "#000", borderRadius: 4,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#3d4461', width: '70%', fontSize: 20, fontWeight: "700", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>Question:</Text>
              <TouchableOpacity onPress={() => this.joinDataEducation()} style={{ width: '30%', marginBottom: 15, marginLeft: 10, marginTop: 15 }}>
                {/* <Text   style={{color:'#3d4461'  , fontSize:13 }}>Add Now (+)</Text> */}
              </TouchableOpacity>

            </View>
            <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
              <View >
                {
                  this.state.HealthAnswers && 
                 <Text style={{ color: '#3d4461', width: '98%', fontSize: 17, marginBottom: 15, marginLeft: 10, marginTop: 10 }}>{params.itemQuestion}</Text>
                }
              
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder="Type Your Reply"
                  onChangeText={reply => this.setState({ reply })}
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
                  onPress={this.submitAnswer}
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
                    Post Answer
                     </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            {
              this.state.HealthAnswers &&
              <Text style={{ color: '#3d4461', width: '70%', fontSize: 20, fontWeight: "700", marginBottom: 15, marginLeft: 10, marginTop: 10 }}>{this.state.HealthAnswers[0].count_answers} Answers</Text>
            }
          </View>
          { this.state.HealthAnswersList.length >= 1 ? 
         <FlatList
         style={{ paddingLeft: 5 }}
         data={this.state.HealthAnswersList}
         ListEmptyComponent={this._listEmptyComponent}
         keyExtractor={(x, i) => i.toString()}
         renderItem={({ item }) =>
           <TouchableOpacity
             activeOpacity={0.9}>
             <HealthForumAnswerCard
             image={{ uri: `${item.image}` }}
             name={`${entities.decode(item.name)}`}
             date={`${entities.decode(item.sub_heading)}`}
             
             detail={`${entities.decode(item.answer)}`}
             />
           </TouchableOpacity>
         }
       />
       :
       <View style={{flex:1  , alignContent:'center' , height:'100%' , width:'100%' , flexDirection:'column', justifyContent:'center' , alignItems:'center'}}>
         <Image
         resizeMode={'contain'}
          style={{width: 250, height: 250}}
          source={require('../../Assets/Images/arrow.png')}
         />
         <Text style={{fontSize:25 , fontWeight:'700' , marginVertical:10}}>Oops,</Text>
         <Text style={{fontSize:17 , fontWeight:'700' }}>No Data Available</Text>

       </View>
        }
         
          </ScrollView>
          <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              paddingLeft:15 ,
              paddingRight:15,
              backgroundColor:'transparent',
            }
          }}
        >
        <View style={{backgroundColor:'#fff' , width:'100%' , borderTopLeftRadius:6 , borderTopRightRadius:6 , overflow:'hidden'}}>
          <View style={{backgroundColor:"#3d4461" , height:50}}>
          <Text style={{ width:'100%' , color: '#fff' , fontSize: 20, fontWeight: "700", marginLeft: 20, marginTop: 10 }}>Post Your Question:</Text>
          </View>
       
          <View style={{height:300 , width:"100%" ,justifyContent: "center",
              alignItems: "center"}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
          <View style={{ marginLeft: 10, marginRight: 10   , marginTop:10 }}>
              <MultiSelect
              style={{marginLeft: 10, marginRight: 10 ,  marginBottom: 10}}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ SpecialityKnown: value })
                }
                uniqueKey="id"
                items={this.state.HomeSpecialities}
                selectedItems={this.state.SpecialityKnown}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText="Search Speciality..."
                onChangeInput={text => console.log(text)}
                displayKey="name"
                styleDropdownMenu={{backgroundColor:'#000'}}
                selectText="Pick Speciality"
                styleMainWrapper={{backgroundColor:'#fff' , borderRadius:4 , marginTop:10   }}
                styleDropdownMenuSubsection={{backgroundColor:'#fff' , paddingRight:-7   , height:55 , paddingLeft:10  , borderWidth:0.6 , borderColor:'#fff' , borderColor:'#dddddd' , borderRadius:4}}
                submitButtonText="Submit"
              />
            </View>
          <View
            style={{
              borderWidth: 0.6,margin:10, borderRadius: 4, borderColor: '#dddddd'
            }}
          >
          <TextInput
              style={{ fontSize: 15, padding: 5, height: 40, color: '#323232' }}
              underlineColorAndroid="transparent"
              name="Type Your Query*"
              placeholder="Type Your Query*"
              placeholderTextColor="#807f7f"
              onChangeText={Title => this.setState({ Title })}
            />
            </View>
            <View
            style={{
              
               height:150,
              borderWidth: 0.6 , margin:10, borderRadius: 4, borderColor: '#dddddd'
            }}
          >
<TextInput
multiline={true}
              style={{ fontSize: 15 , height:150, padding: 5, height: 40, color: '#323232' }}
              underlineColorAndroid="transparent"
              name="Type Your Query Detail*"
              placeholder="Type Your Query Detail*"
              placeholderTextColor="#807f7f"
              onChangeText={Description => this.setState({ Description })}
            />
            </View>
            
          </ScrollView>
          </View>
      
         
            <TouchableOpacity
                  onPress={this.submitQuestion}
                  style={styles.buttonHover}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                      top: 18
                    }}>
                    Ask Free Query
                  </Text>
                </TouchableOpacity>
        </View>
          
        
        </RBSheet>
      </View>
      
    );
  }
}
export default  withNavigation(GetAnswers);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f7f7f7"
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
