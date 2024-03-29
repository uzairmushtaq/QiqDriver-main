//Fixed
import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, img_url, regular, f_25, f_s } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import VideoPlayer from 'react-native-video-controls';

const TrainingDetails = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(route.params.data);

  const go_back = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.theme_bg}
      />
      <View style={[styles.header]}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}>
          <Text ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_25, fontFamily: bold }}>{data.title}</Text>
        </View>
        <View style={{ margin: 10 }} />
        {data.file != null ?
          <View style={{ backgroundColor: colors.theme_bg_three, padding: 10, margin: 10, borderRadius: 10 }}>
            <View style={{ height: 200, width: '100%' }}>
              <VideoPlayer disableSeekbar disableVolume disableBack source={{ uri: img_url + data.file }} />
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ color: colors.grey, fontSize: f_s, fontFamily: regular }}>
                {data.description}
              </Text>
            </View>
          </View>
          :
          <View style={{ backgroundColor: colors.theme_bg_three, padding: 10, margin: 10, borderRadius: 10 }}>
            <Text style={{ color: colors.grey, fontSize: f_s, fontFamily: regular }}>
              {data.description}
            </Text>
          </View>
        }
        <View style={{ margin: 10 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.theme
  },
  header: {
    height: 60,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default TrainingDetails;