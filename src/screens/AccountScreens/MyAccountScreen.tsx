import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
import {useSelector} from 'react-redux';

import {RootState, store} from '../../assets/redux/store/store';
import {
  userDefaultState,
  resetUserToDefaultState,
} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {Button} from '@rneui/themed';
import {AccountStackParamList} from '../../navigator/Stack/AccountStackNavigator';
import {CompositeNavigationProp, useTheme} from '@react-navigation/native';
//import {AuthStackParamList} from '../../navigator/Stack/AuthStackNavigator';
import auth from '@react-native-firebase/auth';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../../navigator/Drawer/DrawerNavigator';
import {ITheme} from '../../assets/globals/theme';

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AccountStackParamList, 'MyAccountScreen'>,
  //NativeStackNavigationProp<AuthStackParamList>
  DrawerNavigationProp<DrawerNavigatorParamList>
>;
interface IProp {
  navigation: NavigationProps;
}
export default ({navigation}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);
    }
  }, [errorMessage]);

  const onSignOut = async () => {
    try {
      if (auth().currentUser != null) {
        await auth().signOut();
        store.dispatch(resetUserToDefaultState(userDefaultState));
        console.log('I navigated to signinwelcome screen');
        navigation.navigate('SigninWelcomeScreen');
      }
    } catch (error: any) {
      setErrorMessage('Error signing out');
      console.error('Error signing out');
    }
  };

  return user.isLoggedIn ? (
    user.loading ? (
      <View style={styles.indicatorWheel}>
        <ActivityIndicatorWheel />
      </View>
    ) : (
      <View style={styles.base}>
        <View
          style={{...styles.profileBase, backgroundColor: colors.backgroundL}}>
          <Avatar.Image
            size={100}
            source={require('../../assets/images/avatar.png')}
          />
          <Text style={{fontSize: fontsize.body1, color: colors.text}}>
            <Text>{user.current.first_name && user.current.first_name}</Text>
            <Text> {user.current.last_name && user.current.last_name}</Text>
          </Text>
          <Text style={{fontSize: fontsize.body1, color: colors.text}}>
            {user.current.mobile}
          </Text>
          <Text style={{fontSize: fontsize.body1, color: colors.text}}>
            {user.current.email && user.current.email}
          </Text>
        </View>
        <View
          style={{...styles.editIconBase, backgroundColor: colors.backgroundL}}>
          <Icon
            name="pencil"
            size={20}
            color="#fff"
            onPress={() => {
              navigation.navigate('AccountUpdateScreen');
            }}
          />
        </View>
        <View>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate('SavedAddressScreen', {
                localId: user.current.localId,
                canSelect: false,
              });
            }}>
            <View
              style={{...styles.textRowWithIcon, borderColor: colors.border}}>
              <Icon name="city" size={20} color="#000" />
              <Text
                style={{
                  ...styles.rowText,
                  fontSize: fontsize.body2,
                  color: colors.text,
                }}>
                My Addresses
              </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate('MyOrdersScreen');
            }}>
            <View
              style={{...styles.textRowWithIcon, borderColor: colors.border}}>
              <Icon name="basket" size={20} color="#000" />
              <Text
                style={{
                  ...styles.rowText,
                  fontSize: fontsize.body2,
                  color: colors.text,
                }}>
                My Orders
              </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate('MyFavoritesScreen');
            }}>
            <View
              style={{...styles.textRowWithIcon, borderColor: colors.border}}>
              <Icon name="heart" size={20} color="#000" />
              <Text
                style={{
                  ...styles.rowText,
                  fontSize: fontsize.body2,
                  color: colors.text,
                }}>
                My Favorites
              </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate('NotificationScreen');
            }}>
            <View
              style={{...styles.textRowWithIcon, borderColor: colors.border}}>
              <Icon name="bell" size={20} color="#000" />
              <Text
                style={{
                  ...styles.rowText,
                  fontSize: fontsize.body2,
                  color: colors.text,
                }}>
                Notifications
              </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={onSignOut}>
            <View
              style={{...styles.textRowWithIcon, borderColor: colors.border}}>
              <Icon name="logout-variant" size={20} color="#000" />
              <Text
                style={{
                  ...styles.rowText,
                  fontSize: fontsize.body2,
                  color: colors.text,
                }}>
                Logout
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  ) : (
    <View style={styles.base}>
      <View style={styles.noLogin}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              ...styles.noLoginText,
              fontSize: fontsize.body2,
              color: colors.text,
            }}>
            You are not logged in
          </Text>
          <Text
            style={{
              ...styles.noLoginText,
              fontSize: fontsize.body2,
              color: colors.text,
            }}>
            Signin to view your account
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Button
            type="solid"
            title={'Signin'}
            color={colors.primary}
            containerStyle={{borderRadius: 10}}
            titleStyle={{fontSize: fontsize.body2, padding: 10}}
            //onPress={() => navigation.navigate('SigninScreen')}
            onPress={() =>
              navigation.navigate('AuthStackNavigator', {
                screen: 'SigninScreen',
                initial: false,
                params: {
                  from: 'myAccount',
                },
              })
            }
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    // marginHorizontal: 10,
    // backgroundColor: '#bbb',
    paddingHorizontal: 2,
    flex: 1,
    // justifyContent: 'center',
    //  alignItems: 'center',
  },
  profileBase: {
    justifyContent: 'center',
    alignItems: 'center',
    //flex: 1,
    paddingVertical: 20,
  },
  editIconBase: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#EDC19C',
  },
  textRowWithIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.6,

    paddingVertical: 10,
  },
  rowText: {
    marginLeft: 5,
  },
  noLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noLoginText: {
    marginVertical: 3,
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
