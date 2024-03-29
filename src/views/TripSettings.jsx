import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  isEnabled,
  Switch
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { f_25, bold, img_url, api_url, change_driver_settings, get_driver_settings, loader, payment_methods, app_name, wallet, f_xs, f_s, f_m, f_xl, f_30, regular } from '../config/Constants';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const TripSettings = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [shared_status, setSharedStatus] = useState(false); 

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      call_get_driver_settings();
  });

  return (
      unsubscribe
  );
  }, []);

  const go_back = () => {
    navigation.goBack();
  }
  
  axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    //console.log("loading")
    setLoading(true);
    setSharedStatus(true);
    return config;
    }, function (error) {
          //console.log(error)
          setLoading(false);
          console.log("finish loading")
          // Do something with request error
        return Promise.reject(error);
})
  call_get_driver_settings = async () => {
   
    await axios({
      method: 'post', 
      url: api_url + get_driver_settings,
      data: {driver_id: global.id}
    })
    .then(async response => {
      setLoading(false);
      if( response.data.data.shared_ride_status == 1){
        setSharedStatus(true);
      }if(response.data.data.shared_ride_status == 0){
        setSharedStatus(false);
      }
    })
    .catch(error => {
      setLoading(false);
      alert('Sorry something went wrong');
    });
  }

  shared_toggleSwitch = (value) => {
    if(value){
      setSharedStatus(value)
      call_change_driver_settings(1);
    }else{
      setSharedStatus(value)
      call_change_driver_settings(0);
    }  
  }

  const call_change_driver_settings = (status) => {
    setLoading(true);
    axios({
        method: 'post',
        url: api_url + change_driver_settings,
        data: { id: global.id, shared_ride_status: status}
    })
    .then(async response => {
      setLoading(false);
      if(response.data.data == 0){
        setSharedStatus(false)
        call_get_driver_settings();
      }else if(response.data.data == 1){
        setSharedStatus(true)
        call_get_driver_settings();
      }
    })
    .catch(error => {
        setLoading(false);
        alert('Sorry something went wrong')
    });
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.lite_bg, flex: 1 }}>
      <StatusBar
        backgroundColor={colors.theme_bg}
      />
      <View style={[styles.header]}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_three, fontSize: f_xl, fontFamily: bold }}>Trip Settings</Text>
        </View>
      </View>
      <View style={{ backgroundColor: colors.theme_bg_three, padding: 10, margin: 10, borderRadius: 10, borderWidth:1, borderColor: colors.theme_bg }}>
        <View style={{ flexDirection:'row', width:'100%', padding:10}}>
          <View style={{width:'70%'}}>
              <Text style={{ fontFamily:bold, fontSize:18, color:colors.theme_fg_two}}>Enable Shared ride status</Text>
          </View>
          <View style={{width:'30%'}}>
            <Switch
                trackColor={{ false: "#C0C0C0", true: "#fcdb00" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={shared_toggleSwitch}
                value={shared_status}
            /> 
          </View>
      </View>
      {loading == true &&
        <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
          <LottieView style={{flex: 1}} source={loader} autoPlay loop />
        </View>
      }
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: colors.theme_bg,
    flexDirection: 'row',
    alignItems: 'center'
},
});

export default TripSettings;