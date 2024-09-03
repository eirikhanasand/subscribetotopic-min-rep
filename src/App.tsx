import React from 'react';
import { AppRegistry, Button, View } from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
})

firebase.messaging().onMessage(message => {
    console.log('on message log');
})

export default function App(props: any) {
    return (
        <View>
            <Button
                title="subscribe to topic"
                onPress={async () => {
                    try {
                        await firebase.messaging().subscribeToTopic('test');
                        console.log('subscribed');
                    } catch (e) {
                        console.log(e);
                    }
                }}
            />
            <Button
                title="get token"
                onPress={async () => {
                    try {
                        const token = await messaging().getToken();
                        console.log('token', token);
                    } catch (e) {
                        console.log(e);
                    }
                }}
            />
        </View>
    )
}

AppRegistry.registerComponent('testing', () => App);