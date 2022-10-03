import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import notifee, {AndroidColor} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import Notifications from '../../components/Notifications';
import {INotification} from '../../assets/interface';
import {Button} from '@rneui/themed';

export default () => {
  const [remoteMessages, setRemoteMessages] = useState<INotification>({
    notification: {
      android: {},
      body: 'hello',
      title: '',
    },
    sentTime: 0,
    data: {},
    from: '',
    messageId: '',
    ttl: 0,
    collapseKey: '',
  });
  /*let _remoteMessage: INotification = {
    notification: {
      android: {},
      body: 'hello',
      title: '',
    },
    sentTime: 0,
    data: {},
    from: '',
    messageId: '',
    ttl: 0,
    collapseKey: '',
  };*/
  const updateData = () => {
    console.log('data was updated');
    setRemoteMessages({
      notification: {
        android: {},
        body: 'hello this is a updated data',
        title: 'Woww',
      },
      sentTime: 105620,
      data: {},
      from: 'Anurag Kanchan',
      messageId: '200',
      ttl: 0,
      collapseKey: '302',
    });
  };
  useEffect(() => {
    getFCMToken();
    requestPermission();
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      setRemoteMessages(remoteMessage);
      console.log('remoote message', JSON.stringify(remoteMessage));
      Alert.alert('Message', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
    });
    return unSubscribe;
  }, [updateData]);

  const getFCMToken = () => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log('token=>>>>', token);
        //return saveTokenToDatabase(token);
        //  Alert.alert('Token', token);
      });
  };
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    /* for iOS  const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } */
    console.log('requestPermission=>>>>', requestPermission);
  };

  const DisplayNotification = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    //Display Notification
    await notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      android: {
        channelId,
        color: '#4caf50',
        smallIcon: 'ic_launcher',
        //optional defaults to ic_launcher
        pressAction: {
          id: 'default',
        },
      },
    });
  };
  /**
   * shift this to another file
   */
  const sendSingleDeviceNotification = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'key=');

    var raw = JSON.stringify({
      data: {},
      notification: {
        body: 'This is a FCM notification message!',
        title: 'FCM message from anurag',
      },
      to: '',
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(error => console.log('error', error));
  };

  // const onMessageReceived=(message)=> {
  //   notifee.displayNotification(JSON.parse(message.data.notifee));
  // }

  // messaging().onMessage(onMessageReceived);
  // messaging().setBackgroundMessageHandler(onMessageReceived);
  return (
    <View style={styles.base}>
      <Notifications message={remoteMessages} />
      <Button title="Check" onPress={updateData} />
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 20,
    paddingHorizontal: 20,
  },
});
