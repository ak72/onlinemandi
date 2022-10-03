import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ITheme} from '../assets/globals/theme';

import {IProduct} from '../assets/interface';
import {localCartCRU} from '../assets/redux/slices/asyncLocalStorage';
import {
  addItemToCart,
  increaseItemQty,
  decreaseItemQty,
  removeItemFromCart,
} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {deleteFromFbRTDb} from '../assets/redux/slices/rest/crud/deleteFromFbRTDb';
import {fbUserPatchRTDb} from '../assets/redux/slices/rest/crud/fbUserPatchRTDb';

import {RootState, store} from '../assets/redux/store/store';
interface IProp {
  item: IProduct;
  weight: string;
  weightInStock: boolean;
}

export default ({item, weight, weightInStock}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );

  /*const cart: IUserCart = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore.cart,
  );*/

  return (
    <View style={styles.base}>
      {item.inStock ? (
        weightInStock ? (
          user.cart[item.id] != undefined &&
          user.cart[item.id].weights[weight] != undefined &&
          user.cart[item.id].weights[weight] >= 1 ? (
            <View style={styles.allClicks}>
              <TouchableOpacity
                onPress={() => {
                  user.cart[item.id].total_count == 1
                    ? (store.dispatch(
                        removeItemFromCart({
                          product_id: item.id,
                        }),
                      ),
                      user.isLoggedIn
                        ? deleteFromFbRTDb(
                            `${user.current.localId}/cart/${item.id}`,
                          )
                        : AsyncStorage.getItem('cart').then(_cart => {
                            if (_cart) {
                              const toJSON = JSON.parse(_cart);
                              delete toJSON[item.id];
                              localCartCRU(toJSON);
                            }
                          }))
                    : (store.dispatch(
                        decreaseItemQty({
                          product_id: item.id,
                          weight,
                        }),
                      ),
                      user.isLoggedIn
                        ? fbUserPatchRTDb({
                            data: {
                              weights: {
                                ...user.cart[item.id].weights,
                                [weight]:
                                  +user.cart[item.id].weights[weight] + +-1,
                              },
                              total_count:
                                +user.cart[item.id].total_count + +-1,
                            },
                            url: `${user.current.localId}/cart/${item.id}`,
                          })
                        : localCartCRU({
                            ...user.cart,
                            ...{
                              [item.id]: {
                                product_id: item.id,
                                weights: {
                                  ...user.cart[item.id].weights,
                                  [weight]:
                                    +user.cart[item.id].weights[weight] + +-1,
                                },
                                total_count:
                                  +user.cart[item.id].total_count + +-1,
                              },
                            },
                          }));
                }}>
                <View
                  style={{
                    ...styles.minusClick,
                    backgroundColor: colors.primary,
                  }}>
                  <Text style={{fontSize: fontsize.h4, color: colors.text}}>
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.quantityTextBase}>
                <Text style={{color: colors.text}}>
                  {user.cart[item.id].weights[weight]}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  user.cart[item.id].weights[weight] < 8
                    ? (store.dispatch(
                        increaseItemQty({
                          product_id: item.id,
                          weight,
                        }),
                      ),
                      user.isLoggedIn
                        ? fbUserPatchRTDb({
                            data: {
                              weights: {
                                ...user.cart[item.id].weights,
                                [weight]:
                                  +user.cart[item.id].weights[weight] + +1,
                              },
                              total_count: +user.cart[item.id].total_count + +1,
                            },
                            url: `${user.current.localId}/cart/${item.id}`,
                          })
                        : localCartCRU({
                            ...user.cart,
                            ...{
                              [item.id]: {
                                product_id: item.id,
                                weights: {
                                  ...user.cart[item.id].weights,
                                  [weight]:
                                    +user.cart[item.id].weights[weight] + +1,
                                },
                                total_count:
                                  +user.cart[item.id].total_count + +1,
                              },
                            },
                          }))
                    : ToastAndroid.show(
                        'Maximum allowed quantity reached',
                        ToastAndroid.SHORT,
                      );
                }}>
                <View
                  style={{
                    ...styles.plusClick,
                    backgroundColor: colors.primary,
                  }}>
                  <Text style={{fontSize: fontsize.h4, color: colors.text}}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                store.dispatch(
                  addItemToCart({
                    product_id: item.id,
                    weight,
                  }),
                );
                if (user.isLoggedIn) {
                  user.cart[item.id] != undefined
                    ? fbUserPatchRTDb({
                        data: {
                          product_id: item.id,
                          weights: {
                            ...user.cart[item.id].weights,
                            [weight]: 1,
                          },
                          total_count: +user.cart[item.id].total_count + +1,
                        },
                        url: `${user.current.localId}/cart/${item.id}`,
                      })
                    : fbUserPatchRTDb({
                        data: {
                          product_id: item.id,
                          weights: {
                            [weight]: 1,
                          },
                          total_count: 1,
                        },
                        url: `${user.current.localId}/cart/${item.id}`,
                      });
                } else {
                  user.cart[item.id] != undefined
                    ? localCartCRU({
                        ...user.cart,
                        [item.id]: {
                          product_id: item.id,
                          weights: {
                            ...user.cart[item.id].weights,
                            [weight]: 1,
                          },
                          total_count: +user.cart[item.id].total_count + +1,
                        },
                      })
                    : localCartCRU({
                        ...user.cart,
                        [item.id]: {
                          product_id: item.id,
                          weights: {
                            [weight]: 1,
                          },
                          total_count: 1,
                        },
                      });
                }
              }}>
              <View
                style={{
                  ...styles.addItemClick,
                  backgroundColor: colors.primary,
                }}>
                <Text
                  style={{
                    ...styles.addItemText,
                    fontSize: fontsize.small,
                    color: colors.text,
                  }}>
                  Add Item
                </Text>
              </View>
            </TouchableOpacity>
          )
        ) : (
          <View style={styles.outOfStock}>
            <Text
              style={{
                ...styles.outOfStockText,
                fontSize: fontsize.small,
                color: colors.text,
              }}>
              Weight is out of Stock
            </Text>
          </View>
        )
      ) : (
        <View style={styles.outOfStock}>
          <Text
            style={{
              ...styles.outOfStockText,
              fontSize: fontsize.small,
              color: colors.text,
            }}>
            Out of Stock
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    //flex: 0.5
  },
  allClicks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addItemClick: {
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  minusClick: {
    paddingHorizontal: 10,
  },
  plusClick: {
    paddingHorizontal: 10,
  },
  /* minusText: {fontSize: font.size.xlarge, color: colors.text.white},
  plusText: {fontSize: font.size.xlarge, color: colors.text.white}, */
  addItemText: {
    textAlign: 'center',
    padding: 2,
  },
  quantityTextBase: {marginHorizontal: 10},
  outOfStock: {
    //backgroundColor: colors.background.grey,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  outOfStockText: {
    textAlign: 'center',
  },
});
