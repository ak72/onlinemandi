import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Avatar, Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {RootState, store} from '../assets/redux/store/store';
import {
  userDefaultState,
  resetUserToDefaultState,
} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleSigninWebClientId} from '../assets/globals';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../assets/globals/theme';
import {AuthContext} from '../assets/redux/context';

export default (props: DrawerContentComponentProps) => {
  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );

  const nativetheme = useTheme();
  const {colors, fontsize} = nativetheme as unknown as ITheme;
  const {toggleTheme} = React.useContext(AuthContext);

  const onSignOut = async () => {
    props.navigation.closeDrawer();
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        GoogleSignin.configure({
          webClientId: googleSigninWebClientId,
        });
        // await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      if (auth().currentUser != null) {
        await auth().signOut();
      }
      store.dispatch(resetUserToDefaultState({...userDefaultState}));
      props.navigation.navigate('SigninWelcomeScreen');
    } catch (error: any) {
      console.error('Error signing out', error);
    }
  };
  return (
    <View style={styles.base}>
      <DrawerContentScrollView {...props}>
        <View style={{backgroundColor: colors.primary}}>
          {user.isLoggedIn && (
            <>
              <View style={styles.avatarBase}>
                <Avatar
                  rounded
                  avatarStyle={{...styles.avatar, borderColor: colors.border}}
                  //   source={require('../assets/images/avatar.png')}
                  source={
                    user.current.image_url != ''
                      ? {uri: user.current.image_url}
                      : require('../assets/images/avatar.png')
                  }
                  size={75}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: fontsize.body1, color: colors.text}}>
                    {`${user.current.first_name}${' '}${
                      user.current.last_name
                    }`}{' '}
                  </Text>
                  <Text style={{fontSize: fontsize.body2, color: colors.text}}>
                    {user.current.email}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingBottom: 5,
                }}>
                <View style={{flexDirection: 'row', marginTop: 0}}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginLeft: 10,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: fontsize.h5,
                        color: colors.text,
                      }}>
                      {user.current.favorites != undefined
                        ? Object.keys(user.current.favorites).length
                        : 0}
                    </Text>

                    <Text
                      style={{
                        fontSize: fontsize.body2,
                        color: colors.text,
                      }}>
                      My Favorites
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 0}}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginLeft: 10,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: fontsize.h5,
                        color: colors.text,
                      }}>
                      {user.cart != undefined
                        ? Object.keys(user.cart).length
                        : 0}
                    </Text>

                    <Text
                      style={{
                        fontSize: fontsize.body2,
                        color: colors.text,
                      }}>
                      My Cart
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Payment"
          icon={({color, size}) => (
            <Icon
              type="material-community"
              name="credit-card-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => console.log('Payment')}
        />
        <DrawerItem
          label="Settings"
          icon={({color, size}) => (
            <Icon
              type="material-community"
              name="cog-outline"
              color={color}
              size={size}
            />
          )}
          onPress={() => console.log('Settings')}
        />

        <View style={{borderTopWidth: 1, borderTopColor: colors.border}}>
          <Text
            style={{
              ...styles.preferences,
              fontSize: fontsize.h6,
              color: colors.text,
            }}>
            Preferences
          </Text>
          <View style={styles.switchBase}>
            <Text
              style={{
                ...styles.darkThemeText,
                fontSize: fontsize.body2,
                color: colors.text,
              }}>
              Dark Theme
            </Text>
            <View style={{paddingRight: 10}}>
              <Switch
                //trackColor={{false: '#767577', true: '#81b0ff'}}
                // thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
                trackColor={{false: colors.text, true: colors.text}}
                //thumbColor={isDarkTheme ? '#f00' : '#00f'}
                value={nativetheme.dark}
                thumbColor={colors.primary}
                onChange={() => toggleTheme()}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <View>
        {user.isLoggedIn && (
          <DrawerItem
            label="Signout"
            icon={({color, size}) => (
              <Icon
                type="material-community"
                name="logout-variant"
                color={color}
                size={size}
              />
            )}
            onPress={onSignOut}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  avatarBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 10,
  },
  avatar: {
    borderWidth: 4,
  },
  preferences: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  switchBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingVertical: 5,
    paddingRight: 10,
  },
  darkThemeText: {
    paddingTop: 10,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
});
