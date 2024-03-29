import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TextInput,
    StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { normal, bold, regular, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import { updatePhoneNumber, updatePhoneWithCode, updateCountryCode } from '../actions/RegisterActions';
import { connect } from 'react-redux';
const OTP = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [otp, setOtp] = useState(route.params.otp);
    const [phone_number, setPhoneNumber] = useState(route.params.phone_number);
    const [country_code, setCountryCode] = useState(route.params.country_code);
    const [phone_with_code, setPhoneWithCode] = useState(route.params.phone_with_code);
    const [from, setFrom] = useState(route.params.from);
    const [id, setId] = useState(route.params.id);
    const [value, setValue] = useState("");
    let alt = useRef(
        (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
      );
    const inputRef = useRef();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        if (global.mode == 'DEMO') {
            setTimeout(() => {
                check_valid(otp);
            }, 1000)
        } else {
            //this.start_timer()
        }
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);

    const check_valid = (val) => {
        if (val != otp) {
            alt({
                type: DropdownAlertType.Error,
                title: 'Validation error',
                message: 'Please enter valid OTP',
              });
            
        } else {
            navigate();
        }
    }

    const navigate = async () => {
        if (from == "register") {
            props.updatePhoneNumber(phone_number);
            props.updatePhoneWithCode(phone_with_code);
            props.updateCountryCode(country_code);
            navigation.navigate('CreateName');
        } else if (from == "forgot") {
            navigation.navigate('ResetPassword', { id: id });
        } else if (from == "profile") {
            go_back();
        }
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
                <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_xl, fontFamily: bold }}>Enter the OTP</Text>
                <View style={{ margin: 5 }} />
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: normal }}>Enter your OTP received from the SMS</Text>
                <View style={{ margin: 20 }} />
                <View style={{ width: '80%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                            <Icon type={Icons.MaterialIcons} name="dialpad" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                        </View>
                        <View style={{ width: '75%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                            <TextInput
                                ref={inputRef}
                                secureTextEntry={false}
                                placeholder="OTP"
                                keyboardType='numeric'
                                placeholderTextColor={colors.grey}
                                style={styles.textinput}
                                onChangeText={TextInputValue =>
                                    setValue(TextInputValue)}
                            />
                        </View>
                    </View>
                    <View style={{ margin: 30 }} />
                    <TouchableOpacity onPress={check_valid.bind(this, value)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
        fontSize: f_m,
        color: colors.grey,
        fontFamily: regular,
        height: 60,
        backgroundColor: colors.text_container_bg,
        width: '100%'
    },
});


const mapDispatchToProps = (dispatch) => ({
    updatePhoneNumber: (data) => dispatch(updatePhoneNumber(data)),
    updatePhoneWithCode: (data) => dispatch(updatePhoneWithCode(data)),
    updateCountryCode: (data) => dispatch(updateCountryCode(data)),
});

export default connect(null, mapDispatchToProps)(OTP);