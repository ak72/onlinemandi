import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default () => {
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);
      return;
    }
    ////////////// FacebookSignin.configure({
    ///////////////////   webClientId: facebookSigninWebClientId,
    /////////////////////////// });
    console.log('This toh ran');
  }, [errorMessage]);

  // Sign in code
  const loginWithFacebook = async () => {
    console.log('Its working');
    try {
      await GoogleSignin.hasPlayServices();
      /////////////////////////////// const _userInfo: User = await FacebookSignin.signIn();
      // Create a Google credential with the token
      ////////////////// const facebookCredential = auth.FacebookAuthProvider.credential(
      ///////////////////   _userInfo.idToken,
      ////////////////////////////////// );
      ////////////////////////  setUserInfo(_userInfo);
      // Sign-in the user with the credential
      ////////////////////// const signinResponse = await auth().signInWithCredential(
      //////////////////////    facebookCredential,
      ///////////////////////////   );
      /////////////////////////   console.log(signinResponse);
      //  if(signinResponse){
      ///////////////////////   if (signinResponse?.additionalUserInfo?.isNewUser) {
      //createdatabase by fbNewSignupUserRTDbSlice

      /*   fbUserPutRTDb({
            ...fbUserMap,
            first_name: signinResponse?.additionalUserInfo.profile?.family_name,
            last_name: signinResponse?.additionalUserInfo.profile?.given_name,
            email: signinResponse?.additionalUserInfo.profile?.email,
            image_url: signinResponse?.additionalUserInfo.profile?.picture,
            localId: signinResponse?.user.uid,
          }); */

      /////////////////////////////// }
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
      console.log(error);
    }
  };
  return (
    <Icon.Button
      name="facebook"
      backgroundColor="#3b5998"
      onPress={() => loginWithFacebook}
      style={{width: 192, height: 42}}>
      <Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>
        Login with facebook
      </Text>
    </Icon.Button>
  );
};
