import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Button} from '@rneui/themed';
import {useSelector} from 'react-redux';
import {toTitleCase, Weight} from '../assets/globals';
import {ICurrentOrders, IProduct} from '../assets/interface';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState, store} from '../assets/redux/store/store';
import CartItemManagement from '../components/CartItemManagement';
import {
  FirebaseUserState,
  removeItemFromCart,
} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {CompositeNavigationProp, useTheme} from '@react-navigation/native';
import {AuthStackParamList} from '../navigator/Stack/AuthStackNavigator';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from '../navigator/Stack/HomeStackNavigator';
import {CartStackParamList} from '../navigator/Stack/CartStackNavigator';
import {ITheme, screen_width} from '../assets/globals/theme';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<CartStackParamList, 'CartScreen'>,
  NativeStackNavigationProp<HomeStackNavigatorParamList>
>;
/*type NavigationProp2 = CompositeNavigationProp<
  NativeStackNavigationProp<AccountStackParamList>,
  NativeStackNavigationProp<AuthStackParamList>
>;*/

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList>,
  NavigationProp
  // NavigationProp2
>;

interface IProp {
  //navigation: NativeStackNavigationProp<CartStackParamList>;
  navigation: NavigationProps;
}
export default ({navigation}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const user: FirebaseUserState = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  const products = useSelector(
    (state: RootState) => state.inventoryReducerOfStore.products,
  );

  const itemsInTheCart: IProduct[] = Object.values(products).filter(product => {
    return user.cart != undefined && user.cart[product.id];
  });
  //console.log('From cart screen', user.cart);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    id: 0,
  });
  let itemTotal = 0;
  let grandTotal = 0;
  let taxes = 10;
  let taxeCharge = 0;
  let deliveryCharges = 50;
  //console.log('Cart rendered .....');

  useEffect(() => {
    if (alertMessage.message) {
      Alert.alert('', alertMessage.message, [
        {
          text: 'Ok',
          onPress: () => {
            try {
              store.dispatch(removeItemFromCart({product_id: alertMessage.id}));
            } catch (error: any) {
              setAlertMessage({message: 'Error deleting the product', id: 0});
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            setAlertMessage({message: '', id: 0});
          },
        },
      ]);
      // return;
    }
  }, [alertMessage.message]);
  const prepareItemsSummary = () => {
    return itemsInTheCart.map(item => {
      return Object.getOwnPropertyNames(user.cart[item.id].weights).map(wt => {
        return {
          name: toTitleCase(item.name),
          id: item.id,
          qty: user.cart[item.id].weights[Weight[wt as keyof typeof Weight]],
          weight: Weight[wt as keyof typeof Weight],
          imageURL: item.image_url,
        };
      });
    });
  };
  const prepareOrderSummary = () => {
    let currentorder: ICurrentOrders = {
      // localId: user.current.localId,
      items: prepareItemsSummary().flat(), //.flat(Infinity),
      total: grandTotal,
      deliveryDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 7,
      ).toDateString(),
      orderedDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ).toDateString(),

      address:
        user.current.addresses != undefined &&
        user.current.addresses[user.current.default_address] != undefined
          ? {
              fullname:
                user.current.addresses[user.current.default_address].fullname,
              flatno:
                user.current.addresses[user.current.default_address].flatno,
              area: user.current.addresses[user.current.default_address].area,
              city: user.current.addresses[user.current.default_address].city,
              state: user.current.addresses[user.current.default_address].state,
              pincode:
                user.current.addresses[user.current.default_address].pincode,
              mobile:
                user.current.addresses[user.current.default_address].mobile,
            }
          : {
              fullname: user.current.first_name,
              flatno: '',
              area: '',
              city: user.current.city,
              state: '',
              pincode: 0,
              mobile: user.current.mobile,
            },
    };
    return currentorder;
  };

  const TotalAmountContainer = () => {
    // console.log('refItem.current', prepareOrderSummary());
    return (
      <View style={{...styles.paymentBase, backgroundColor: colors.accent}}>
        <View style={{flex: 6}}>
          <View style={styles.deliveryBase}>
            <View style={styles.deliverAddress}>
              <Text
                style={{
                  ...styles.deliveryAddressText,
                  fontSize: fontsize.body2,
                  color: colors.accenttext,
                  fontWeight: '800',
                }}>
                Deliver to
              </Text>

              <View>
                {user.current.addresses != undefined &&
                user.current.addresses[user.current.default_address] !=
                  undefined ? (
                  <>
                    <Text
                      style={{
                        ...styles.deliveryAddressText,
                        fontSize: fontsize.body2,
                        color: colors.text,
                      }}>
                      {Object.values(
                        user.current.addresses[user.current.default_address]
                          .fullname,
                      )}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          ...styles.deliveryAddressText,
                          fontSize: fontsize.body2,
                          color: colors.text,
                        }}>
                        {Object.values(
                          user.current.addresses[user.current.default_address]
                            .flatno,
                        )}
                        {', '}
                      </Text>

                      <Text
                        style={{
                          ...styles.deliveryAddressText,
                          fontSize: fontsize.body2,
                          color: colors.text,
                        }}>
                        {Object.values(
                          user.current.addresses[user.current.default_address]
                            .city,
                        )}
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text
                    style={{
                      ...styles.deliveryAddressText,
                      fontSize: fontsize.body2,
                      color: colors.accenttext,
                      // paddingBottom: 25,
                    }}>
                    Choose address
                  </Text>
                )}
              </View>
            </View>
            <Icon
              name={'home'}
              size={fontsize.iconsmall}
              color={colors.icon}
              onPress={() => {
                if (user.isLoggedIn) {
                  navigation.navigate('AccountStackNavigator', {
                    screen: 'SavedAddressScreen',
                    params: {
                      localId: user.current.localId,
                      canSelect: true,
                    },
                  });
                } else {
                  ToastAndroid.show('Signin before selecting address', 10);
                }
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            borderTopWidth: 0.5,
          }}>
          <View style={styles.totalAmountBase}>
            <Text
              style={{
                ...styles.totalAmountText,
                fontSize: fontsize.h5,
                color: colors.accenttext,
              }}>
              {'\u20B9'} {grandTotal.toFixed(2)}
            </Text>
            <View style={styles.paymentBtn}>
              <Button
                disabled={
                  user.isLoggedIn &&
                  user.current.addresses != undefined &&
                  user.current.addresses[user.current.default_address] !=
                    undefined
                    ? false
                    : true
                }
                title="Proceed to Order"
                onPress={() => {
                  navigation.navigate('OrderSummaryScreen', {
                    orderSummary: prepareOrderSummary(),
                    localId: user.current.localId,
                  });
                }}
                containerStyle={{borderRadius: 12}}
                titleStyle={{color: colors.text}}
                buttonStyle={{backgroundColor: colors.primary}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const BillDetails = () => {
    //get all products inside cart
    //get total of item by all weights
    // console.log('Showing all items in the cart');
    //console.log(itemsInTheCart[0].units);

    const subTotal = itemsInTheCart.map(item => {
      return Object.getOwnPropertyNames(user.cart[item.id].weights).map(wt => {
        return (
          item.units.find(unit => unit.weight == wt)!.price *
          user.cart[item.id].weights[wt]
        );
      });
    });
    //let flatted = subTotal.flat(Infinity);
    let flatted = subTotal.reduce(
      (acc, cur_value) => acc.concat(cur_value),
      [],
    );
    for (let i = 0; i < flatted.length; i++) {
      itemTotal += flatted[i];
    }

    taxeCharge = (itemTotal * taxes) / 100;
    grandTotal = itemTotal + taxeCharge + deliveryCharges;
    // console.log('Subtotal', itemTotal);
    return itemsInTheCart.length > 0 ? (
      <View
        style={{
          ...styles.billBase,
          borderColor: colors.border,
          backgroundColor: colors.backgroundLL,
        }}>
        <View>
          <Text
            style={{
              ...styles.billText,
              fontSize: fontsize.h5,
              color: colors.text,
            }}>
            Bill Details
          </Text>
        </View>
        <View style={styles.billrow}>
          <Text
            style={{
              ...styles.billText,
              fontSize: fontsize.h6,
              color: colors.text,
            }}>
            Item total
          </Text>
          <Text style={{fontSize: fontsize.body2, color: colors.text}}>
            Rs {itemTotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.billrow}>
          <Text
            style={{
              ...styles.billText,
              fontSize: fontsize.h6,
              color: colors.text,
            }}>
            Taxes and charges (10%)
          </Text>
          <Text style={{fontSize: fontsize.body2, color: colors.text}}>
            Rs {taxeCharge.toFixed(2)}
          </Text>
        </View>
        <View style={styles.billrow}>
          <Text
            style={{
              ...styles.billText,
              fontSize: fontsize.h6,
              color: colors.text,
            }}>
            Delivery charges
          </Text>
          <Text style={{fontSize: fontsize.body2, color: colors.text}}>
            Rs {deliveryCharges}.00
          </Text>
        </View>
        <View style={styles.billrow}>
          <Text
            style={{
              ...styles.billText,
              fontSize: fontsize.h6,
              color: colors.text,
            }}>
            To Pay
          </Text>
          <Text
            style={{
              fontSize: fontsize.h6,
              color: colors.text,
              fontWeight: 'bold',
            }}>
            Rs {(itemTotal + (itemTotal * 10) / 100 + 50).toFixed(2)}
          </Text>
        </View>
      </View>
    ) : (
      <View></View>
    );
  };
  const WBLock = (item: IProduct) => {
    return Object.getOwnPropertyNames(user.cart[item.id].weights).map(wt => {
      return (
        user.cart[item.id].weights[wt] >= 1 && (
          <View key={Math.random()} style={{marginVertical: 2}}>
            <View
              style={{
                borderRadius: 12,
                borderWidth: 1,
                paddingVertical: 10,
                // width: 200,
              }}>
              <View style={styles.priceBase}>
                <Text
                  style={{
                    fontSize: fontsize.body2,
                    color: colors.text,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                  }}>
                  Price {item.units.find(unit => unit.weight == wt)?.price}
                  &#8377;
                </Text>
              </View>

              <View style={styles.weightWithButtonRow}>
                <Text style={{fontSize: fontsize.small, color: colors.text}}>
                  {Weight[wt as keyof typeof Weight]}
                </Text>
                <CartItemManagement
                  item={item}
                  weight={wt}
                  weightInStock={true}
                />
                <Text style={{fontSize: fontsize.small, color: colors.text}}>
                  &#8377;{' '}
                  {item.units.find(unit => unit.weight == wt)!.price *
                    user.cart[item.id].weights[wt]}
                </Text>
              </View>
            </View>
          </View>
        )
      );
    });
  };

  const NoItemInCart = () => {
    return (
      <View>
        <View style={styles.noItemIconBase}>
          <Icon name="basket-off" size={100} color={colors.accenttext} />
          <Text
            style={{
              ...styles.noItemText,
              fontSize: fontsize.body2,
              color: colors.text,
            }}>
            No items in cart
          </Text>
        </View>
        <View style={styles.startShoppingBase}>
          <Button
            title="Start shopping"
            type="solid"
            onPress={() => {
              navigation.navigate('HomeScreen');
              //  console.log('Start shopping');
            }}
            titleStyle={{fontSize: fontsize.h6}}
            color={colors.primary}
          />
        </View>
      </View>
    );
  };
  const CartHeadingToggle = () => {
    if (user.isLoggedIn) {
      return itemsInTheCart.length > 0 ? (
        <View style={styles.loggedUserCartBase}>
          <Text
            style={{
              ...styles.loggedUserCartText,
              fontSize: fontsize.h6,
              color: colors.text,
            }}>
            Items in your cart
          </Text>
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 50,
            borderBottomWidth: 3,
            borderStyle: 'solid',
            paddingBottom: 20,
          }}>
          <Icon
            name="emoticon-sad-outline"
            size={fontsize.iconlarge}
            color={colors.icon}
          />
          <Text
            style={{
              fontSize: fontsize.h5,
              fontWeight: 'bold',
              color: colors.text,
            }}>
            oops..
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.localCartBase}>
          <View style={styles.localCartHeaderRow}>
            <Text
              style={{
                ...styles.localCartHeader,
                fontSize: fontsize.h6,
                color: colors.text,
              }}>
              Yoy are not logged in
            </Text>
            <Text
              style={{
                ...styles.localCartHeader,
                fontSize: fontsize.body2,
                color: colors.text,
              }}>
              Any product added will be locally stored
            </Text>
          </View>
          <View style={styles.localCartMessageRow}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...styles.localCartMessageText,
                    fontSize: fontsize.h6,
                    color: colors.primary,
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => navigation.navigate('SigninScreen')}>
                  Signin
                </Text>
                <Text
                  style={{
                    ...styles.localCartMessageText,
                    color: colors.text,
                    fontSize: fontsize.h6,
                    textAlign: 'center',
                  }}>
                  {' '}
                  to link products to your
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...styles.localCartMessageText,
                    color: colors.text,
                    fontSize: fontsize.h6,
                    textAlign: 'center',
                  }}>
                  account or view products already in your wishlist or cart
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  const CreateCart = (item: IProduct) => {
    return (
      <View
        style={{...styles.loggedUserCart, backgroundColor: colors.background}}>
        <View>
          <Text
            style={{
              ...styles.productName,
              fontSize: fontsize.h6,
              color: colors.text,
            }}>
            {toTitleCase(item.name)}
          </Text>
        </View>
        <View style={styles.rowBase}>
          <View>
            <Image
              source={{uri: item.image_url}}
              resizeMode="contain"
              style={styles.img}
            />
          </View>
          <View style={styles.weightPriceCountBase}>
            <View>{WBLock(item)}</View>
          </View>
          <View
            style={{...styles.iconBase, backgroundColor: colors.background}}>
            <Icon
              name="delete"
              size={20}
              color={colors.accenttext}
              onPress={() => {
                //  console.log('Working');
                setAlertMessage({
                  message: 'Are you sure you want to delete the product',
                  id: item.id,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const Cart = () => {
    return (
      <>
        <View style={styles.base}>
          <CartHeadingToggle />
          <FlatList
            data={itemsInTheCart}
            keyExtractor={obj => obj.id.toString()}
            renderItem={({item}) => CreateCart(item)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={NoItemInCart}
            ListFooterComponent={BillDetails}
          />
          {/* {itemsInTheCart.length > 0 && <BillDetails />} */}
        </View>

        {itemsInTheCart.length > 0 && <TotalAmountContainer />}
      </>
    );
  };

  return <Cart />;
};
const styles = StyleSheet.create({
  base: {
    flex: 8,
    marginHorizontal: 4,
    // position: 'relative',
    //backgroundColor: '#0f0',
  },
  loggedUserCartBase: {
    alignItems: 'center',
    marginVertical: 15,
  },
  loggedUserCartText: {
    fontWeight: 'bold',
  },
  loggedUserCart: {
    borderWidth: 0.5,

    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontWeight: 'bold',
  },
  /* productPrice: {
    fontSize: fontsize.h6,
    color: colors.text,
    fontWeight: 'bold',
    fontStyle: 'italic',
    
  },*/
  rowBase: {
    flexDirection: 'row',
    //paddingHorizontal: 10,
    alignItems: 'center',
  },
  weightPriceCountBase: {
    flex: 1,
    //marginRight: 5,
  },
  /*   rightCol: {
    justifyContent: 'center',
    backgroundColor: '#48f6aa',
  }, */
  priceBase: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#0f0',
    paddingBottom: 10,
  },
  weightWithButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.background.light,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  billBase: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },
  billrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  billText: {
    fontWeight: 'bold',

    fontFamily: 'courier',
  },

  paymentBase: {
    //position: 'absolute',
    // width: '100%',
    //height: screen_height * 0.1,
    // bottom: 0,
    // left: 0,
    // borderWidth: 0.5,
    //backgroundColor: '#f0f',
    flex: 2,
    // height: 85,
    // paddingTop: 10,
    // paddingBottom: 30,
    // paddingVertical: 10,
    //marginBottom: 60,
    // backgroundColor: '#0ff',
  },
  totalAmountBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // flex: 5,
    //backgroundColor: '#0ff',
  },
  totalAmountText: {
    fontFamily: 'calibri',
  },
  paymentBtn: {
    alignSelf: 'flex-end',
    // marginBottom: 3,
  },
  deliveryBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,

    //  flex: 5,
    //backgroundColor: '#0f0',
  },
  deliverAddress: {
    flexDirection: 'column',
  },

  deliveryAddressText: {
    fontFamily: 'Calibri',
  },
  noItemIconBase: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    fontWeight: 'bold',
  },
  startShoppingBase: {
    marginVertical: 20,
    alignItems: 'center',
  },
  startShoppingText: {
    color: '#00f',
  },
  img: {
    //padding:screen_width/3
    width: screen_width / 3,
    height: screen_width / 3,
    marginRight: 10,
  },
  iconBase: {
    alignSelf: 'flex-end',
  },
  spacing: {
    // marginRight: 5,
  },
  localCartBase: {
    marginBottom: 20,
  },
  localCartHeaderRow: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  localCartHeader: {
    fontWeight: 'bold',
  },

  localCartMessageRow: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItem: 'center',
    marginHorizontal: 5,
  },
  /*  localCartSignin: {
    fontSize: fontsize.h5,
    color: colors.primary,
  },*/
  localCartMessageText: {
    fontStyle: 'italic',
    letterSpacing: 1.5,
  },
});
