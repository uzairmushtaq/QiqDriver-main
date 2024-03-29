//List
import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, regular, api_url, privacy_policies, f_l, f_s, f_25, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import Animated, {useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

const PrivacyPolicies = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const viewableItems = useSharedValue([]);

  const go_back = () => {
    navigation.goBack();
  }

  useEffect(() => {
    call_privacy_policies();
  }, []);

  const call_privacy_policies = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + privacy_policies,
      data: { lang: global.lang }
    })
      .then(async response => {
        setLoading(false);
        setData(response.data.result)
      })
      .catch(error => {
        setLoading(false);
        alert('Sorry something went wrong')
      });
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
            <View style={{ backgroundColor: colors.theme_bg_three, padding: 10, margin: 10, borderRadius: 10 }}>
      <View style={{ margin: 10 }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_l, fontFamily: bold }}>{item.title}</Text>
        <View style={{ margin: 5 }} />
        <Text style={{ color: colors.grey, fontSize: f_s, fontFamily: regular }}>
          {item.description}
        </Text>
      </View>
    </View>
        </Animated.View>
    );
    }
);

const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems;
};

const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.theme_bg}
      />
      <View style={[styles.header]}>
          <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
              <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize: 30 }} />
          </TouchableOpacity>
          <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_three, fontSize: f_xl, fontFamily: bold }}>Privacy Policies</Text>
          </View>
      </View>
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
    backgroundColor: colors.theme_bg,
    flexDirection: 'row',
    alignItems: 'center'
},
});

export default PrivacyPolicies;