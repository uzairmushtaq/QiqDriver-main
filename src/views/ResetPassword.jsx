import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    Image,
    TextInput,
    StatusBar
} from "react-native";
import { useNavigation, CommonActions, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { api_url, reset_password, normal, bold, regular, success_icon, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import axios from 'axios';

const ResetPassword = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(route.params.id);
    const [changed_status, setChangedStatus] = useState(0);
    const [confirm_password, setConfirmPassword] = useState('');
    let alt = useRef(
        (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
      );
    const inputRef = useRef();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);

    axios.interceptors.request.use(async function (config) {
        // Do something before request is sent
        console.log("loading")
        setLoading(true);
        return config;
        }, function (error) {
              console.log(error)
              setLoading(false);
              console.log("finish loading")
              // Do something with request error
            return Promise.reject(error);
    })

    const check_valid = () => {
        if (password) {
            check_password();
        } else {
            alt({
                type: DropdownAlertType.Error,
                title: 'Validation error',
                message: 'Please enter your password',
              });
            
        }
    }

    const check_password = () => {
        if (password == confirm_password) {
            call_reset_password();
        } else {
            alt({
                type: DropdownAlertType.Error,
                title: 'Validation error',
                message: 'Your password and confirm password did not match',
              });
           
        }
    }

    const call_reset_password = async () => {
       
        await axios({
            method: 'post',
            url: api_url + reset_password,
            data: { id: id, password: password }
        })
            .then(async response => {
                setLoading(false);
                setChangedStatus(1);
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

    const navigate = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "CheckPhone" }],
            })
        );
    }

    

    return (
        <SafeAreaView style={{ backgroundColor: colors.lite_bg, flex: 1 }}>
            <StatusBar
                backgroundColor={colors.theme_bg}
            />
            <View style={[styles.header]}>
                {changed_status == 0 &&
                    <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                }
            </View>
            <View style={{ margin: 20 }} />
            {changed_status == 0 ?
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_xl, fontFamily: bold }}>Reset your password</Text>
                    <View style={{ margin: 5 }} />
                    <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: normal }}>Create your new password</Text>
                    <View style={{ margin: 20 }} />
                    <View style={{ width: '80%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                                <Icon type={Icons.MaterialIcons} name="lock" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                            </View>
                            <View style={{ width: '75%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                                <TextInput
                                    ref={inputRef}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.grey}
                                    style={styles.textinput}
                                    onChangeText={TextInputValue =>
                                        setPassword(TextInputValue)}
                                />
                            </View>
                        </View>
                        <View style={{ margin: 10 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                                <Icon type={Icons.MaterialIcons} name="lock" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                            </View>
                            <View style={{ width: '75%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                                <TextInput
                                    ref={inputRef}
                                    placeholder="Confirm Password"
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.grey}
                                    style={styles.textinput}
                                    onChangeText={TextInputValue =>
                                        setConfirmPassword(TextInputValue)}
                                />
                            </View>
                        </View>
                        <View style={{ margin: 30 }} />
                        <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{ color: colors.success, fontSize: f_xl, fontFamily: bold }}>Done!</Text>
                    <View style={{ margin: 5 }} />
                    <Text style={{ color: colors.grey, fontSize: f_xs, fontFamily: normal, textAlign: 'center', width: '80%' }}>Password has been changed successfully</Text>
                    <View style={{ margin: 20 }} />
                    <View style={{ height: 150, width: 150 }}>
                        <Image source={success_icon} style={{ height: undefined, width: undefined, flex: 1 }} />
                    </View>
                    <View style={{ margin: 20 }} />
                    <View style={{ width: '80%' }}>
                        <TouchableOpacity onPress={navigate.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
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
        fontSize: f_m,
        color: colors.grey,
        fontFamily: regular,
        height: 60,
        backgroundColor: colors.text_container_bg,
        width: '100%'
    },
});

export default ResetPassword;