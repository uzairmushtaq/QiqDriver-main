//Fixed
import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, regular, api_url, get_about, logo, f_25, f_m, f_l, f_s, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';

const AboutUs = (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [on_load, setOnLoad] = useState(0);
    const [data, setData] = useState("");

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        call_get_about();
    }, []);

    const call_get_about = () => {
        setLoading(true);
        axios({
            method: 'post',
            url: api_url + get_about,
            data: { lang: global.lang }
        })
            .then(async response => {
                setLoading(false);
                setData(response.data.result)
                setOnLoad(1);
            })
            .catch(error => {
                setLoading(false);
                alert('Sorry something went wrong')
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.theme_bg}
            />
            <View style={[styles.header]}>
          <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
            <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize: 30 }} />
          </TouchableOpacity>
          <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_three, fontSize: f_xl, fontFamily: bold }}>About Us</Text>
          </View>
        </View>
            <ScrollView>
                <View style={{ margin: 10 }} />
                {on_load == 1 &&
                    <View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 120, width: 120 }} >
                                <Image style={{ height: undefined, width: undefined, flex: 1 }} source={logo} />
                            </View>
                            <View style={{ margin: 10 }} />
                            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, fontFamily: regular }}>
                                Version {data.app_version}
                            </Text>
                        </View>
                        <View style={{ margin: 10 }} />
                        <View style={{ backgroundColor: colors.theme_bg_three, padding: 10, margin: 10, borderRadius: 10 }}>
                            <View style={{ margin: 10 }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_l, fontFamily: bold }}>Who we are?</Text>
                                <View style={{ margin: 5 }} />
                                <Text style={{ color: colors.grey, fontSize: f_s, fontFamily: regular }}>
                                    {data.about_us}
                                </Text>
                            </View>
                            <View style={{ margin: 10 }} />
                            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon type={Icons.MaterialIcons} name="phone" color={colors.theme_fg_two} style={{ fontSize: 20 }} />
                                </View>
                                <View style={{ width: '80%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ color: colors.theme_fg_two, fontSize: f_m, fontFamily: regular }}>
                                        {data.phone_number}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon type={Icons.MaterialIcons} name="email" color={colors.theme_fg_two} style={{ fontSize: 20 }} />
                                </View>
                                <View style={{ width: '80%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ color: colors.theme_fg_two, fontSize: f_m, fontFamily: regular }}>
                                        {data.email}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon type={Icons.Entypo} name="address" color={colors.theme_fg_two} style={{ fontSize: 20 }} />
                                </View>
                                <View style={{ width: '80%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ color: colors.theme_fg_two, fontSize: f_m, fontFamily: regular }}>
                                        {data.address}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ margin: 10 }} />
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: colors.theme
    },
    header: {
        height: 60,
        backgroundColor: colors.theme_bg,
        flexDirection: 'row',
        alignItems: 'center'
      },
});

export default AboutUs;