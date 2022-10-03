import React from 'react';
import {Button, Text} from '@rneui/themed';
import {ScrollView, StyleSheet, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartStackParamList} from '../navigator/Stack/CartStackNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import {ITheme} from '../assets/globals/theme';

interface IProp {
  navigation: NativeStackNavigationProp<
    CartStackParamList,
    'OrderSummaryScreen'
  >;
  // route: RouteProp<{params: {orderSummary: ICurrentOrders; localId: ''}}>;
  route: RouteProp<CartStackParamList, 'OrderSummaryScreen'>;
}
export default ({navigation, route}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const rp = route.params.orderSummary.items.flat();
  console.log(rp);
  const OrderSummary = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <View>
          <Text
            style={{
              ...styles.titleText,
              fontSize: fontsize.h6,
              color: colors.border,
            }}>
            Items To Order
          </Text>
        </View>

        {route.params.orderSummary.items.map((it, index) => {
          return (
            <View style={styles.row} key={index}>
              <Text
                style={{
                  flex: 2,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {it.name}
              </Text>
              <Text
                style={{
                  flex: 2,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {it.weight}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {it.qty}dfssfsfsdfsf
              </Text>
            </View>
          );
        })}

        <View style={styles.row}>
          <Text
            style={{
              ...styles.titleText,
              fontSize: fontsize.h6,
              color: colors.border,
            }}>
            Total Amount To Pay
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.border,
              fontSize: fontsize.h6,
            }}>
            {'\u20B9'} {route.params.orderSummary.total.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text
            style={{
              ...styles.titleText,
              fontSize: fontsize.h6,
              color: colors.border,
            }}>
            Shipping Address
          </Text>
          <View style={{marginLeft: 15, marginVertical: 10}}>
            <View style={styles.shippingAddressRow}>
              <Text
                style={{
                  ...styles.addressText,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {route.params.orderSummary.address.fullname}
              </Text>
            </View>
            <View style={styles.shippingAddressRow}>
              <Text
                style={{
                  ...styles.addressText,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {route.params.orderSummary.address.flatno},{' '}
              </Text>
              <Text
                style={{
                  ...styles.addressText,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {route.params.orderSummary.address.area}
              </Text>
            </View>
            <View style={styles.shippingAddressRow}>
              <Text
                style={{
                  ...styles.addressText,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {route.params.orderSummary.address.city},
              </Text>
              <Text
                style={{
                  ...styles.addressText,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {route.params.orderSummary.address.pincode}
              </Text>
            </View>
            <View style={styles.shippingAddressRow}>
              <Text
                style={{
                  ...styles.addressText,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                {route.params.orderSummary.address.state}
              </Text>
            </View>
            <View style={styles.shippingAddressRow}>
              <Text
                style={{
                  ...styles.addressText,
                  fontSize: fontsize.body2,
                  color: colors.border,
                }}>
                Mobile no: {route.params.orderSummary.address.mobile}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text
              style={{
                ...styles.titleText,
                fontSize: fontsize.h6,
                color: colors.border,
              }}>
              Delivery Date
            </Text>
            <Text
              style={{
                fontFamily: 'Open Sans',
                fontSize: fontsize.small,
                color: colors.border,
              }}>
              {route.params.orderSummary.deliveryDate}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };
  const PaymentButton = () => {
    return (
      <Button
        type="solid"
        title="Proceed to Payment"
        containerStyle={{
          position: 'absolute',
          bottom: 3,
          right: -5,
          borderRadius: 12,
          marginBottom: 3,
        }}
        titleStyle={{fontSize: fontsize.buttonmedium, color: colors.accenttext}}
        buttonStyle={{backgroundColor: colors.primary}}
        onPress={() => {
          navigation.navigate('PaymentOptionScreen', {
            orderSummary: route.params.orderSummary,
            localId: route.params.localId,
          });
        }}
      />
    );
  };
  return (
    <View style={styles.base}>
      <View
        style={{...styles.headerTextBase, borderBottomColor: colors.border}}>
        <Text
          style={{
            ...styles.headerText,
            fontSize: fontsize.h5,
            color: colors.border,
          }}>
          Order Summary
        </Text>
      </View>
      <OrderSummary />
      <PaymentButton />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {position: 'relative', flex: 1, marginHorizontal: 15},
  headerTextBase: {
    marginVertical: 10,

    borderBottomWidth: 2,
    borderStyle: 'dashed',
    paddingBottom: 15,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  shippingAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
  addressText: {
    letterSpacing: 1.5,
  },
});
