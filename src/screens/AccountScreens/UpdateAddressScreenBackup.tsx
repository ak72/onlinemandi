import {RouteProp} from '@react-navigation/native';
//import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ICUserAddress} from '../../assets/globals';
import {colors} from '../../assets/globals/style';
import {createUpdateAddress} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPatchRTDb} from '../../assets/redux/slices/rest/crud/fbUserPatchRTDb';
import {store} from '../../assets/redux/store/store';
import {AccountStackParamList} from '../../navigator/Stack/AccountStackNavigator';

interface IProp {
  // navigation: NativeStackNavigationProp<HomeStackNavigatorParamList>;
  // route: RouteProp<{params: {address: {}; localId: ''; uid: 0}}>;
  route: RouteProp<AccountStackParamList, 'UpdateAddressScreen'>;
}

export default ({route}: IProp) => {
  const item = route.params.address as typeof ICUserAddress;
  const [emptyNameError, setEmptyNameError] = useState('');
  const [emptyHouseNoError, setEmptyHouseNoError] = useState('');
  const [emptyStreetError, setEmptyStreetError] = useState('');
  const [emptyCityError, setEmptyCityError] = useState('');
  const [emptyStateError, setEmptyStateError] = useState('');
  const [emptyPinError, setEmptyPinError] = useState('');
  const [emptyMobileError, setEmptyMobileError] = useState('');
  const [address, setAddress] = useState({
    fullname: '',
    flatno: '',
    apartment: '',
    street: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: 0,
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    mobile: 0,
    uid: 0,
  });

  useEffect(() => {
    setAddress({
      fullname: item.fullname,
      flatno: item.flatno,
      apartment: item.apartment,
      street: item.street,
      landmark: item.landmark,
      area: item.area,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      mobile: item.mobile,
      uid: item.uid,
    });
  }, []);
  const captureUpdatedValues = () => {
    return {
      fullname: address.fullname,
      flatno: address.flatno,
      apartment: address.apartment,
      street: address.street,
      landmark: address.landmark,
      area: address.area,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      mobile: address.mobile,
      uid: address.uid,
    };
  };
  var hasNumber = /\d/;
  const checkErrors = () => {
    if (address.fullname == '') {
      setEmptyNameError('Name is required');
      return false;
    } else {
      setEmptyNameError('');
    }
    if (address.flatno == '') {
      setEmptyHouseNoError('Flat/House no required');
      return false;
    } else {
      setEmptyHouseNoError('');
    }
    if (address.street == '') {
      setEmptyStreetError('Street details are required');
      return false;
    } else {
      setEmptyStreetError('');
    }
    if (address.city == '') {
      setEmptyCityError('City is required');
      return false;
    } else if (hasNumber.test(address.city)) {
      setEmptyCityError('Invalid city name');
      return false;
    } else {
      setEmptyCityError('');
    }
    if (address.state == '') {
      setEmptyStateError('State is required');
      return false;
    } else {
      setEmptyStateError('');
    }
    if (address.pincode == 0) {
      setEmptyPinError('Pin code is required');
      return false;
    } else if (address.pincode < 6) {
      setEmptyPinError('Invalid pin code');
      return false;
    } else {
      setEmptyPinError('');
    }
    if (address.mobile == 0) {
      setEmptyMobileError('Mobile number is required');
      return false;
    } else if (address.mobile < 10) {
      setEmptyMobileError('Invalid mobile number');
      return false;
    } else {
      setEmptyMobileError('');
    }
    return true;
  };
  const updateAddress = async () => {
    if (checkErrors()) {
      let id = route.params.uid;
      const add = {
        [id]: captureUpdatedValues(),
      };
      try {
        store.dispatch(createUpdateAddress(add));
      } catch (error) {
        console.log('Error in updatescreen', error);
      }
      try {
        await fbUserPatchRTDb({
          data: captureUpdatedValues(),
          url: `${route.params.localId}/address/${route.params.uid}`,
        });
      } catch (error) {
        console.log('Error in updatescreen', error);
      }

      ToastAndroid.show('Address updated', 10);
    }
  };
  const renderAddress = () => {
    return (
      <View style={styles.addressBase}>
        <View style={styles.addressHeaderBase}>
          <Text style={styles.addressTitle}>Update Address</Text>
        </View>
        <View style={styles.addressBlock}>
          <View style={{marginTop: 10}}>
            <Text style={styles.label}>
              Fullname<Text style={styles.asterik}> *</Text>
            </Text>
            <TextInput
              maxLength={25}
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={text => {
                setAddress({...address, fullname: text});
              }}
              value={address.fullname}
              placeholder=""
              style={styles.textInputRow}
            />
            <Text style={styles.errorText}>{emptyNameError}</Text>
          </View>

          <View style={styles.inputWithLabelRow}>
            <View style={{flex: 1, marginTop: 10}}>
              <Text style={styles.label}>Apartment name</Text>
              <TextInput
                maxLength={20}
                keyboardType="default"
                onChangeText={text => {
                  setAddress({...address, apartment: text});
                }}
                value={address.apartment}
                placeholder="                    "
                style={{...styles.textInputRow, marginRight: 20}}
              />
            </View>

            <View style={{flex: 1, marginTop: 10}}>
              <Text style={styles.label}>
                House/Flat No<Text style={styles.asterik}> *</Text>
              </Text>
              <TextInput
                maxLength={12}
                keyboardType="default"
                onChangeText={text => {
                  setAddress({...address, flatno: text});
                }}
                value={address.flatno}
                placeholder="              "
                style={styles.textInputRow}
              />
              <Text style={styles.errorText}>{emptyHouseNoError}</Text>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.label}>
              Street detail<Text style={styles.asterik}> *</Text>
            </Text>
            <TextInput
              maxLength={35}
              keyboardType="default"
              onChangeText={text => {
                setAddress({...address, street: text});
              }}
              value={address.street}
              placeholder=""
              style={styles.textInputRow}
            />
            <Text style={styles.errorText}>{emptyStreetError}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.label}>Landmark</Text>
            <TextInput
              maxLength={35}
              keyboardType="default"
              onChangeText={text => {
                setAddress({...address, landmark: text});
              }}
              value={address.landmark}
              placeholder=""
              style={styles.textInputRow}
            />
          </View>
          <View style={styles.inputWithLabelRow}>
            <View style={{flex: 1, marginTop: 10}}>
              <Text style={styles.label}>Area</Text>
              <TextInput
                maxLength={35}
                keyboardType="default"
                onChangeText={text => {
                  setAddress({...address, area: text});
                }}
                value={address.area}
                placeholder="                                                                  "
                style={{...styles.textInputRow, marginRight: 20}}
              />
            </View>

            <View style={{flex: 1, marginTop: 10}}>
              <Text style={styles.label}>
                City<Text style={styles.asterik}> *</Text>
              </Text>
              <TextInput
                maxLength={20}
                keyboardType="default"
                onChangeText={text => {
                  setAddress({...address, city: text});
                }}
                value={address.city}
                placeholder="                                                                     "
                style={styles.textInputRow}
              />
              <Text style={styles.errorText}>{emptyCityError}</Text>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.label}>
              State<Text style={styles.asterik}> *</Text>
            </Text>
            <TextInput
              maxLength={20}
              keyboardType="default"
              onChangeText={text => {
                setAddress({...address, state: text});
              }}
              value={address.state}
              placeholder=""
              style={styles.textInputRow}
            />
            <Text style={styles.errorText}>{emptyStateError}</Text>
          </View>
          <View style={styles.inputWithLabelRow}>
            <View style={{flex: 1, marginTop: 10}}>
              <Text style={styles.label}>
                Pincode<Text style={styles.asterik}> *</Text>
              </Text>
              <TextInput
                maxLength={6}
                keyboardType="numeric"
                onChangeText={text => {
                  setAddress({
                    ...address,
                    pincode: parseInt(text),
                  });
                }}
                value={address.pincode.toString()}
                placeholder=""
                style={{...styles.textInputRow, marginRight: 20}}
              />
              <Text style={styles.errorText}>{emptyPinError}</Text>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <Text style={styles.label}>
                Mobile no<Text style={styles.asterik}> *</Text>
              </Text>
              <TextInput
                maxLength={10}
                keyboardType="number-pad"
                onChangeText={text => {
                  setAddress({
                    ...address,
                    mobile: parseInt(text),
                  });
                }}
                value={address.mobile.toString()}
                placeholder=""
                style={styles.textInputRow}
              />
            </View>
            <Text style={styles.errorText}>{emptyMobileError}</Text>
          </View>
          <View style={styles.buttonBase}>
            <TouchableOpacity
              onPress={() => {
                updateAddress();
              }}>
              <Text style={styles.buttonText}>Update Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return <ScrollView style={styles.base}>{renderAddress()}</ScrollView>;
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 15,
    //backgroundColor: '#f00',
  },
  addressBase: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 5,
  },
  addressHeaderBase: {
    paddingVertical: 10,
  },
  addressTitle: {
    color: colors.midDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressBlock: {
    marginTop: 10,
  },

  label: {
    marginRight: 10,
  },
  inputWithLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputRow: {
    color: colors.fullDark,
    paddingVertical: 5,
    borderBottomWidth: 0.3,
    borderBottomColor: colors.fullDark,
  },
  buttonBase: {
    marginTop: 25,
    backgroundColor: colors.buttons,
    alignSelf: 'center',
    width: 300,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.light,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  asterik: {
    color: colors.error,
    height: 13,
  },
});
