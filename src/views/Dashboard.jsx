import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  PermissionsAndroid,
  Platform,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { normal, bold, regular, screenHeight, screenWidth, dashboard, api_url, change_online_status, LATITUDE_DELTA, 
  LONGITUDE_DELTA, f_s, f_tiny, f_xs, get_heatmap_coordinates} from '../config/Constants';
import FusedLocation from 'react-native-fused-location';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { changeLocation } from '../actions/ChangeLocationActions';
import { initialLat, initialLng, initialRegion } from '../actions/BookingActions';
import DropShadow from "react-native-drop-shadow";

const Dashboard = (props) => {
  const navigation = useNavigation();
  const map_ref = useRef();
  const [loading, setLoading] = useState(false);
  const [switch_value, setSwitchValue] = useState(global.live_status == 1 ? true : false);
  const [language, setLanguage] = useState(global.lang);
  const [heat_map_coordinates, setHeatMapCoordinates] = useState([]);
  const [today_bookings, setTodayBookings] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [today_earnings, setTodayEarnings] = useState(0);
  const [vehicle_type, setVehicleType] = useState(0);
  const [sync_status, setSyncStatus] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [map_region, setMapRegion] = useState(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      //call_get_heatmap_coordinates();
    }, 5000);
    setTimeout(function(){booking_sync()}, 3000)
    const unsubscribe = navigation.addListener("focus", async() => {
      await call_dashboard();
    });
    if(Platform.OS === "android"){
      requestCameraPermission();
    }else{
      getInitialLocation();
    }
    return(
      interval,
      unsubscribe
    ); 
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
    });
  const call_get_heatmap_coordinates = async() =>{
    await axios({
      method: 'post', 
      url: api_url + get_heat_map,
      data:{ zone:global.zone }
    })
    .then(async response => {
      this.setState({ heat_map_coordinates:response.data.result })
    })
    .catch(error => {
      console.log(error)
    });
  }

  const toggleSwitch = (value) => {
    if(value){
      setSwitchValue(value);
      call_change_online_status(1);
    }else{
      setSwitchValue(value);
      call_change_online_status(0);
    }  
  }

  const saveData = async (status) =>{
    try {
      await AsyncStorage.setItem('online_status', status.toString());
    } catch (e) {
      
    }
  }

  const call_dashboard = async () => {
    await axios({
      method: 'post', 
      url: api_url + dashboard,
      data:{ id: global.id }
    })
    .then(async response => {
      setLoading(false);
      if(response.data.result.vehicle_type != 0 && vehicle_type == 0){
        get_location(response.data.result.vehicle_type,response.data.result.sync_status);
        setVehicleType(response.data.result.vehicle_type)
      }
      setTodayBookings(response.data.result.today_bookings);
      setTodayEarnings(response.data.result.today_earnings);
      setSyncStatus(response.data.result.sync_status);
      setWallet(response.data.result.wallet);
      check_booking(response.data.result.booking_id,response.data.result.trip_type);
    })
    .catch(error => {
      setLoading(false);
    });
  }

  const check_booking = (booking_id,trip_type) => {
    if(booking_id != 0 && trip_type != 5){
      navigation.navigate('Trip', {trip_id:booking_id, from:'home'})
    }else if(booking_id != 0 && trip_type == 5){
      setTimeout(function(){
        navigation.navigate('SharedTrip', {trip_id:booking_id, from:'home'})
      }, 2000)
    }
  }

  const call_change_online_status = async (status) => { 
    await axios({
      method: 'post', 
      url: api_url + change_online_status,
      data:{ id: global.id, online_status : status } 
    })
    .then(async response => {
      setLoading(false);
      if(response.data.status == 2){
        setSwitchValue(false);
        global.live_status == 0;
        saveData(0);
        vehicle_details();
      }else if(response.data.status == 3){
        setSwitchValue(false);
        global.live_status == 0;
        saveData(0);
        vehicle_documents();
      }if (response.data.status == 1 && status == 1 && sync_status == 1) {
        global.live_status == 1;
        saveData(1);
        setSwitchValue(true);
      } else {
        global.live_status == 0;
        saveData(0);
        setSwitchValue(false);
      }
    })
    .catch(error => {
      setLoading(false);
    });
  }

  vehicle_details = () => {
    navigation.navigate('VehicleDetails');
  }

  vehicle_documents = () => {
    navigation.navigate('VehicleDocument');
  }

  const get_background_location_permission = async() => {
    const bg_granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,{
            'title': app_name + ' App Access your location for tracking in background',
            'message': 'Access your location for tracking in background',
             buttonPositive: "OK"
        }
    )
  }

  const requestCameraPermission = async() =>{
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': app_name + ' App Access your location for tracking in background',
                'message': 'Access your location for tracking in background'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await get_background_location_permission();
            await getInitialLocation();
        }
    }catch(err) {
        alert(strings.sorry_cannot_fetch_your_location);
    }
  }

  const getInitialLocation = async() => {
    Geolocation.getCurrentPosition( async(position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setMapRegion({
        latitude:       await position.coords.latitude,
        longitude:      await position.coords.longitude,
        latitudeDelta:  LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
      await props.initialRegion(map_region);
      await props.initialLat(position.coords.latitude);
      await props.initialLng(position.coords.longitude);
    }, error => getInitialLocation() , 
    {enableHighAccuracy: false, timeout: 10000 });
  }

  const get_location = async(vt,sy) =>{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: {app_name}+ 'access your location in background for get nearest trip requests',
          message: {app_name}+' needs to access your location in background for get nearest trips, show live location to customers that will be always in use'
          }
      );
      if(granted && vt != 0) {
        FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
 
        // Get location once.
        const location = await FusedLocation.getFusedLocation();
        setLatitude(location.latitude);
        setLongitude(location.longitude);

        // Set options.
        FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);
        FusedLocation.setLocationInterval(5000);
        FusedLocation.setFastestLocationInterval(5000);
        FusedLocation.setSmallestDisplacement(10);
       
        // Keep getting updated location.
        FusedLocation.startLocationUpdates();
 
        // Place listeners.
        const subscription = FusedLocation.on('fusedLocation', async location => {
          props.changeLocation(location);
            let bearing = 0;
            if(!isNaN(location.bearing)){
                bearing = location.bearing;
            }
            if(location){
              if(sy == 1){
                database().ref(`drivers/${vt}/${global.id}/geo`).update({
                  lat: location.latitude,
                  lng: location.longitude,
                  bearing : bearing
                });
              }
            }
        });
      }else if(Platform.OS === "android"){
        requestCameraPermission();
      }else{
        getInitialLocation();
      }
  }

  booking_sync = () =>{ 
    if(sync_status == 1){
      database().ref(`drivers/${vehicle_type}/${global.id}`).on('value', snapshot => {
          if(snapshot.val().booking.booking_status == 1 && snapshot.val().online_status == 1){
            navigation.navigate('BookingRequest',{ trip_id : snapshot.val().booking.booking_id });
          }
      });
    }
  }

  const navigate_document_verify = async() =>{
    if(sync_status == 2){
      vehicle_details();
    }else{
      vehicle_documents();
    }
  }

  navigate_rental = () =>{
    navigation.navigate('MyRentalRides');
  }

  navigate_wallet = () =>{
    navigation.navigate('Wallet');
  }

  call_trip_settings = () => {
    navigation.navigate('TripSettings')
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.theme_bg}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map_ref}
        style={styles.map}
        region={map_region}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
      </MapView>
      <View style={{ padding:15, backgroundColor:colors.theme_bg_three, flexDirection:'row', position:'absolute',top:20, width:'90%', marginLeft:'5%', borderRadius:10}}>
        <View style={{ width:'20%', alignItems:'flex-start', justifyContent:'center'}}>
          <TouchableOpacity onPress={call_trip_settings.bind(this)}>
            <Icon type={Icons.Ionicons} name="settings" style={{ fontSize:25, color:colors.theme_bg_two }} />
          </TouchableOpacity>
        </View>
        <View style={{ width:'60%', alignItems:'center', justifyContent:'center'}}>
          {switch_value == true &&
            <Text style={{ color:colors.theme_fg, fontSize:f_s, fontFamily:bold }}>Online</Text>
          }
          {switch_value != true &&
            <Text style={{ color:colors.theme_fg_two, fontSize:f_s, fontFamily:bold }}>Offline</Text>
          }
        </View>
        <View style={{ width:'20%', alignItems:'flex-end', justifyContent:'center'}}>
          <Switch
            trackColor={{ false: colors.grey, true: colors.success }}
            thumbColor={switch_value ? colors.success : colors.grey }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={switch_value}
          />
        </View>
      </View>
      <View style={{ padding:15, backgroundColor:colors.theme_bg, height:150, position:'absolute',bottom:80, width:'90%', marginLeft:'5%', borderRadius:10}}>
        <DropShadow
            style={{
                width: '100%',
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
          <View style={{ flexDirection:'row', width:'100%'}}>
            <View style={{ width:'50%', alignItems:'center', justifyContent:'center'}}>
              <Icon type={Icons.Ionicons} name="bookmark" style={{ fontSize:30, color:colors.theme_fg_three }} />
              <View style={{ margin:5 }} />
              <Text style={{ color:colors.theme_fg_three, fontSize:f_s, fontFamily:bold }}>{today_bookings}</Text>
            </View>
            <View style={{ width:'50%', alignItems:'center', justifyContent:'center'}}>
              <Icon type={Icons.FontAwesome} name="dollar" style={{ fontSize:30, color:colors.theme_fg_three }} />
              <View style={{ margin:5 }} />
              <Text style={{ color:colors.theme_fg_three, fontSize:f_s, fontFamily:bold }}>{global.currency}{today_earnings}</Text>
            </View>
          </View>
          <View style={{ margin:5 }} />
          <View style={{ flexDirection:'row', width:'100%'}}>
            <View style={{ width:'50%', alignItems:'center', justifyContent:'center'}}>
              <Text style={{ color:colors.theme_fg_three, fontSize:f_tiny, fontFamily:normal }}>Today Bookings</Text>
            </View>
            <View style={{ width:'50%', alignItems:'center', justifyContent:'center'}}>
              <Text style={{ color:colors.theme_fg_three, fontSize:f_tiny, fontFamily:normal }}>Today Earnings</Text>
            </View>
          </View>
        </DropShadow>
      </View>
      
      <View style={{ position:'absolute', top:90, width:'100%' }}>
        {wallet == 0 &&
        <TouchableOpacity activeOpacity={1} onPress={navigate_wallet.bind(this)} style={{ flexDirection:'row', backgroundColor:colors.error_background, borderRadius:10, alignItems:'center', justifyContent:'center', padding:10, width:'90%', marginLeft:'5%'}}>
          <Icon type={Icons.Ionicons} name="wallet" style={{ fontSize:20, color:colors.error }} />
          <View style={{ margin:5 }} />
          <Text style={{ fontFamily:regular, fontSize:f_xs, color:colors.error}}>Your wallet balance is low please recharge immediately</Text>
        </TouchableOpacity>
        }
      </View>
        
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (data) => dispatch(changeLocation(data)),
  initialLat: (data) => dispatch(initialLat(data)),
  initialLng: (data) => dispatch(initialLng(data)),
  initialRegion: (data) => dispatch(initialRegion(data))
});

export default connect(null, mapDispatchToProps)(Dashboard);