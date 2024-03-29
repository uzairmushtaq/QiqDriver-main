import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, normal, no_data, bold, loader, distance_icon, earnings, api_url, left_arrow, right_arrow, f_s, f_tiny, f_xl, f_35 } from '../config/Constants';
import DropShadow from "react-native-drop-shadow";
import CalendarStrip from 'react-native-calendar-strip';
import axios from 'axios';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from 'react-native-dropdownalert';
import LottieView from 'lottie-react-native';
import Icon, { Icons } from '../components/Icons';
import Moment from 'moment';

const Earnings = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [current_date, setCurrentDate] = useState(Date());
  const [data, setData] = useState([]);
  const [today_earning, setTodayEarning] = useState(0);
  let alt = useRef(
    (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
  );

  const go_back = () => {
    navigation.goBack();
  }

  useEffect(() => {
    date_change(Date());
  }, []);

  const date_change = (date) => {
    let d = new Date(date);
    call_get_earnings(d.getFullYear()+ '-' + (d.getMonth()+1) + '-' + d.getDate());
  }
  
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
  const call_get_earnings = (date) => {
    
    axios({
        method: 'post',
        url: api_url + earnings,
        data: { date: date, id : global.id }
    })
    .then(async response => {
        setData(response.data.result.earnings)
        setTodayEarning(response.data.result.today_earnings)
        setLoading(false);
    })
    .catch(error => {
        setLoading(false);
        alt({
          type: DropdownAlertType.Error,
          title: 'Validation error',
          message: 'Sorry something went wrong',
        });
        
    });
  }
  
  const show_list = ({ item }) => (
    <View style={{ flexDirection:'row', width:'100%', marginBottom:20}}>
      <View style={{ width:'15%'}}>
        <View style={{ height:30, width:30}}>
          <Image source={distance_icon} style={{ height:undefined, width:undefined, flex:1}} />
        </View>
      </View>
      <View style={{ width:'55%', justifyContent:'center'}}>
        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_s, fontFamily:normal }}>#{item.trip_id}</Text>
        <View style={{ margin:2 }} />
        <Text numberOfLines={1} style={{ color: colors.text_grey, fontSize: f_tiny, fontFamily:normal }}>{Moment(item.created_at).format("hh:mm A")}</Text>
      </View>
      <View style={{ width:'30%', alignItems:'flex-end', justifyContent:'center'}}>
        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_s, fontFamily:normal }}>{global.currency}{item.amount}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView
      style={{flex: 1 ,width: '100%', height: '100%'}}
    > 
      <StatusBar
          backgroundColor={colors.theme_bg}
      />
        <ScrollView>
        <View style={[styles.header]}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_three, fontSize: f_xl, fontFamily: bold }}>Earnings</Text>
        </View>
      </View>
          <View style={{ backgroundColor:colors.theme_bg, flex:1}}>
            <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 100}}
                    calendarHeaderStyle={{color: colors.theme_fg_three}}
                    calendarColor={colors.theme_bg}
                    dateNumberStyle={{color: colors.theme_fg_three}}
                    dateNameStyle={{color: colors.theme_fg_three}}
                    highlightDateNumberStyle={{color: colors.theme_fg_three}}
                    highlightDateNameStyle={{color: colors.theme_fg_three}}
                    disabledDateNameStyle={{color: colors.grey}}
                    disabledDateNumberStyle={{color: colors.grey}}
                    iconLeft={left_arrow}
                    iconRight={right_arrow}
                    scrollable={true}
                    onDateSelected={date_change}
                    selectedDate={current_date}
                    iconContainer={{flex: 0.1}}
              />
          </View>
          <View style={{ margin:10 }} />
          <DropShadow
              style={{
                  width: '90%',
                  marginBottom: 5,
                  marginTop: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                      width: 0,
                      height: 0,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  marginLeft:'5%',
              }}
            >
              <View style={{ backgroundColor:colors.theme_bg_three, width:'100%', padding:20, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text numberOfLines={1} style={{ color: colors.text_grey, fontSize: f_s, fontFamily:normal }}>Total Earnings</Text>
                <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_35, fontFamily:bold, margin:10 }}>{global.currency}{today_earning}</Text>
              </View>
              <View style={{ margin:10 }} />
              <View style={{ backgroundColor:colors.theme_bg_three, width:'100%', padding:20, justifyContent:'center', borderRadius:10}}>
                <Text numberOfLines={1} style={{ color: colors.text_grey, fontSize: f_s, fontFamily:normal }}>Trip Histories</Text>
                <View style={{ margin:10 }} />
                {loading == true ?
                  <View style={{ height: 100, width: 100, alignSelf: 'center', marginTop: '30%' }}>
                      <LottieView style={{flex: 1}} source={loader} autoPlay loop />
                  </View>
                :
                  <View>
                    {data.length != 0 ?
                      <FlatList
                        data={data}
                        renderItem={show_list}
                        keyExtractor={item => item.id}
                      />
                    :
                      <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <View style={{ height: 200, width: 200, marginTop:10}}>
                          <Image source={no_data} style={{ height:undefined, width:undefined, flex:1 }} />
                        </View>
                        <View style={{ margin:10 }} />
                        <Text numberOfLines={1} style={{ color: colors.text_grey, fontSize: f_s, fontFamily:normal }}>Sorry no data found</Text>
                      </View>
                    }
                  </View>
                }
              </View>
            </DropShadow>
        </ScrollView>
        <DropdownAlert alert={func => (alt = func)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.lite_bg
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor:colors.theme_bg,
    alignItems: 'center'
  },
});

export default Earnings;

