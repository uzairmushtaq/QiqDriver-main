import React, { useState, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { connect } from 'react-redux';
import axios from 'axios';
import { bold, regular, api_url, vehicle_update, btn_loader, f_xl, f_xs, f_m } from '../config/Constants';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import LottieView from 'lottie-react-native';

const VehicleDetails = (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [is_enabled, setEnabled] = useState(true);
   
    let alt = useRef(
        (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
    );


    const go_back = () => {
        navigation.goBack();
    }

    const navigate = (route) => {
        navigation.navigate(route);
    }

    const call_vehicle_update = async () => {
        setLoading(true);
        await axios({
            method: 'post',
            url: api_url + vehicle_update,
            data: {
                driver_id: global.id, vehicle_type: props.vehicle_type, brand: props.vehicle_brand,
                color: props.vehicle_color, vehicle_name: props.vehicle_name, vehicle_number: props.vehicle_number
            }
        })
            .then(async response => {
console.log(response.data)
setLoading(false);
                navigate_doc();
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

    const navigate_doc = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "VehicleDocument" }],
            })
        );
    }

    const check_validate = async () => {
        if (props.vehicle_brand == "" || props.vehicle_color == "" ||
            props.vehicle_name == "" ||
            props.vehicle_type == "" || props.vehicle_number == "") {
                alt({
                    type: DropdownAlertType.Error,
                    title: 'Error',
                    message: 'Please enter all the required fields',
                  });
        } else {
            call_vehicle_update();
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
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: colors.theme_fg_two, fontSize: f_xl, fontFamily: bold }}>Add Your Vehicle</Text>
                    <View style={{ margin: 20 }} />
                    <View style={{ width: '90%' }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: colors.text_grey, fontSize: f_xs, fontFamily: bold }}>Vehicle Name</Text>
                            <View style={{ margin: 5 }} />
                            <TouchableOpacity activeOpacity={1} onPress={navigate.bind(this, 'CreateVehicleName')} style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                                    <Icon type={Icons.MaterialIcons} name="drive-file-rename-outline" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                                </View>
                                <View style={{ width: '85%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                                    <TextInput
                                        editable={false}
                                        value={props.vehicle_name}
                                        placeholderTextColor={colors.grey}
                                        style={styles.textinput}
                                        placeholder="Vehicle Name"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: colors.text_grey, fontSize: f_xs, fontFamily: bold }}>Vehicle Brand</Text>
                            <View style={{ margin: 5 }} />
                            <TouchableOpacity activeOpacity={1} onPress={navigate.bind(this, 'CreateVehicleBrand')} style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                                    <Icon type={Icons.MaterialIcons} name="branding-watermark" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                                </View>
                                <View style={{ width: '85%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                                    <TextInput
                                        editable={false}
                                        value={props.vehicle_brand}
                                        placeholderTextColor={colors.grey}
                                        style={styles.textinput}
                                        placeholder="Vehicle Brand"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: colors.text_grey, fontSize: f_xs, fontFamily: bold }}>Vehicle Color</Text>
                            <View style={{ margin: 5 }} />
                            <TouchableOpacity activeOpacity={1} onPress={navigate.bind(this, 'CreateVehicleColor')} style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                                    <Icon type={Icons.Ionicons} name="color-palette" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                                </View>
                                <View style={{ width: '85%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                                    <TextInput
                                        editable={false}
                                        value={props.vehicle_color}
                                        placeholderTextColor={colors.grey}
                                        style={styles.textinput}
                                        placeholder="Vehicle Color"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: colors.text_grey, fontSize: f_xs, fontFamily: bold }}>Vehicle Number</Text>
                            <View style={{ margin: 5 }} />
                            <TouchableOpacity activeOpacity={1} onPress={navigate.bind(this, 'CreateVehicleNumber')} style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                                    <Icon type={Icons.Octicons} name="number" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                                </View>
                                <View style={{ width: '85%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                                    <TextInput
                                        editable={false}
                                        value={props.vehicle_number}
                                        placeholderTextColor={colors.grey}
                                        style={styles.textinput}
                                        placeholder="Vehicle Number"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: colors.text_grey, fontSize: f_xs, fontFamily: bold }}>Vehicle Type</Text>
                            <View style={{ margin: 5 }} />
                            <TouchableOpacity activeOpacity={1} onPress={navigate.bind(this, 'CreateVehicleType')} style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
                                    <Icon type={Icons.FontAwesome} name="car" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                                </View>
                                <View style={{ width: '85%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
                                    <TextInput
                                        editable={false}
                                        value={props.vehicle_type_lbl}
                                        placeholderTextColor={colors.grey}
                                        style={styles.textinput}
                                        placeholder="Vehicle Type"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {loading == false ?
                <TouchableOpacity activeOpacity={1} onPress={check_validate.bind(this)} style={{ width: '90%', position: 'absolute', bottom: 20, marginLeft: '5%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Done</Text>
                </TouchableOpacity>
            :
                <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
                    <LottieView style={{ flex:1 }} source={btn_loader} autoPlay loop />
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

function mapStateToProps(state) {
    return {
        vehicle_name: state.vehicle.vehicle_name,
        vehicle_brand: state.vehicle.vehicle_brand,
        vehicle_color: state.vehicle.vehicle_color,
        vehicle_number: state.vehicle.vehicle_number,
        vehicle_type: state.vehicle.vehicle_type,
        vehicle_type_lbl: state.vehicle.vehicle_type_lbl,
    };
}

export default connect(mapStateToProps, null)(VehicleDetails);