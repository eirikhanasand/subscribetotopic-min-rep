import { StatusBar } from 'expo-status-bar';
import { MS } from '../../styles/menuStyles';
import { SS } from '../../styles/settingStyles';
import { GS } from '../../styles/globalStyles';
import React, { useState, useEffect, useRef, replace } from 'react';
import { T } from '../../styles/text';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Button, 
  Platform,
  TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

{/* ========================= APP START ========================= */}
global.nTitle = 'Login 💻'
global.nBody = 'Varsling'
global.nDelay = 1

export default function MakeNotificationScreen({ navigation }) {
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const ProfilePage = () => {
  navigation.navigate('ProfileScreen')
}
const goBack = () => {
    navigation.goBack()
}
const settingsPage = () => {
  navigation.navigate('SettingScreen');
}

const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();

useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
      <View style={MS.topMenu}>
      <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>
        <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
    </View>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.creditContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={T.centered}>Send varsling</Text><Text/><Text/><Text/>

                    <Text style={T.centered20}>Tittel</Text><Text/>
                    <TextInput 
                      style={GS.inputText}
                      placeholder='Login'
                      placeholderTextColor={'#555'}
                      textAlign='center'
                      onChangeText={(val) => nTitle = (val)}
                    /><Text/>

              <Text style={T.centered20}>Beskrivelse</Text><Text/>
                    <TextInput 
                      multiline
                      style={GS.inputText}
                      placeholder='Varsling'
                      placeholderTextColor={'#555'}
                      textAlign='center'
                      onChangeText={(val) => nBody = (val)}
                    />
                    
                <Text/>

                <Text style={T.centered20}>Delay (sekunder)</Text><Text/>
                    <TextInput 
                      style={GS.inputText}
                      keyboardType='numeric'
                      placeholder='1'
                      placeholderTextColor={'#555'}
                      textAlign='center'
                      onChangeText={(val) => nDelay = (val)}
                    /><Text/>

                <Button
                color={'red'}
                title="Send varsling"
                onPress={async () => {
                await schedulePushNotification();
                }}
                /><Text/>
                
              {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={T.h5}>Tittel:</Text>
                <Text style={T.h5}>{notification && notification.request.content.title} </Text>
                <Text style={T.h5}>Beskrivelse:</Text>
                <Text style={T.h5}>{notification && notification.request.content.body}</Text><Text/>
                <Text style={T.h5}>Delay:</Text> */}
                {/* <Text style={T.h5}>{notification && notification.request.content.trigger} </Text><Text/> */}
                {/* <Text style={T.h5}>Data: {notification && JSON.stringify(notification.request.content.data)}</Text> */}
               
                <View style={SS.makeNotificationImage}>
                  <Image style={GS.creditImage} source={require('../../assets/login-text.png')} />
                </View>
              {/* </View> */}
              <Text/><Text/><Text/>
      







</ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
        <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenu3} source={require('../../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenu2} source={require('../../assets/calendar777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settingsPage()}>
            <Image style={MS.bMenu1} source={require('../../assets/menu777.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: nTitle,
      body: nBody,
      data: { data: 'goes here' },
    },
    trigger: { seconds: nDelay },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}