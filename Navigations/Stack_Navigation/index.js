import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Splash from '../views/Splash';
// import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon, {Icons} from './src/components/Icons';
// import * as colors from './src/assets/css/Colors';
import {colors} from '../../src/assets/css/Colors';
import {Icons} from '../../src/components/Icons';
// import * as Animatable from 'react-native-animatable';
import Bookings from '../../src/views/Bookings';
import Splash from '../../src/views/Splash';
import DriverRegisteration from '../../src/views/DriverRegisteration';
import DocumentUpload from '../../src/views/DocumentUpload';
import Dashboard from '../../src/views/Dashboard';
import BookingRequest from '../../src/views/BookingRequest';
import Chat from '../../src/views/Chat';
import DirectBooking from '../../src/views/DirectBooking';
import VehicleDocument from '../../src/views/VehicleDocument';
import EditEmail from '../../src/views/EditEmail';
import EditFirstName from '../../src/views/EditFirstName';
import EditLastName from '../../src/views/EditLastName';
import EditPassword from '../../src/views/EditPassword';
import EditPhoneNumber from '../../src/views/EditPhoneNumber';
import Faq from '../../src/views/Faq';
import FaqDetails from '../../src/views/FaqDetails';
import Forgot from '../../src/views/Forgot';
import KycVerification from '../../src/views/KycVerification';
import Login from '../../src/views/Login';
import Logout from '../../src/views/Logout';
import More from '../../src/views/More';
import MyRentalRides from '../../src/views/MyRentalRides';
import Notifications from '../../src/views/Notifications';
import NotificationDetails from '../../src/views/NotificationDetails';
import Profile from '../../src/views/Profile';
import Rating from '../../src/views/Rating';
import RentalRideDetails from '../../src/views/RentalRideDetails';
import RideDetails from '../../src/views/RideDetails';
import SharedTrip from '../../src/views/SharedTrip';
import Training from '../../src/views/Training';
import TrainingDetails from '../../src/views/TrainingDetails';
import Trip from '../../src/views/Trip';
import TripSettings from '../../src/views/TripSettings';
import VehicleDetails from '../../src/views/VehicleDetails';
import Wallet from '../../src/views/Wallet';
import Withdrawal from '../../src/views/Withdrawal';
import CheckPhone from '../../src/views/CheckPhone';
import Password from '../../src/views/Password';
import OTP from '../../src/views/OTP';
import CreateName from '../../src/views/CreateName';
import CreateEmail from '../../src/views/CreateEmail';
import CreateLicenceNumber from '../../src/views/CreateLicenceNumber';
import CreateDateOfBirth from '../../src/views/CreateDateOfBirth';
import CreatePassword from '../../src/views/CreatePassword';
import ResetPassword from '../../src/views/ResetPassword';
import CreateVehicleName from '../../src/views/CreateVehicleName';
import CreateVehicleBrand from '../../src/views/CreateVehicleBrand';
import CreateVehicleColor from '../../src/views/CreateVehicleColor';
import CreateVehicleNumber from '../../src/views/CreateVehicleNumber';
import CreateVehicleType from '../../src/views/CreateVehicleType';
import AboutUs from '../../src/views/AboutUs';
import Bill from '../../src/views/Bill';
import EditAccountNumber from '../../src/views/EditAccountNumber';
import EditBankName from '../../src/views/EditBankName';
import EditIfscCode from '../../src/views/EditIfscCode';
import EditAadharNumber from '../../src/views/EditAadharNumber';
import EditPanNumber from '../../src/views/EditPanNumber';
import LocationEnable from '../../src/views/LocationEnable';
import Paypal from '../../src/views/Paypal';
import AppUpdate from '../../src/views/AppUpdate';
import PrivacyPolicies from '../../src/views/PrivacyPolicies';
import LoginHome from '../../src/views/LoginHome';
import Earnings from '../../src/views/Earnings';

const TabArr = [
  {
    route: 'Dashboard',
    label: 'Home',
    type: Icons.FontAwesome,
    icon: 'car',
    component: Dashboard,
    color: colors.theme_fg,
    alphaClr: colors.theme_bg_three,
  },
  {
    route: 'Bookings',
    label: 'Bookings',
    type: Icons.FontAwesome,
    icon: 'book',
    component: Bookings,
    color: colors.theme_fg,
    alphaClr: colors.theme_bg_three,
  },
  //{ route: 'MyRentalRides', label:'Hire Trips', type: Icons.MaterialIcons, icon: 'car-rental', component: MyRentalRides, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
  {
    route: 'More',
    label: 'More',
    type: Icons.Ionicons,
    icon: 'settings',
    // component: More,
    color: colors.theme_fg,
    alphaClr: colors.theme_bg_three,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.6}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: item.color, borderRadius: 16},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? null : item.alphaClr},
          ]}>
          {/* <Icon
            type={item.type}
            name={item.icon}
            color={focused ? colors.theme_fg_three : colors.grey}
          /> */}
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: colors.theme_fg_three,
                  paddingHorizontal: 8,
                }}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
        initialRouteName="Bookings">
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bookings"
          component={Bookings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingRequest"
          component={BookingRequest}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DirectBooking"
          component={DirectBooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VehicleDocument"
          component={VehicleDocument}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DocumentUpload"
          component={DocumentUpload}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverRegisteration"
          component={DriverRegisteration}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditEmail"
          component={EditEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditFirstName"
          component={EditFirstName}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditLastName"
          component={EditLastName}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditPassword"
          component={EditPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditPhoneNumber"
          component={EditPhoneNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FaqDetails"
          component={FaqDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KycVerification"
          component={KycVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginHome"
          component={LoginHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="More"
          component={More}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyRentalRides"
          component={MyRentalRides}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotificationDetails"
          component={NotificationDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Rating"
          component={Rating}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RentalRideDetails"
          component={RentalRideDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RideDetails"
          component={RideDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SharedTrip"
          component={SharedTrip}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Training"
          component={Training}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TrainingDetails"
          component={TrainingDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Trip"
          component={Trip}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TripSettings"
          component={TripSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Withdrawal"
          component={Withdrawal}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckPhone"
          component={CheckPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Password"
          component={Password}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateName"
          component={CreateName}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateEmail"
          component={CreateEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateLicenceNumber"
          component={CreateLicenceNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateDateOfBirth"
          component={CreateDateOfBirth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePassword"
          component={CreatePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateVehicleName"
          component={CreateVehicleName}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateVehicleBrand"
          component={CreateVehicleBrand}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateVehicleColor"
          component={CreateVehicleColor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateVehicleNumber"
          component={CreateVehicleNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateVehicleType"
          component={CreateVehicleType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bill"
          component={Bill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditAccountNumber"
          component={EditAccountNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditBankName"
          component={EditBankName}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditIfscCode"
          component={EditIfscCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditAadharNumber"
          component={EditAadharNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditPanNumber"
          component={EditPanNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Earnings"
          component={Earnings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LocationEnable"
          component={LocationEnable}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Paypal"
          component={Paypal}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppUpdate"
          component={AppUpdate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicies"
          component={PrivacyPolicies}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
