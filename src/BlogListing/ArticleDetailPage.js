import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator, Dimensions, Text, Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import { thisExpression } from "@babel/types";
import * as CONSTANT from '../Constants/Constant';
import HTML from 'react-native-render-html';
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class ArticleDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            selectedItems: [],
            SpecialityKnown: [],
            Title: '',
            Description: '',
            Search: '',
            Refresh: false,
        };
    }
    componentDidMount() {
       this.fetchArticleDetail();
    }
    fetchArticleDetail = async () => {
        const { params } = this.props.navigation.state;
        const response = await fetch(
            CONSTANT.BaseUrl +
            "listing/get_sinle_article?post_id=" + params.itemId
        );
        const json = await response.json();
        if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
            this.setState({ detailArticle: [], isLoading: false }); // empty data set 
        } else {
            this.setState({ detailArticle: json, isLoading: false });
        }
    };
    render() {
        const { isLoading } = this.state;
        return (
            <View>
                <CustomHeader headerText={'Detail Article'} />
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
                <ScrollView style={{ marginBottom: 50 }}>
                    {this.state.detailArticle &&
                        <Image
                            resizeMode="cover" style={{ height: 300, width: '100%', }}
                            source={{ uri: `${this.state.detailArticle[0].image_url}` }}
                        />
                    }
                    <View style={{ marginRight: 10, marginBottom: 10 }}>
                        {this.state.detailArticle &&
                            <Text numberOfLines={2} style={{ color: '#3d4461', fontSize: 20, fontWeight: '700', margin: 10 }}>
                                {`${entities.decode(this.state.detailArticle[0].title)}`}
                            </Text>
                        }
                        {this.state.detailArticle &&
                            <Text numberOfLines={2} style={{ color: '#767676', fontSize: 15, marginLeft: 10 }}>
                                {`${entities.decode(this.state.detailArticle[0].user_date)}`}
                            </Text>
                        }

                        {this.state.detailArticle &&
                            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                <HTML lineHeight={20} html={this.state.detailArticle[0].post_content} imagesMaxWidth={Dimensions.get('window').width} />
                            </View>

                        }


                        {this.state.detailArticle &&


                            <View activeOpacity={.7} style={{
                                flex: 1,
                                backgroundColor: '#ffffff',
                                marginTop: 2,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowColor: "#000",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 5,
                                borderRadius: 4,
                                marginBottom: 25,
                                overflow: 'hidden'
                            }}>
                                <View style={styles.mainLayoutServices}>
                                    <View style={{
                                        flexDirection: 'row', marginLeft: 10,
                                        marginRight: 10, marginTop: 10, paddingRight: 10
                                    }}>
                                        <View style={{ borderRadius: 4, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                                            {this.state.detailArticle &&
                                                <Image
                                                    style={{ width: 60, height: 60, borderRadius: 4, }}
                                                    source={{ uri: `${this.state.detailArticle[0].user_image}` }}
                                                />
                                            }

                                        </View>

                                        <View style={{ flexDirection: "column", justifyContent: 'center' }}>
                                            {this.state.detailArticle &&
                                                <Text style={{
                                                    color: '#484848',
                                                    fontSize: 16,
                                                    marginLeft: 10,
                                                    fontWeight: '700',
                                                    marginRight: 10,
                                                }}>{this.state.detailArticle[0].user_name}</Text>
                                            }
                                            {
                                                this.state.detailArticle &&
                                                <Text style={{
                                                    color: '#3d4461',
                                                    fontSize: 13,
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                }}>{this.state.detailArticle[0].user_date}</Text>
                                            }

                                        </View>
                                    </View>
                                    {
                                        this.state.detailArticle &&
                                        <Text style={{
                                            color: '#484848',
                                            fontSize: 13,
                                            lineHeight: 20,
                                            marginTop: 10,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            marginBottom: 10
                                        }}> {`${entities.decode(this.state.detailArticle[0].user_contents)}`}</Text>

                                    }

                                </View>
                            </View>
                        }
                    </View>

                </ScrollView>
            </View>
        );
    }
}
export default withNavigation(ArticleDetailPage);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },


});
