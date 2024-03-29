import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, normal, bold, btn_loader, withdrawal_history, wallet_icon, withdrawal_icon, withdrawal_request, api_url, f_s, f_tiny, f_xl, f_35, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropShadow from "react-native-drop-shadow";
import axios from 'axios';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from 'react-native-dropdownalert';
import Moment from 'moment';
import DialogInput from 'react-native-dialog-input';
import LottieView from 'lottie-react-native';

const Withdrawal = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [w_amount, setWAmount] = useState(0);
  const [dialog_status, setDialogStatus] = useState(false);
  const [on_load, setOnLoad] = useState(0);

  let alt = useRef(
    (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
  );

  const go_back = () => {
    navigation.goBack();
  }

  useEffect(() => {
    call_withdrawal_history();
  }, []);

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
})

  const call_withdrawal_history = () => {
    axios({
      method: 'post',
      url: api_url + withdrawal_history,
      data: { id: global.id, lang: global.lang }
    })
      .then(async response => {
        setWAmount(response.data.result.wallet_amount)
        setData(response.data.result.withdraw)
        setLoading(false);
        setOnLoad(1);
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

  const showDialog = (val) => {
    setDialogStatus(val);
  }

  const sendInput = (val) => {
    setDialogStatus(false);
    if (isNaN(val) || val == 0 || val == null) {
      alt({
        type: DropdownAlertType.Error,
        title: 'Validation error',
        message: 'Please enter valid amount',
      });
      
    } else if (val > w_amount) {
      alt({
        type: DropdownAlertType.Error,
        title: 'Validation error',
        message: 'Your maximum wallet balance is ' + w_amount,
      });
      
    } else {
      call_withdrawal_request(val);
    }
  }

  const call_withdrawal_request = (val) => {
    
    axios({
      method: 'post',
      url: api_url + withdrawal_request,
      data: { driver_id: global.id, amount: val }
    })
      .then(async response => {
        if (response.data.status == 1) {
          call_withdrawal_history();
        } else {
          alt({
            type: DropdownAlertType.Error,
            title: 'Validation error',
            message: response.data.message,
          });
         
        }
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

  const validate_amount = () => {
    if (w_amount > 0) {
      setDialogStatus(true);
    } else {
      alt({
        type: DropdownAlertType.Error,
        title: 'Validation error',
        message: 'Your balance is low',
      });
    
    }
  }

 

  const show_list = ({ item }) => (
    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 20 }}>
      <View style={{ width: '15%' }}>
        <View style={{ height: 30, width: 30 }}>
          <Image source={withdrawal_icon} style={{ height: undefined, width: undefined, flex: 1 }} />
        </View>
      </View>
      <View style={{ width: '55%', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_s, fontFamily: normal }}>{item.name}</Text>
        <View style={{ margin: 2 }} />
        <Text numberOfLines={1} style={{ color: colors.text_grey, fontSize: f_tiny, fontFamily: normal }}>{Moment(item.created_at).fromNow()}</Text>
      </View>
      <View style={{ width: '30%', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_s, fontFamily: normal }}>{global.currency}{item.amount}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={{ backgroundColor: colors.lite_bg, flex: 1 }}>
      <StatusBar
        backgroundColor={colors.btn_color}
      />
      <ScrollView>
        <View style={[styles.header]}>
          <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
            <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize: 30 }} />
          </TouchableOpacity>
          <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_three, fontSize: f_xl, fontFamily: bold }}>Withdrawal</Text>
          </View>
        </View>
        <View style={{ margin: 10 }} />
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
            marginLeft: '5%',
          }}
        >
          <View style={{ backgroundColor: colors.theme_bg_three, width: '100%', padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexDirection: 'row' }}>
            <View style={{ width: '20%', justifyContent: 'center' }}>
              <View style={{ height: 60, width: 60 }}>
                <Image source={wallet_icon} style={{ height: undefined, width: undefined, flex: 1 }} />
              </View>
            </View>
            <View style={{ width: '5%' }} />
            <View style={{ width: '75%', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text numberOfLines={1} style={{ color: colors.text_grey, fontSize: f_s, fontFamily: normal }}>Current balance</Text>
              <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_35, fontFamily: bold, marginTop: 10, marginBottom: 10 }}>{global.currency}{w_amount}</Text>
            </View>
          </View>
          <View style={{ margin: 15 }} />
          <View style={{ backgroundColor: colors.theme_bg_three, width: '100%', padding: 20, justifyContent: 'center', borderRadius: 10 }}>
            <Text numberOfLines={1} style={{ color: colors.text_grey, fontSize: f_s, fontFamily: normal }}>Withdrawal Histories</Text>
            <View style={{ margin: 10 }} />
            {on_load == 1 &&
            <FlatList
              data={data}
              renderItem={show_list}
              keyExtractor={item => item.id}
            />
            }
          </View>
        </DropShadow>
      </ScrollView>
      <View style={{ margin:40}}/>
      <DialogInput isDialogVisible={dialog_status}
        title="Verification"
        message="Please enter your amount"
        hintInput="Enter amount"
        textInputProps={{ keyboardType: "numeric" }}
        submitInput={(inputText) => { sendInput(inputText) }}
        closeDialog={() => { showDialog(false) }}
        submitText="Submit"
        cancelText="Cancel">
      </DialogInput>
      {loading == false ?
        <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={validate_amount.bind(this)} activeOpacity={1} style={{ width: '90%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Submit</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
          <LottieView style={{flex: 1}}source={btn_loader} autoPlay loop />
        </View>
      }
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
    backgroundColor: colors.theme_bg,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default Withdrawal;

