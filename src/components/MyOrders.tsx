import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ITheme} from '../assets/globals/theme';
import {RootState} from '../assets/redux/store/store';
import ActivityIndicatorWheel from './ActivityIndicatorWheel';

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  const [tabCO, setTabCO] = useState(true);
  const CreateTab = () => {
    return (
      <View style={styles.tabBase}>
        <TouchableNativeFeedback onPress={() => setTabCO(true)}>
          <View
            style={{
              ...styles.tab,
              backgroundColor: tabCO ? colors.primary : colors.grey,
            }}>
            <Text
              style={{
                ...styles.tabText,
                fontSize: fontsize.h6,
                fontWeight: tabCO ? '100' : '800',
                color: tabCO ? colors.text : colors.accenttext,
              }}>
              Current Order
            </Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => setTabCO(false)}>
          <View
            style={{
              ...styles.tab,
              backgroundColor: tabCO ? colors.grey : colors.primary,
            }}>
            <Text
              style={{
                ...styles.tabText,
                fontSize: fontsize.h6,
                fontWeight: tabCO ? '800' : '100',
                color: tabCO ? colors.accenttext : colors.text,
              }}>
              Past Orders
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  const TabContentOnSelection = () => {
    if (tabCO) {
      return user.current.current_order_id != undefined &&
        user.current.current_order_id.length > 0 ? (
        Object.values(user.current.current_order_id).map(id => {
          if (user.current.all_orders[id] != undefined) {
            return (
              <View
                key={id + Math.random().toString()}
                style={{
                  ...styles.rowBase,
                  borderColor: colors.border,
                  backgroundColor: colors.backgroundL,
                }}>
                <View
                  style={{
                    ...styles.rowHeader,
                    backgroundColor: colors.backgroundLL,
                  }}>
                  <View>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      Order Placed
                    </Text>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      {user.current.all_orders[id].orderedDate}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      Total{' '}
                    </Text>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      {'\u20B9'} {user.current.all_orders[id].total.toFixed(2)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      Ship To{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: fontsize.h6,
                        color: colors.text,
                        fontWeight: 'bold',
                      }}>
                      {/* {user.current.all_orders[id].address.fullname} */}
                      Anurag Kanchan
                    </Text>
                  </View>
                </View>
                <View style={styles.rowContent}>
                  <Text
                    style={{
                      fontSize: fontsize.h5,
                      fontWeight: 'bold',
                      color: colors.text,
                      letterSpacing: 1.2,
                    }}>
                    Delivery on {user.current.all_orders[id].deliveryDate}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontsize.body2,
                      fontWeight: '700',
                      color: colors.text,
                    }}>
                    Indore
                  </Text>
                  <View>
                    {Object.values(user.current.all_orders[id].items).map(
                      item => {
                        return (
                          <View style={styles.contentCol}>
                            <Image
                              source={{
                                uri: item.imageURL,
                              }}
                              style={styles.img}
                              resizeMode="contain"
                            />
                            <View style={{marginLeft: 50}}>
                              <Text
                                style={{
                                  fontSize: fontsize.h6,
                                  fontWeight: 'bold',
                                  color: colors.text,
                                }}>
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  flex: 3,
                                  fontSize: fontsize.body2,
                                  color: colors.text,
                                }}>
                                Weight: {item.weight}
                              </Text>
                              <Text
                                style={{
                                  flex: 2,
                                  fontSize: fontsize.body2,
                                  color: colors.text,
                                }}>
                                Quantity: {item.qty}
                              </Text>
                            </View>
                          </View>
                        );
                      },
                    )}
                  </View>
                </View>
              </View>
            );
          } else {
            return <View></View>;
          }
        })
      ) : (
        <View style={{alignItems: 'center', marginTop: 25}}>
          <Text style={{fontSize: fontsize.h5, color: colors.text}}>
            You dont have any current order
          </Text>
        </View>
      );
    } else {
      return user.current.past_order_ids != undefined &&
        user.current.past_order_ids.length > 0 ? (
        Object.values(user.current.past_order_ids).map(id => {
          if (user.current.all_orders[id] != undefined) {
            return (
              <View
                key={user.current.all_orders[id].id}
                style={{
                  ...styles.rowBase,
                  borderColor: colors.border,
                  backgroundColor: colors.backgroundL,
                }}>
                <View style={styles.rowHeader}>
                  <View>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      Order Placed
                    </Text>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      {user.current.all_orders[id].orderedDate}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      Total{' '}
                    </Text>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      {'\u20B9'} {user.current.all_orders[id].total.toFixed(2)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: fontsize.h6, color: colors.text}}>
                      Shipped To{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: fontsize.h6,
                        color: colors.text,
                        fontWeight: 'bold',
                      }}>
                      {/* {user.current.all_orders[id].address.fullname} */}
                      Anurag Kanchan
                    </Text>
                  </View>
                </View>
                <View style={styles.rowContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: fontsize.h6,
                          fontWeight: 'bold',
                          color: colors.text,
                          letterSpacing: 1.2,
                        }}>
                        Delivered on {user.current.all_orders[id].deliveryDate}
                      </Text>
                      <Text
                        style={{
                          fontSize: fontsize.body2,
                          fontWeight: '700',
                          color: colors.grey,
                        }}>
                        Indore
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: fontsize.h5,
                          fontWeight: 'bold',
                          color: colors.text,
                          textAlign: 'right',
                        }}>
                        OrderId
                      </Text>
                      <Text>{user.current.all_orders[id].trackingID}</Text>
                    </View>
                  </View>
                  <View>
                    <View style={{marginVertical: 10, borderTopWidth: 1}}>
                      <Text>ITEMS</Text>
                    </View>

                    {Object.values(user.current.all_orders[id].items).map(
                      item => {
                        return (
                          <View style={styles.contentCol}>
                            <View
                              style={{
                                marginLeft: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flex: 1,
                              }}>
                              <Text
                                style={{
                                  fontSize: fontsize.h5,
                                  fontWeight: 'bold',
                                  color: colors.text,
                                  flex: 3,
                                }}>
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  flex: 3,
                                  fontSize: fontsize.body2,
                                  color: colors.text,
                                }}>
                                Weight: {item.weight}
                              </Text>
                              <Text
                                style={{
                                  flex: 2,
                                  fontSize: fontsize.body2,
                                  color: colors.text,
                                }}>
                                Quantity: {item.qty}
                              </Text>
                            </View>
                          </View>
                        );
                      },
                    )}
                  </View>
                </View>
              </View>
            );
          } else {
            return <View></View>;
          }
        })
      ) : (
        <View style={{alignItems: 'center', marginTop: 25}}>
          <Text style={{fontSize: fontsize.h5, color: colors.text}}>
            You dont have any past order record
          </Text>
        </View>
      );
    }
  };

  return user.loading ? (
    <View style={styles.indicatorWheel}>
      <ActivityIndicatorWheel />
    </View>
  ) : (
    <View style={{...styles.base, backgroundColor: colors.background}}>
      <CreateTab />
      <ScrollView showsVerticalScrollIndicator={false}>
        {TabContentOnSelection()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 5,
  },
  tabBase: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 5,
  },
  tabText: {
    marginLeft: 5,
    letterSpacing: 1.2,
  },
  rowBase: {
    // height: 200,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 15,
    //marginBottom: 10,
  },
  rowHeader: {
    // flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 20,
  },
  //rowHeaderText: {

  // },
  rowContent: {
    // flex: 6,
    //justifyContent: 'center',
    padding: 20,
  },
  contentCol: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img: {width: 100, height: 100},
  // wtQtyText: {},
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
});
