import React, { useState, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { normal, bold, regular, check_phone, api_url, btn_loader, f_xs, f_m, f_l } from '../config/Constants';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import PhoneInput from 'react-native-phone-input';

const CheckPhone = (props) => {
    const navigation = useNavigation();
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const phone = useRef();
    let alt = useRef(
        (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
    );
    
    axios.interceptors.request.use(async function (config) {
        // Do something before request is sent
        //console.log("loading")
        setLoading(true);
        return config;
    }, function (error) {
          //console.log(error)
          setLoading(false);
          console.log("finish loading")
          // Do something with request error
        return Promise.reject(error);
    });
    const check_valid = () => {
    
        if('+'+phone.current?.getCountryCode() == phone.current?.getValue()){
            setValidation(false)
            //alert('Enter your phone number')
          }else if(!phone.current?.isValidNumber()){
            setValidation(false)
            //alert('Please enter valid phone number')
            alt({
                type: DropdownAlertType.Error,
                title: 'Error',
                message: 'Please enter valid phone number',
              });
            
          }else{
            setValidation(true)
           // alert(phone.current?.getValue())
            setFormattedValue(phone.current?.getValue())
            call_check_phone(phone.current?.getValue());
          }
    }

    const call_check_phone = async (phone_with_code) => {
        console.log({ phone_with_code: phone_with_code })
       
        await axios({
            method: 'post',
            url: api_url + check_phone,
            data: { phone_with_code: phone_with_code }
        })
            .then(async response => {
                setLoading(false);
                navigate(response.data.result);
            })
            .catch(error => {
                setLoading(false);
                console.log(error)
                alt({
                    type: DropdownAlertType.Error,
                    title: 'Error',
                    message: 'Sorry something went wrong.',
                  });
                
            });
    }

    const navigate = async (data) => {
        let phone_number = phone.current?.getValue();
        phone_number = phone_number.replace("+"+phone.current?.getCountryCode(), "");
        if (data.is_available == 1) {
            navigation.navigate('Password', { phone_number: phone.current?.getValue() });
        } else {
            navigation.navigate('OTP', { otp: data.otp, phone_with_code: phone.current?.getValue(), country_code: "+" + phone.current?.getCountryCode(), phone_number: phone_number, id: 0, from: "register" });
        }
    }

    

    return (
        <SafeAreaView style={{ backgroundColor: colors.lite_bg, flex: 1 }}>
            <StatusBar
                backgroundColor={colors.theme_bg}
            />
            <View style={[styles.header]} />
            <View style={{ margin: 20 }} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_l, fontFamily: bold }}>Enter your phone number</Text>
                <View style={{ margin: 5 }} />
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: normal }}>You need enter your phone number</Text>
                <View style={{ margin: 20 }} />
                <View style={{ width: '80%' }}>
                    <PhoneInput style={{ borderBottomColor: colors.theme_bg_two }}
                        flagStyle={styles.flag_style}
                         ref={phone}
                        initialCountry="in" offset={10}
                        textStyle={styles.country_text}
                        textProps={{
                            placeholder: 'Phone Number',
                            placeholderTextColor: colors.theme_fg_two
                        }}
                        autoFormat={true} />
                    <View style={{ margin: 30 }} />
                    {loading == false ?
                        <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Login / Register</Text>
                        </TouchableOpacity>
                        :
                        <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
                            <LottieView style={{flex: 1}} source={btn_loader} autoPlay loop />
                        </View>
                    }
                </View>

            </View>
            <DropdownAlert alert={func => (alt = func)} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: colors.lite_bg,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textinput: {
        fontSize: f_l,
        color: colors.grey,
        fontFamily: regular,
        height: 60,
        backgroundColor: '#FAF9F6'
    },
    flag_style:{
        width: 38, 
        height: 24
      },
      country_text:{
        fontSize:18, 
        borderBottomWidth:1, 
        paddingBottom:8, 
        height:35,
        fontFamily:regular,
        color:colors.theme_fg_two
      },
});

export default CheckPhone;