import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
//import SplashScreen from 'react-native-splash-screen';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../assets/redux/store/store';
import {fetchInventory} from '../../assets/redux/slices/rest/inventory/inventorySlice';
import {
  fetchFBUserByID,
  loadLocalCart,
} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
import {Button} from '@rneui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigator/Stack/AuthStackNavigator';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../../navigator/Drawer/DrawerNavigator';
import {ICfbUserMap} from '../../assets/globals';
import {fbUserPutRTDb} from '../../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../../assets/globals/theme';

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'SigninWelcomeScreen'>,
  DrawerNavigationProp<DrawerNavigatorParamList>
>;

interface IProp {
  navigation: NavigationProps;
}
export default ({navigation}: IProp) => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fbUser, setfbUser] = useState<FirebaseAuthTypes.User | null>(null);
  // Set an initializing state whilst Firebase connects
  const [fbAuthInitializing, setfbAuthInitializing] = useState(true);
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  // Handle user state changes
  const onAuthStateChanged = (
    userState: React.SetStateAction<FirebaseAuthTypes.User | null>,
  ) => {
    setfbUser(userState);
    if (fbAuthInitializing) setfbAuthInitializing(false);
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);
      return;
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    /*debug line below....delete after done */
    /*  (async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log(isSignedIn);
      if (isSignedIn) {
        console.log('Google is logged in........');
      } else {
        console.log('Google is not logged in........');
      }
    })();*/
    /*debug line above....delete after done */

    return subscriber; // unsubscribe on unmount
  }, [errorMessage]);

  if (!fbAuthInitializing) {
    (async () => {
      try {
        // console.log('Initializing is falsesssssssssssssssssss');
        const city = await AsyncStorage.getItem('city');
        await store.dispatch(fetchInventory(city ? city : 'bhopal'));
        if (fbUser) {
          store
            .dispatch(fetchFBUserByID(fbUser.uid))
            .then(() => {
              navigation.navigate('AppBottomTabNavigator');
            })
            .catch((_error: any) => {
              fbUserPutRTDb({
                data: {
                  ...ICfbUserMap,
                  localId: fbUser.uid,
                },
                url: fbUser.uid,
              })
                .then(() => {
                  store.dispatch(fetchFBUserByID(fbUser.uid)).then(() => {
                    navigation.navigate('AppBottomTabNavigator');
                  });
                })
                .catch((error: any) => {
                  console.log('Error occured ', error.message);
                  setErrorMessage(error.message);
                });
            });
        } else {
          // SplashScreen.hide();
          LottieSplashScreen.hide();
          setShowWelcomeScreen(true);
        }
      } catch (error: any) {
        console.log('Error occured ', error.message);
        setErrorMessage(error.message);
      }
    })();
  }

  const checkLocalCart = async () => {
    // console.log('user is not logged in');
    const localCart = await AsyncStorage.getItem('cart');
    if (localCart) {
      // dispatch local cart initilization action
      //  console.log('local cart present');
      try {
        store.dispatch(loadLocalCart(JSON.parse(localCart)));
      } catch (error: any) {
        console.log('Error occured ', error.message);
        setErrorMessage(error.message);
      }
    }
    navigation.navigate('AppBottomTabNavigator');
  };
  return showWelcomeScreen ? (
    <View style={{...styles.base, backgroundColor: colors.backgroundLL}}>
      <View style={styles.topTextBase}>
        <Text
          style={{
            ...styles.topText,
            ...{color: colors.text, fontSize: fontsize.h1},
          }}>
          Discover Products{' '}
        </Text>
        <Text
          style={{
            ...styles.topText,
            ...{color: colors.text, fontSize: fontsize.h1},
          }}>
          In Your Area
        </Text>
      </View>
      <View style={styles.carouselBase}>
        <Image
          source={{
            uri: 'http://etcetera.ai/assets/native/images/banner.jpg',
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={styles.bottomBase}>
        <View>
          <View
            style={{
              ...styles.button,
              backgroundColor: colors.primary,
            }}>
            <Button
              title="Sign In"
              type="solid"
              color={colors.primary}
              titleStyle={{
                fontWeight: '500',
                fontSize: fontsize.buttonlarge,
                color: colors.text,
              }}
              onPress={() => {
                console.log('Sign In Pressed');
                navigation.navigate('SigninScreen');
              }}
            />
          </View>
          <View
            style={{
              ...styles.button,
              backgroundColor: colors.accent,
            }}>
            <Button
              title="Create an account"
              type="solid"
              //color={colors.button.lightdarkbutton}
              onPress={() => {
                console.log('Create an account Pressed');
                navigation.navigate('SignupScreen');
              }}
              titleStyle={{
                fontWeight: '500',
                fontSize: fontsize.buttonlarge,
                color: colors.text,
              }}
              buttonStyle={{backgroundColor: colors.accent}}
            />
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Button
            type="clear"
            title="Skip for now>>>"
            buttonStyle={{width: 250}}
            containerStyle={{margin: 5}}
            titleStyle={{
              marginHorizontal: 5,
              color: colors.text,
              fontSize: fontsize.buttonmedium,
            }}
            onPress={() => {
              console.log('Skip for now>>>');
              checkLocalCart();
            }}
          />
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.indicatorWheel}>
      <ActivityIndicatorWheel />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  topTextBase: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  topText: {
    //fontSize: font.header.super,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  carouselBase: {
    flex: 4,
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    backgroundColor: '#9d06eb',
  },
  slide2: {
    backgroundColor: '#97cae5',
  },
  slide3: {
    backgroundColor: '#92bbd9',
  },
  bottomBase: {
    flex: 4,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 50,
    marginVertical: 10,
    borderRadius: 12,

    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    //backgroundColor: '#f00',
  },
});
