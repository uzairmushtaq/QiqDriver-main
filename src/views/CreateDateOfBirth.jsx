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
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { normal, bold, regular, month_names, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { updateDateOfBirth } from '../actions/RegisterActions';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateDateOfBirth = (props) => {
    const navigation = useNavigation();
    const [date_of_birth, setDateOfBirth] = useState('');
    const [dob_label, setDobLable] = useState('Click and select the date');
    const [is_date_picker_visible, setDatePickerVisibility] = useState(false);
    let alt = useRef(
        (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
    );
    const inputRef = useRef();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {

    }, []);

    const check_valid = () => {
        if (date_of_birth) {
            navigate();
        } else {
            alt({
                type: DropdownAlertType.Error,
                title: 'Validation error',
                message: 'Please select your date of birth',
              });
           
        }
    }

    const navigate = async () => {
        props.updateDateOfBirth(date_of_birth);
        navigation.navigate('CreatePassword');
    }

    
    const show_date_picker = () => {
        setDatePickerVisibility(true);
    };

    const hide_date_picker = () => {
        setDatePickerVisibility(false);
    };

    const handle_confirm = (date) => {
        console.warn("A date has been picked: ", date);
        hide_date_picker();
        set_default_date(new Date(date), 1);
    };

    const set_default_date = async (currentdate) => {
        let datetime =
            (await (currentdate.getDate() < 10 ? "0" : "")) +
            currentdate.getDate() +
            "-" +
            (currentdate.getMonth() + 1 < 10 ? "0" : "") +
            (currentdate.getMonth() + 1) +
            "-" +
            currentdate.getFullYear();
        let label =
            (await (currentdate.getDate() < 10 ? "0" : "")) +
            currentdate.getDate() +
            " " +
            month_names[currentdate.getMonth()] +
            ", " + currentdate.getFullYear();
        setDobLable(label);
        setDateOfBirth(datetime);
    };

    const date_picker = () => {
        return (
            <DateTimePickerModal
                isVisible={is_date_picker_visible}
                mode="date"
                date={new Date()}
                maximumDate={new Date(Date.now() + 10 * 60 * 1000)}
                is24Hour={false}
                onConfirm={handle_confirm}
                onCancel={hide_date_picker}
            />
        )
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
                <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_xl, fontFamily: bold }}>Enter your date of birth</Text>
                <View style={{ margin: 5 }} />
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: normal }}>You need enter your date of birth</Text>
                <View style={{ margin: 20 }} />
                <View style={{ width: '80%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                            <Icon type={Icons.MaterialIcons} name="event" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={show_date_picker.bind(this)} style={{ width: '75%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                            <TextInput
                                ref={inputRef}
                                secureTextEntry={false}
                                placeholder="Licence Number"
                                value={dob_label}
                                editable={false}
                                placeholderTextColor={colors.grey}
                                style={styles.textinput}
                                onChangeText={TextInputValue =>
                                    setDateOfBirth(TextInputValue)}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 30 }} />
                    <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Next</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <DropdownAlert alert={func => (alt = func)} />
            {date_picker()}
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
    updateDateOfBirth: (data) => dispatch(updateDateOfBirth(data)),
});

export default connect(null, mapDispatchToProps)(CreateDateOfBirth);