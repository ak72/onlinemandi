import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {googleSigninWebClientId, ICfbUserMap} from '../assets/globals';

import {
  fetchFBUserByID,
  mergeLocalCart,
} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {store} from '../assets/redux/store/store';
import {fbUserPutRTDb} from '../assets/redux/slices/rest/crud/fbUserPutRTDb';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../navigator/Drawer/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeItemFromLocalCart} from '../assets/redux/slices/asyncLocalStorage';
interface IProp {
  navigation: DrawerNavigationProp<DrawerNavigatorParamList>;
  LoginProgress: (param: boolean) => void;
}
export default ({navigation, LoginProgress}: IProp) => {
  //////////////////////////////////////  const [userInfo, setUserInfo] = useState<User>();
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);
      return;
    }
    GoogleSignin.configure({
      webClientId: googleSigninWebClientId,
    });
    // console.log('GoogleSignin.configured in useEffect');
  }, [errorMessage]);

  // Sign in code
  const googleSignIn = async () => {
    setIsSigninInProgress(true);
    LoginProgress(true);
    //console.log('Its working');
    let signinResponse;
    try {
      await GoogleSignin.hasPlayServices();
      const _userInfo: User = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        _userInfo.idToken,
      );
      /////////////////////////////////////  setUserInfo(_userInfo);
      // Sign-in the user with the credential
      signinResponse = await auth().signInWithCredential(googleCredential);
      console.log(signinResponse);
      if (signinResponse?.additionalUserInfo?.isNewUser) {
        await fbUserPutRTDb({
          data: {
            ...ICfbUserMap,
            first_name: signinResponse?.additionalUserInfo?.profile?.given_name,
            last_name: signinResponse?.additionalUserInfo?.profile?.family_name,
            email: signinResponse?.additionalUserInfo?.profile?.email,
            image_url: signinResponse?.additionalUserInfo?.profile?.picture,
            localId: signinResponse?.user.uid,
          },
          url: signinResponse?.user.uid,
        });
      }
      let fetchResponse;
      try {
        if (signinResponse) {
          fetchResponse = await store.dispatch(
            fetchFBUserByID(signinResponse.user.uid),
          );

          const _cart = await AsyncStorage.getItem('cart');

          if (_cart) {
            // console.log('local cart is present so merging');
            // const upc = user.payload.cart;
            const mergedCart = store.dispatch(
              mergeLocalCart({
                ...fetchResponse.payload.cart,
                ...JSON.parse(_cart),
              }),
            );
            // console.log('mergedCart-> ', mergedCart);
            await fbUserPutRTDb({
              data: {
                ...mergedCart.payload,
              },
              url: `${fetchResponse.payload.current.localId}/cart`,
            });
            await removeItemFromLocalCart('cart');
          }

          navigation.navigate('AppBottomTabNavigator');
        }
      } catch (error: any) {
        if (fetchResponse == undefined) {
          // console.log('No linked data found');
          await fbUserPutRTDb({
            data: {
              ...ICfbUserMap,
              first_name:
                signinResponse?.additionalUserInfo?.profile?.given_name,
              last_name:
                signinResponse?.additionalUserInfo?.profile?.family_name,
              email: signinResponse?.additionalUserInfo?.profile?.email,
              image_url: signinResponse?.additionalUserInfo?.profile?.picture,
              localId: signinResponse?.user.uid,
            },
            url: signinResponse?.user.uid,
          });
          store
            .dispatch(fetchFBUserByID(signinResponse.user.uid.toString()))
            .then(() => {
              navigation.navigate('AppBottomTabNavigator');
            });
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrorMessage('Signin was cancelled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        setErrorMessage('Signin is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        setErrorMessage('Google play service not available or outdated');
      } else {
        // some other error happened
        setErrorMessage('Something went wrong');
      }
      LoginProgress(false);
      setIsSigninInProgress(false);
      console.log(error);
    }
  };
  return (
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark} //{isLightTheme ? GoogleSigninButton.Color.Dark : GoogleSigninButton.Color.Dark}
      onPress={() => {
        googleSignIn();
      }}
      disabled={isSigninInProgress}
    />
  );
};
