//Fixed
import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { bold, img_url, chat_bg, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import database from '@react-native-firebase/database';
import { GiftedChat } from 'react-native-gifted-chat';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

var whoosh = new Sound('notification.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

});

const Chat = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [trip_id,setTripId] = useState(route.params.trip_id)
    const [messages,setMessages] = useState([])
    
    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        refOn(message => setMessages(oldArray => [message, ...oldArray]));
        const _unblur = navigation.addListener('blur', async () => {
            whoosh.stop();
        });
        return _unblur;
    }, []);

    const refOn = callback => {
        database().ref(`/chat/${trip_id}`)
          .limitToLast(20)
          .on('child_added', snapshot => callback(parse(snapshot)));
    }

    const parse = snapshot => {
        if(messages.length > 0){
          notification_sound();
        }
        const { text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const message = {_id, text, user };
        return message;
    };

    const onSend = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {text, user };
            database().ref(`/chat/${trip_id}`).push(message);
        }
    }
    
    const notification_sound  = () => {
        whoosh.play();
    }

    return (
        <ImageBackground
            source={chat_bg}
            resizeMode='cover'
            style={{flex: 1 ,width: '100%', height: '100%'}}
        >
            <StatusBar
                backgroundColor={colors.theme_bg}
            />
            <View style={[styles.header]}>
                <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize: 30 }} />
                </TouchableOpacity>
                <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_three, fontSize: f_xl, fontFamily: bold }}>Chat with Customer</Text>
                </View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                textInputStyle={{color:colors.theme_fg_two, height:50}}
                user={{
                    _id: global.id+'-Dr',
                    name: global.first_name,
                    avatar: img_url + global.profile_picture
                }}
                showUserAvatar
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: colors.theme_bg,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Chat;