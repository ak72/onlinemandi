import messaging from '@react-native-firebase/messaging';

async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  //await postToApi('/users/1234/tokens', { token });
}
