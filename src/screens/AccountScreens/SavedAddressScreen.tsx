import {RouteProp, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AccountStackParamList} from '../../navigator/Stack/AccountStackNavigator';
import {useSelector} from 'react-redux';
import {RootState, store} from '../../assets/redux/store/store';
import {
  deleteAddress,
  setDefaultAddress,
} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {deleteFromFbRTDb} from '../../assets/redux/slices/rest/crud/deleteFromFbRTDb';
import {fbUserPatchRTDb} from '../../assets/redux/slices/rest/crud/fbUserPatchRTDb';
import {ITheme} from '../../assets/globals/theme';
import {ICUserAddress} from '../../assets/globals';
//import {IUserAddresses} from '../../assets/interface';
//import {ButtonGroup, CheckBox} from '@rneui/themed';
//import {HomeStackNavigatorParamList} from '../../../navigator/Stack/HomeStackNavigator';

/*type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AccountStackParamList, 'SavedAddressScreen'>,
  NativeStackNavigationProp<HomeStackNavigatorParamList>
>;*/
interface IProp {
  navigation: NativeStackNavigationProp<
    AccountStackParamList,
    'SavedAddressScreen'
  >;
  //route: RouteProp<{params: {localId: ''; canSelect: false}}>;
  route: RouteProp<AccountStackParamList, 'SavedAddressScreen'>;
}

export default ({route, navigation}: IProp) => {
  console.log('From saved address', route.params.localId);
  console.log('From saved address', route.params.canSelect);
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const [errorMessage, setErrorMessage] = useState('');
  // const [selectedRB, setSelectedRB] = useState();
  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Ok'}]);
    }
  }, [errorMessage]);
  const savedAddresses: typeof ICUserAddress[] =
    user.current.addresses != undefined
      ? Object.values(user.current.addresses)
      : [];

  const deleteExistingAddress = (id: number) => {
    console.log('You pressed okay');
    let url = `${user.current.localId}/addresses/${id}`;
    if (user.current.default_address == id) {
      setErrorMessage('Default address cannot be deleted');
    } else {
      try {
        store.dispatch(deleteAddress({id}));
        deleteFromFbRTDb(url)
          .then(() => {
            ToastAndroid.show('Sucessfully deleted the adderess', 6);
          })
          .catch(() => {
            console.log('Error occured');
          });
      } catch (error: any) {
        console.log('Error occured');
      }
    }
  };
  const confirmDelete = (id: number) => {
    Alert.alert('Confirmation', 'Are you sure you want to delete it', [
      {
        text: 'Yes',
        onPress: () => {
          deleteExistingAddress(id);
        },
      },
      {
        text: 'No',
        onPress: () => {
          ToastAndroid.show('Cancelled', 6);
        },
      },
    ]);
  };
  const NoSavedAddress = () => {
    return (
      <View style={styles.noAddressBase}>
        <Text
          style={{
            ...styles.noAddressText,
            fontSize: fontsize.h5,
            color: colors.text,
          }}>
          No saved address found
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateAddressScreen', {
              localId: route.params.localId,
            })
          }
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            borderWidth: 1,
            borderRadius: 12,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: fontsize.buttonmedium,
              color: colors.text,
            }}>
            Add New Address
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const SavedAddress = () => {
    return (
      <View style={styles.addressBase}>
        <Text
          style={{
            color: colors.accenttext,
            fontSize: fontsize.h6,
          }}>
          Saved Addresses
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateAddressScreen', {
              localId: route.params.localId,
            })
          }>
          <Text
            style={{
              color: colors.accenttext,
              fontSize: fontsize.h6,
              fontWeight: '700',
            }}>
            + Add New Address
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const RenderAddresses = (item: typeof ICUserAddress) => {
    return (
      <View
        style={{
          ...styles.cardBase,
          backgroundColor: colors.backgroundL,
          borderColor: colors.border,
        }}>
        <View key={item.uid} style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flex: 0.6}}
            onPress={() => {
              if (user.current.default_address != item.uid) {
                store.dispatch(setDefaultAddress(item.uid));
                fbUserPatchRTDb({
                  data: {default_address: item.uid},
                  url: user.current.localId,
                })
                  .then(() => {
                    ToastAndroid.show('Address set as default', 6);
                  })
                  .catch(() => {
                    setErrorMessage('Something went wrong');
                  });
              }
            }}>
            <View style={styles.checkBoxBase}>
              <View
                style={
                  user.current.default_address == item.uid
                    ? {
                        ...styles.selectedRb,
                        borderColor: colors.border,
                        backgroundColor: colors.border,
                      }
                    : {...styles.unselectedRb, borderColor: colors.border}
                }></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex: 9.4}}
            onPress={() => {
              if (route.params.canSelect) {
                store.dispatch(setDefaultAddress(item.uid));
                navigation.goBack();
              }
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.grey,
                backgroundColor: colors.backgroundL,
                flex: 1,
              }}>
              <Text style={{...styles.fullname, color: colors.text}}>
                {item.fullname}
              </Text>
              <Text style={{...styles.textRow, color: colors.text}}>
                {item.flatno && item.flatno}
              </Text>

              <Text style={{...styles.textRow, color: colors.text}}>
                {item.apartment && item.apartment}
              </Text>

              <Text style={{...styles.textRow, color: colors.text}}>
                {item.city}, <Text style={styles.textRow}>{item.state}</Text>
              </Text>

              <Text style={{...styles.textRow, color: colors.text}}>
                {item.pincode && `Pincode : ${item.pincode}`}
              </Text>

              <Text style={{...styles.textRow, color: colors.text}}>
                Mobile: {item.mobile && item.mobile}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.iconBase}>
          <View style={styles.icons}>
            <Icon
              name="pencil"
              size={20}
              color={colors.icon}
              onPress={() => {
                navigation.navigate('UpdateAddressScreen', {
                  address: item,
                  localId: route.params.localId,
                  uid: item.uid,
                });
              }}
            />
          </View>

          <View style={styles.icons}>
            <Icon
              name="delete"
              size={20}
              color={colors.icon}
              onPress={() => {
                confirmDelete(item.uid);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.base}>
      {route.params.canSelect && (
        <Text
          style={{
            ...styles.selectDeliveryHeader,
            fontSize: fontsize.h5,
            color: colors.text,
          }}>
          Select Delivery Address
        </Text>
      )}
      {Object.keys(savedAddresses).length > 0 && <SavedAddress />}
      <FlatList
        // data={Object.values(savedAddresses) as IUserAddresses[]}

        data={savedAddresses}
        renderItem={({item}) => RenderAddresses(item)}
        keyExtractor={obj => obj.uid.toString()}
        ListEmptyComponent={NoSavedAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 10,
  },
  cardBase: {
    borderWidth: 1,

    borderRadius: 10,
    padding: 5,
  },
  addressBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginVertical: 5,
  },
  noAddressBase: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    //justifyContent: 'center',
    // textAlignVertical: 'middle',
    // backgroundColor: '#0f0',
  },
  noAddressText: {
    marginVertical: 10,
  },
  fullname: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },

  textRow: {
    paddingVertical: 5,
  },
  iconBase: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icons: {
    paddingHorizontal: 10,
    // borderWidth: 1,
    // width: 40,
    // height: 40,
    // borderRadius: 40 / 2,
  },
  checkBoxBase: {
    marginRight: 10,
  },
  unselectedRb: {
    height: 15,
    width: 15,
    borderRadius: 100,
    borderWidth: 2,

    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  selectDeliveryHeader: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
