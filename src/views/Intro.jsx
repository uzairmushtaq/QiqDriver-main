import React from 'react';
import { StyleSheet,View, SafeAreaView, Text, StatusBar} from 'react-native';
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { normal, bold, screenWidth, f_s, f_25 } from '../config/Constants';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Intro = () => {
  const navigation = useNavigation();

  const slides = [
    {
      key: 1,
      title: 'Search A Car',
      text: 'Start the new years with some superfood on your plate. Find your perfect restaurant with wide variety of mouth-watering foods.',
      image: require('.././assets/json/slider_1.json'),
      bg: colors.theme_bg_three,
    },
    {
      key: 2,
      title: 'Choose Your Route',
      text: 'A light and crisp taste, lively color vegetables and fruits which packed with a burst of flavours.',
      image: require('.././assets/json/slider_2.json'),
      bg: colors.theme_bg_three,
    },
    {
      key: 3,
      title: 'Reach Your Destination',
      text: 'On time deliver to variety of locations.',
      image: require('.././assets/json/slider_3.json'),
      bg: colors.theme_bg_three,
    }
  ];

  const renderItem = ({item}: {item: Item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <View style={{ height: screenWidth, width: screenWidth}}>
          <LottieView source={item.image} autoPlay loop />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onDone = async() => {
    try{
        await AsyncStorage.setItem('existing', '1');
        global.existing = await 1;
        navigation.navigate('CheckPhone');
      }catch (e) {
        alert(e);
    } 
  }

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon type={Icons.Ionicons} name="chevron-forward" color={colors.theme_fg_three} style={{ fontSize:35 }} />
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon type={Icons.Ionicons} name="chevron-back" color={colors.theme_fg_three} style={{ fontSize:35 }} />
      </View>
    );
  };
  
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon type={Icons.Ionicons} name="home" color={colors.theme_fg_three} style={{ fontSize:25 }} />
      </View>
    );
  };


  const keyExtractor = (item: Item) => item.title;
  return (
    <SafeAreaView style={styles.container}>   
        <View style={{flex: 1}}>
          <StatusBar
            backgroundColor={colors.theme_bg}
          />
          <AppIntroSlider
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onDone={onDone}
            showSkipButton
            showPrevButton
            activeDotStyle={{ backgroundColor:colors.theme_bg }}
            renderDoneButton={renderDoneButton}
            renderNextButton={renderNextButton}
            renderPrevButton={renderPrevButton}
            data={slides}
          />
        </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textFieldcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 45
  },
  textFieldIcon: {
    padding:5
  },
  textField: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    height: 45,
    backgroundColor:colors.theme_bg_three,
    fontSize:14,
    color:colors.grey
  },
  button: {
    padding:10,
    borderRadius: 10,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.theme_bg,
    width:'100%',
    height:45
  },
  flag_style:{
    width: 38, 
    height: 24
  },
  country_text:{
    flex: 1,
    padding: 12,
    borderRadius: 10,
    height: 45,
    backgroundColor:colors.theme_bg_three,
    fontSize: f_s,
    color:colors.theme_fg_two
  },
  textFieldcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 45
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 96, 
  },
  image: {
    width: 320,
    height: 320,
    marginTop: 32,
  },
  title: {
    fontSize: f_25,
    color:colors.theme_fg_two,
    fontFamily:bold,
    textAlign: 'center',
  },
  text:{
    fontSize: f_s,
    fontFamily:normal,
    color:colors.text_grey,
    marginTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'justify',
    padding:20,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: colors.theme_bg,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Intro;