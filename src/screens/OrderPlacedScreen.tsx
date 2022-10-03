import React, {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, ToastAndroid, View} from 'react-native';
import {Button, Icon, Text} from '@rneui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartStackParamList} from '../navigator/Stack/CartStackNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import {fbUserPatchRTDb} from '../assets/redux/slices/rest/crud/fbUserPatchRTDb';
import ActivityIndicatorWheel from '../components/ActivityIndicatorWheel';
import {RootState, store} from '../assets/redux/store/store';
import {cartToCurrentOrder} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {useSelector} from 'react-redux';
import {ITheme} from '../assets/globals/theme';

interface IProp {
  navigation: NativeStackNavigationProp<
    CartStackParamList,
    'OrderPlacedScreen'
  >;
  /* route: RouteProp<{
    params: {orderdata: ICurrentOrders; localId: ''; trackingId: ''};
  }>;*/

  route: RouteProp<CartStackParamList, 'OrderPlacedScreen'>;
}

export default ({navigation, route}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  /********************enable this const [orderComplete, setOrderComplete] = useState(false); enable this*************************************************************************************************************************/

  const [orderComplete, setOrderComplete] = useState(true);

  // const [trackingId, setTrackingId] = useState('');
  let trackingId = `AF${route.params.trackingId}BPL`;
  /* const onBackButtonPressAndroid = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    /* BackHandler.removeEventListener(
      'hardwareBackPress',
      onBackButtonPressAndroid,
    );*/
  /* navigation.reset({
      index: 0,
      routes: [{name: 'CartScreen'}],
    });
    return true;
  };*/
  useEffect(() => {
    let uuid = nanoid(8);
    //  (setTrackingId(nanoid(10)),
    //console.log(user.current.all_orders);
    /***********************************************************************************************************************enable this
    !orderComplete &&
      fbUserPatchRTDb({
        data: {
          current_order_id: user.current.current_order_id
            ? [...user.current.current_order_id, uuid]
            : [uuid],
          all_orders: {
            ...user.current.all_orders,
            [uuid]: {
              ...route.params.orderdata,
              current_order_id: uuid,
              trackingId,
            },
          },

          cart: {},
        },
        url: route.params.localId,
      })
        .then(() => {
          store.dispatch(
            cartToCurrentOrder({
              current_order_id: uuid,
              all_orders: {
                [uuid]: {
                  ...route.params.orderdata,
                  current_order_id: uuid,
                  trackingId,
                },
              },
            }),
          ),
          setOrderComplete(true);
          enable this*************************************************************************************************************************/
    /* BackHandler.addEventListener(
            'hardwareBackPress',
            onBackButtonPressAndroid,
          );*/
    /////////////////////////////////////////////////////////////////////////////////////////////////// enable this })
    //////////////////////////////////////////////////////////////////////////////////////////enable this   .catch(() => {});
    /* return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      );*/
  }, []);
  // user.loading

  return !orderComplete ? (
    <View style={styles.indicatorWheel}>
      <ActivityIndicatorWheel />
    </View>
  ) : (
    <View style={styles.base}>
      <View>
        <Icon
          type="material-community"
          name="checkbox-marked-circle"
          size={96}
          color={colors.primary}
        />
      </View>
      <View style={styles.textBase}>
        <Text style={{fontSize: fontsize.h3, color: colors.accenttext}}>
          Success
        </Text>
        <Text style={{fontSize: fontsize.h5, color: colors.accenttext}}>
          Your Order Placed Sucessfully
        </Text>
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: fontsize.h6, color: colors.accenttext}}>
          Your tacking ID is{' '}
          <Text
            style={{color: colors.text, fontWeight: '800'}}
            onPress={() => {}}>
            {trackingId}
          </Text>
        </Text>
      </View>
      <View>
        <Button
          type="solid"
          title="Home"
          containerStyle={{marginBottom: 25, borderRadius: 12}}
          buttonStyle={{backgroundColor: colors.primary}}
          titleStyle={{
            padding: 10,
            fontSize: fontsize.buttonmedium,
            color: colors.accenttext,
          }}
          onPress={() => {
            navigation.navigate('HomeFromCartScreen');
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          type="outline"
          title="Track Order"
          color={colors.error}
          containerStyle={{
            marginHorizontal: 15,
            borderRadius: 8,
            borderWidth: 0.4,
          }}
        />
        <Button
          type="outline"
          title="Past Order"
          color={colors.error}
          containerStyle={{
            marginHorizontal: 15,
            borderRadius: 8,
            borderWidth: 0.4,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBase: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bigText: {
    fontWeight: 'bold',
  },
  mediumText: {
    fontWeight: 'bold',
  },

  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    //backgroundColor: '#f00',
  },
});
