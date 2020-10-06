import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar, FlatList, ScrollView, Text, Picker, Image, ActivityIndicator, Alert, TextInput, ImageBackground } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class ArticleListCard extends Component {
   

    render() {


        return (
            <View style={styles.container}>
                <View style={{
                   backgroundColor: '#fff' , borderRadius:4 , overflow:'hidden' ,alignSelf:'center'
                }}>
                    <View style={{ flexDirection: 'row', width: '100%'  , justifyContent:"center" , alignContent:'center'}}>
                        <View style={{ width: "30%" }}>
                            <Image resizeMode={'cover'} style={{ height: 150 }}
                                source={this.props.image}
                            />
                        </View>
                        <View style={{ width: "70%", flexDirection: 'column', padding: 15 , justifyContent:'center' }}>
                            <View>
                                <Text style={{color:'#55acee' , fontSize:13 , }}>{this.props.category}</Text>
                            </View>
                            <View>
                                <Text numberOfLines={2} style={{color:'#3d4461' , fontSize:17 , fontWeight:'700'}}>{this.props.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop:5}}>
                                <Text style={{color:'#767676' , fontSize:13 , }}>{this.props.date}</Text>
                                <Text style={{color:'#767676' , fontSize:13 , }}>{this.props.view}</Text>
                            </View>
                            <View
                            style={{
                                marginTop:12 , marginBottom:12 ,
                                borderBottomColor: '#dddddd',
                                borderBottomWidth: 0.6,
                            }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'#55acee' , fontSize:15 , }}>Edit</Text>
                                <Text style={{color:'#fe736e' , fontSize:15 , marginLeft:20}}>Delete</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
export default withNavigation(ArticleListCard);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius:4,
        overflow:'hidden',
        elevation:3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowColor: "#000",
        marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5,
        justifyContent:'center'
    },
 

});
