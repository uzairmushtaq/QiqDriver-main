import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar,
    FlatList
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {colors} from '../../src/assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { normal, bold, my_bookings, api_url, img_url, loader, no_data_loader, cancel, f_s, f_xs, f_tiny, f_xl } from '../config/Constants';
import DropShadow from "react-native-drop-shadow";
import { Badge } from 'react-native-paper';
import axios from 'axios';
import Moment from 'moment';
import LottieView from 'lottie-react-native';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

const Bookings = (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(1);
    let alt = useRef(
        (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
    );
    const viewableItems = useSharedValue([]);
    const [cancellation_statuses, setCancellationStatuses] = useState([6, 7]);

    const go_back = () => {
        navigation.goBack();
    }


    useEffect(() => {
        call_my_bookings(filter);
    }, []);
    
    const change_filter = (id) => {
        setFilter(id);
        call_my_bookings(id);
    }
    
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
    });

    const call_my_bookings = (fl) => {
       
        axios({
            method: 'post',
            url: api_url + my_bookings,
            data: { driver_id: global.id, lang: global.lang, filter: fl }
        })
            .then(async response => {
                setTimeout(function () {
                    setLoading(false);
                    setData(response.data.result)
                }, 1000)
            })
            .catch(error => {
                setLoading(false);
                alert('Sorry something went wrong')
            });
    }

    const navigate = (trip_id, status_name) => {
        if (filter == 1) {
            navigation.navigate('Trip', { trip_id: trip_id, from: 'trips' })
        } else if (filter == 2) {
            navigation.navigate('Bill', { trip_id: trip_id, from: 'trips' })
        } else if (filter == 3) {
            alt({
                type: DropdownAlertType.Error,
                title: 'Error',
                message: 'This trip is' + ' ' + status_name,
              });
            
        }
    }

    

    const navigate_home = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
        );
    }

    type ListItemProps = {
        viewableItems: Animated.SharedValue<ViewToken[]>;
        item: {
            id: number;
        };
    };

    const ListItem: React.FC<ListItemProps> = React.memo(
        ({ item, viewableItems }) => {
            const rStyle = useAnimatedStyle(() => {
                const isVisible = Boolean(
                    viewableItems.value
                        .filter((item) => item.isViewable)
                        .find((viewableItem) => viewableItem.item.id === item.id)
                );
                return {
                    opacity: withTiming(isVisible ? 1 : 0),
                    transform: [
                        {
                            scale: withTiming(isVisible ? 1 : 0.6),
                        },
                    ],
                };
            }, []);
            return (
                <Animated.View style={[
                    {
                        width: '100%',
                    },
                    rStyle,
                ]}>
                    <TouchableOpacity activeOpacity={1} onPress={navigate.bind(this, item.id, item.status_name)} style={{ alignItems: 'center', borderRadius: 10, padding: 10 }}>
                        <DropShadow
                            style={{
                                width: '95%',
                                marginBottom: 5,
                                marginTop: 5,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 0,
                                },
                                shadowOpacity: 0.1,
                                shadowRadius: 5,
                            }}
                        >
                            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: colors.theme_bg_three, padding: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                <View style={{ width: '17%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50 }} >
                                        <Image style={{ height: undefined, width: undefined, flex: 1, borderRadius: 10 }} source={{ uri: img_url + item.profile_picture }} />
                                    </View>
                                </View>
                                <View style={{ width: '33%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ color: colors.theme_fg_two, fontSize: f_s, fontFamily: bold }}>{item.driver_name}</Text>
                                    <View style={{ margin: 2 }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon type={Icons.MaterialIcons} name="star" color={colors.warning} style={{ fontSize: 20 }} />
                                        <View style={{ margin: 1 }} />
                                        <Text style={{ color: colors.theme_bg_two, fontSize: f_s, fontFamily: bold }}>{item.customer_rating}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: colors.text_grey, fontSize: f_xs, fontFamily: normal }}>Fare</Text>
                                    <View style={{ margin: 3 }} />
                                    <Text style={{ fontSize: f_s, fontFamily: bold, color: colors.theme_fg_two }}>{global.currency}{item.total}</Text>
                                </View>
                                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: colors.text_grey, fontSize: f_xs, fontFamily: normal }}>Distance</Text>
                                    <View style={{ margin: 3 }} />
                                    <Text style={{ color: colors.theme_fg_two, fontSize: f_s, fontFamily: bold }}>{item.distance} km</Text>
                                </View>
                            </View>
                            <View style={{ bottomBorderWidth: 0.5, borderColor: colors.grey, height: 1 }} />
                            <View style={{ flex: 1, backgroundColor: colors.theme_bg_three, padding: 15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Badge status="success" backgroundColor="green" size={10} />
                                        <View style={{ margin: 5 }} />
                                        {item.actual_pickup_address ?
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: normal }}>{item.actual_pickup_address}</Text>
                                            :
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: normal }}>{item.pickup_address}</Text>
                                        }
                                    </View>
                                    {item.trip_type != 'Rental' &&
                                        <View>
                                            <View style={{ height: 20, borderLeftWidth: 1, marginLeft: 3, borderStyle: 'dotted' }} />
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Badge status="error" backgroundColor="red" size={10}/>
                                                <View style={{ margin: 5 }} />
                                                {item.actual_drop_address ?
                                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: normal }}>{item.actual_drop_address}</Text>
                                                    :
                                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: normal }}>{item.drop_address}</Text>
                                                }
                                            </View>
                                        </View>
                                    }
                                </View>

                                {/*<View style={{ margin:5}}/>
                    <View style={{ width: '30%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ fontSize: f_tiny, fontFamily: normal, color: colors.text_grey }}>{Moment(item.pickup_date).format("hh:mm a")}</Text>
                        <Text style={{ fontSize: f_tiny, fontFamily: normal, color: colors.text_grey }}>{Moment(item.pickup_date).format(" DD-MMM-YYYY")}</Text>
            </View>*/}
                                <View style={{ margin: 5, marginTop: 10, flexDirection: 'row', width: '100%' }}>
                                    <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: f_tiny, fontFamily: normal, color: colors.text_grey }}>{Moment(item.pickup_date).format("DD-MMM-YYYY")}</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: f_tiny, fontFamily: normal, color: colors.text_grey, alignSelf: 'flex-end' }}>{Moment(item.pickup_date).format("hh:mm a")}</Text>
                                    </View>
                                </View>
                            </View>
                        </DropShadow>
                        {cancellation_statuses.includes(parseInt(item.status)) &&
                            <View style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 100, height: 100 }} >
                                    <Image style={{ height: undefined, width: undefined, flex: 1, borderRadius: 10 }} source={cancel} />
                                </View>
                            </View>
                        }
                    </TouchableOpacity>
                </Animated.View>
            );
        }
    );

    const onViewableItemsChanged = ({ viewableItems: vItems }) => {
        viewableItems.value = vItems;
    };

    const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

    return (
        <SafeAreaView style={{ backgroundColor: colors.lite_bg, flex: 1 }}>
        <ScrollView>
            <StatusBar
                backgroundColor={colors.theme_bg}
            />
            <View style={[styles.header]}>
                <View style={{ width: '5%' }} />
                <TouchableOpacity activeOpacity={1} onPress={navigate_home.bind(this)} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xl, fontFamily: bold }}>My Rides</Text>
                </TouchableOpacity>
            </View>
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <DropShadow
                        style={{
                            width: '95%',
                            marginBottom: 5,
                            marginTop: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                        }}
                    >
                        <View style={{ flexDirection: 'row', backgroundColor: colors.theme_bg_three, borderRadius: 10 }}>
                            <TouchableOpacity onPress={change_filter.bind(this, 1)} style={[filter == 1 ? styles.segment_active_bg : styles.segment_inactive_bg]}>
                                <Text style={[filter == 1 ? styles.segment_active_fg : styles.segment_inactive_fg]}>Ongoing</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={change_filter.bind(this, 2)} style={[filter == 2 ? styles.segment_active_bg : styles.segment_inactive_bg]}>
                                <Text style={[filter == 2 ? styles.segment_active_fg : styles.segment_inactive_fg]}>Completed</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={change_filter.bind(this, 3)} style={[filter == 3 ? styles.segment_active_bg : styles.segment_inactive_bg]}>
                                <Text style={[filter == 3 ? styles.segment_active_fg : styles.segment_inactive_fg]}>Cancelled</Text>
                            </TouchableOpacity>
                        </View>
                    </DropShadow>
                </View>  
                {loading == true ?
                    <View style={{ height: 100, width: 100, alignSelf: 'center', marginTop: '30%' }}>
                        <LottieView style={{flex: 1}} source={loader} autoPlay loop />
                    </View>
                    :
                    <View>
                        {data.length > 0 ?
                            <FlatList
                                data={data}
                                contentContainerStyle={{ paddingTop: 20 }}
                                viewabilityConfigCallbackPairs={
                                    viewabilityConfigCallbackPairs.current
                                }
                                renderItem={({ item }) => {
                                    return <ListItem item={item} viewableItems={viewableItems} />;
                                }}
                            />
                            :
                            <View style={{ height: 300, width: 300, alignSelf: 'center', marginTop: '30%' }}>
                                <LottieView source={no_data_loader} autoPlay loop />
                            </View>
                        }
                        
                    </View>
                }
                <View style={{margin:40}}/>
        </ScrollView>    
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
    segment_active_bg: { width: '33%', alignItems: 'center', justifyContent: 'center', padding: 15, backgroundColor: colors.theme_bg, borderRadius: 10 },
    segment_active_fg: { color: colors.theme_fg_two, fontSize: 12, fontFamily: bold, color: colors.theme_fg_three },
    segment_inactive_bg: { width: '33%', alignItems: 'center', justifyContent: 'center', padding: 15, backgroundColor: colors.theme_bg_three, borderRadius: 10 },
    segment_inactive_fg: { color: colors.theme_fg_two, fontSize: 12, fontFamily: normal, color: colors.theme_fg_two }
});

export default Bookings;