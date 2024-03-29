import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, regular, tutorials, api_url, img_url, loader, f_l, f_xs, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropShadow from "react-native-drop-shadow";
import axios from 'axios';
import LottieView from 'lottie-react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

const Training = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const viewableItems = useSharedValue([]);

  const go_back = () => {
    navigation.goBack();
  }

  useEffect(() => {
    call_tutorials();
  }, []);

  const call_tutorials = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + tutorials,
      data: { lang: 'en' }
    })
      .then(async response => {
        setLoading(false);
        setData(response.data.result);
      })
      .catch(error => {
        setLoading(false);
        alert('Sorry something went wrong')
      });
  }

  const navigate_training_details = (data) => {
    navigation.navigate("TrainingDetails", { data: data })
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
          <TouchableOpacity activeOpacity={1} onPress={navigate_training_details.bind(this, item)} style={{ width: '100%', flexDirection: 'row', backgroundColor: colors.theme_bg_three, borderRadius: 10, padding: 10, marginTop: 5, marginBottom: 5 }}>
            <View style={{ width: '35%', justifyContent: 'center' }}>
              <View style={{ height: 100, width: 100 }}>
                <Image source={{ uri: img_url + item.thumbnail_image }} style={{ height: undefined, width: undefined, flex: 1, borderRadius: 10 }} />
              </View>
            </View>
            <View style={{ width: '65%', justifyContent: 'flex-start' }}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_l, fontFamily: bold }}>{item.title}</Text>
              <View style={{ margin: 5 }} />
              <Text numberOfLines={4} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: regular }}>{item.description}</Text>
            </View>
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
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        backgroundColor={colors.btn_color}
      />
      <View style={[styles.header]}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_three, fontSize: f_xl, fontFamily: bold }}>Training</Text>
        </View>
      </View>
      {loading == true ?
        <View style={{ height: 100, width: 100, alignSelf: 'center', marginTop: '30%' }}>
          <LottieView source={loader} autoPlay loop />
        </View>
        :
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
            marginLeft: '2.5%',
          }}
        >
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
        </DropShadow>
      }
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
    flexDirection: 'row',
    backgroundColor: colors.btn_color,
    alignItems: 'center'
  },
});

export default Training;

