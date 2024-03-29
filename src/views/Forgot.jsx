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
import {colors} from '../../src/assets/css/Colors';
import { normal, bold, regular, forgot_password, api_url, f_l, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import PhoneInput from 'react-native-phone-input';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from 'react-native-dropdownalert';
import axios from 'axios';
// import { Style } from "react-native-paper/lib/typescript/components/List/utils";


const Forgot = (props) => {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const [validation, setValidation] = useState(false);
  const phone = useRef();
  let alt = useRef(
    (_data?: DropdownAlertData) => new Promise < DropdownAlertData > (res => res),
  );

  const go_back = () => {
    navigation.goBack();
  }

  axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
   // console.log("loading")
    setLoading(true);
    return config;
  }, function (error) {
   // console.log(error)
    setLoading(false);
   // console.log("finish loading")
    // Do something with request error
    return Promise.reject(error);
  })

  const check_valid = () => {
    if ('+' + phone.current?.getCountryCode() == phone.current?.getValue()) {
      setValidation(false)
      //alert('Enter your phone number')
    } else if (!phone.current?.isValidNumber()) {
      setValidation(false)
      //alert('Please enter valid phone number')
      alt({
        type: DropdownAlertType.Error,
        title: 'Error',
        message: 'Please enter valid phone number',
      });

    } else {
      setValidation(true)
      // alert(phone.current?.getValue())
      setFormattedValue(phone.current?.getValue())
      call_forgot_password(phone.current?.getValue());
    }
  }

  const call_forgot_password = async (phone_with_code) => {

    await axios({
      method: 'post',
      url: api_url + forgot_password,
      data: { phone_with_code: phone_with_code }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.status == 1) {
          navigate(response.data.result);
        } else {
          alt({
            type: DropdownAlertType.Error,
            title: 'Validation error',
            message: 'Please enter your registered phone number',
          });

        }
      })
      .catch(error => {
        setLoading(false);
        alt({
          type: DropdownAlertType.Error,
          title: 'Error',
          message: 'Sorry something went wrong',
        });

      });
  }

  const navigate = async (data) => {
    console.log({ otp: data.otp, id: data.id, from: "forgot", phone_with_code: phone.current?.getValue(), country_code: "+" + phone.current?.getCountryCode(), phone_number: value })
    navigation.navigate('OTP', { otp: data.otp, id: data.id, from: "forgot", phone_with_code: phone.current?.getValue(), country_code: "+" + phone.current?.getCountryCode(), phone_number: value });
  }



  return (
    <SafeAreaView style={{ backgroundColor: colors.lite_bg, flex: 1 }}>
      <StatusBar
        backgroundColor={colors.theme_bg}
      />
      <View style={[styles.header]}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20 }} />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_l, fontFamily: bold }}>Enter your phone number</Text>
        <View style={{ margin: 5 }} />
        <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: normal }}>Please enter your phone number for reset the password</Text>
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
          <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Next</Text>
          </TouchableOpacity>
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

export default Forgot;