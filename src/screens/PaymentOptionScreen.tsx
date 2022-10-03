import React, {useEffect, useState} from 'react';
import {Button, CheckBox, Text} from '@rneui/themed';
import {Alert, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartStackParamList} from '../navigator/Stack/CartStackNavigator';
//import {RadioButton} from 'react-native-paper';
import {RouteProp, useTheme} from '@react-navigation/native';
//import {useSelector} from 'react-redux';
//import {RootState} from '../assets/redux/store/store';
//import {fbUserPatchRTDb} from '../assets/redux/slices/rest/crud/fbUserPatchRTDb';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {ITheme} from '../assets/globals/theme';
import PaymentOnlineScreen from './PaymentOnlineScreen';
import ActivityIndicatorWheel from '../components/ActivityIndicatorWheel';
interface IProp {
  navigation: NativeStackNavigationProp<
    CartStackParamList,
    'PaymentOptionScreen'
  >;
  // route: RouteProp<{params: {orderSummary: ICurrentOrders; localId: ''}}>;
  route: RouteProp<CartStackParamList, 'PaymentOptionScreen'>;
}
export default ({navigation, route}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [isCashPayment, setIsCashPayment] = useState(false);
  const [isUpiPayment, setIsUpiPayment] = useState(false);
  const [isCardPayment, setIsCardPayment] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  //const [onPlaceOrder, setOnPlaceOrder] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);

      return;
    }
  }, [errorMessage]);
  /* const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );*/
  // console.log(route.params.orderSummary);
  /*const PaymentMethod = () => {
    return (
      <>
      
        <Text
          style={{
            ...styles.header,
            fontSize: fontsize.h6,
            color: colors.accenttext,
          }}>
          Select a payment method
        </Text>
        <View style={styles.paymentMethodBase}>
          <View style={styles.paymentMethodRow}>
            <RadioButton
              value="1"
              color={colors.accenttext}
              uncheckedColor={colors.border}
              onPress={() => {}}
            />
            <Text
              style={{
                ...styles.paymentMethodText,
                fontSize: fontsize.body2,
                color: colors.accenttext,
              }}>
              UPI Ids/Net Banking
            </Text>
          </View>
          <View style={styles.paymentMethodRow}>
            <RadioButton
              value="2"
              color={colors.accenttext}
              uncheckedColor={colors.border}
              onPress={() => {}}
            />
            <Text
              style={{
                ...styles.paymentMethodText,
                fontSize: fontsize.body2,
                color: colors.accenttext,
              }}>
              Debit/Credit/ATM Card
            </Text>
          </View>
          <View style={styles.paymentMethodRow}>
            <RadioButton
              value="3"
              color={colors.accenttext}
              uncheckedColor={colors.border}
              status="checked"
              onPress={() => {}}
            />
            <Text
              style={{
                ...styles.paymentMethodText,
                fontSize: fontsize.body2,
                color: colors.accenttext,
              }}>
              Pay on Delivery
            </Text>
          </View>
        </View>
      </>
    );
  };*/
  const PaymentMethod = () => {
    return (
      <>
        <Text
          style={{
            ...styles.header,
            fontSize: fontsize.h6,
            color: colors.accenttext,
          }}>
          Select a payment method
        </Text>
        <View style={styles.paymentMethodBase}>
          <View style={styles.paymentMethodRow}>
            <CheckBox
              title="UPI Ids/Net Banking"
              checked={isUpiPayment}
              iconType="material-community"
              checkedIcon="record-circle-outline"
              uncheckedIcon="circle-outline"
              onPress={() => {
                setIsUpiPayment(true);
                setIsCardPayment(false);
                setIsCashPayment(false);
              }}
            />
          </View>
          <View style={styles.paymentMethodRow}>
            <CheckBox
              title="Debit/Credit/ATM Card"
              checked={isCardPayment}
              iconType="material-community"
              checkedIcon="record-circle-outline"
              uncheckedIcon="circle-outline"
              onPress={() => {
                setIsCardPayment(true);
                setIsUpiPayment(false);
                setIsCashPayment(false);
              }}
            />
          </View>

          <View style={styles.paymentMethodRow}>
            <CheckBox
              title="Pay on Delivery"
              checked={isCashPayment}
              iconType="material-community"
              checkedIcon="record-circle-outline"
              uncheckedIcon="circle-outline"
              onPress={() => {
                setIsOnlinePayment(false);
                setIsCashPayment(true);
                setIsCardPayment(false);
                setIsUpiPayment(false);
              }}
            />
          </View>
        </View>
      </>
    );
  };

  const onPlaceOrderPress = () => {
    //user.current.current_order_id
    // user.current.all_orders
    //  let uuid = nanoid(8);
    // let trackingId = nanoid(10);
    // fbUserPatchRTDb({
    //const orderdata = {
    //all_orders: {
    // [uuid]: {
    //orderSummary : route.params.orderSummary,
    //  id: uuid,
    //   current_order_id: uuid,
    //   trackingId,
    // },
    //  },
    // cart: {},
    //};
    //url: user.current.localId,
    // })
    //  .then(() => {

    //  })
    //  .catch((error: any) => {});
    if (isUpiPayment || isCardPayment) {
      setIsOnlinePayment(true);
    } else if (isCashPayment) {
      console.log('This is cash delivery');
      navigation.navigate('OrderPlacedScreen', {
        orderdata: route.params.orderSummary,
        localId: route.params.localId,
        trackingId: nanoid(10),
      });
    }
  };

  const onPaymentSuccess = (paymentResponse: string) => {
    console.log('Payment done', paymentResponse);
    navigation.navigate('OrderPlacedScreen', {
      orderdata: route.params.orderSummary,
      localId: route.params.localId,
      trackingId: nanoid(10),
    });
  };
  const progressStatus = (param: boolean) => {
    setInProgress(param);
  };
  const onPaymentCancel = () => {
    setIsOnlinePayment(false);
    setIsCardPayment(false);
    Alert.alert('Payment Cancelled', 'Payment is Failed! Cancelled by user', [
      {text: 'okay'},
    ]);
    console.log('Payment cancelled');

    /*  navigation.navigate('OrderPlacedScreen', {
      orderdata: route.params.orderSummary,
      localId: route.params.localId,
      trackingId: nanoid(10),
    });
*/
    // setOnPlaceOrder(true);
  };
  const onPaymentFailed = (failedResponse: string) => {
    setIsOnlinePayment(false);
    setIsCardPayment(false);
    Alert.alert('Payment Failed!', `Payment is Failed ${failedResponse}`, [
      {text: 'okay'},
    ]);
  };

  const PayButton = () => {
    return (
      /*    <View
        style={{
          flex: 1,
          // backgroundColor: '#0ff',
          flexDirection: 'column-reverse',
        }}>
        <View style={styles.OrderAndPayBtnRow}>
          <Button
            type="solid"
            color={colors.buttons}
            title="Order, Cash on Delivery"
            onPress={() => {
              //navigation.navigate('PaymentScreen');
            }}
          /> */
      <Button
        type="solid"
        title="Place Order"
        disabled={isCashPayment || isUpiPayment || isCardPayment ? false : true}
        containerStyle={{
          position: 'absolute',
          bottom: 3,
          right: -5,
          borderRadius: 12,
        }}
        titleStyle={{fontSize: fontsize.buttonmedium, color: colors.accenttext}}
        buttonStyle={{backgroundColor: colors.primary}}
        onPress={onPlaceOrderPress}
      />
    );
  };

  return (
    <>
      <View style={styles.base}>
        {isOnlinePayment ? (
          isCardPayment ? (
            <PaymentOnlineScreen
              amount={route.params.orderSummary.total}
              onPaymentCancel={onPaymentCancel}
              onPaymentFailed={onPaymentFailed}
              onPaymentSuccess={onPaymentSuccess}
              lodingStatus={progressStatus}
              setError={param => setErrorMessage(param)}
            />
          ) : (
            <View>
              <Text>UPI Payments</Text>
            </View>
          )
        ) : (
          <>
            <PaymentMethod />
            <PayButton />
          </>
        )}
      </View>
      {inProgress && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  base: {
    //  position: 'relative',
    flex: 1,
    marginHorizontal: 15 /* backgroundColor: '#0f0' */,
  },
  header: {
    alignSelf: 'center',
    fontWeight: 'bold',

    marginVertical: 15,
  },
  paymentMethodBase: {
    marginVertical: 15,
  },
  paymentMethodRow: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginVertical: 15,
  },
  OrderAndPayBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
});
