import {RouteProp, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  //KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//import {screen_height} from '../../assets/globals/style';
import {ITheme} from '../../assets/globals/theme';
import {createUpdateAddress} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPutRTDb} from '../../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {store} from '../../assets/redux/store/store';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
import {AccountStackParamList} from '../../navigator/Stack/AccountStackNavigator';

interface IProp {
  navigation: NativeStackNavigationProp<
    AccountStackParamList,
    'CreateAddressScreen'
  >;
  // route: RouteProp<{params: {localId: ''}}>;
  route: RouteProp<AccountStackParamList, 'CreateAddressScreen'>;
}
export default ({route, navigation}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [emptyNameError, setEmptyNameError] = useState('');
  const [emptyHouseNoError, setEmptyHouseNoError] = useState('');
  const [emptyStreetError, setEmptyStreetError] = useState('');
  const [emptyCityError, setEmptyCityError] = useState('');
  const [emptyStateError, setEmptyStateError] = useState('');
  const [emptyPinError, setEmptyPinError] = useState('');
  const [emptyMobileError, setEmptyMobileError] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [address, setaddress] = useState({
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
  const createNewAddress = async () => {
    if (checkErrors()) {
      let id = parseInt((Math.random() * Math.random() * 1000).toFixed());
      const add = {
        [id]: {...address, uid: id},
      };
      console.log(add);
      try {
        setInProgress(true);
        store.dispatch(createUpdateAddress(add));
        fbUserPutRTDb({
          data: {
            ...address,
            uid: id,
          },
          url: `${route.params.localId}/address/${id}`,
        }).then(() => {
          setInProgress(false);
          ToastAndroid.show('Address created sucessfully', 6);
          navigation.goBack();
        });
      } catch (error) {
        console.log('Error creating address');
      }
    }
  };
  const RenderAddress = () => {
    return (
      <View
        style={{...styles.addressBase, backgroundColor: colors.backgroundLLL}}>
        <View style={styles.addressHeaderBase}>
          <Text
            style={{
              ...styles.addressTitle,
              color: colors.text,
              fontSize: fontsize.h5,
            }}>
            Enter Address Details
          </Text>
        </View>
        <View style={styles.addressBlock}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{
            //flex: 1,
            // justifyContent: 'space-between',
            //}}
          >
            <View>
              {/* style={{marginTop: 10}} */}
              <Text style={{fontSize: fontsize.subtitle2}}>
                Fullname
                <Text style={{...styles.asterik, color: colors.error}}> *</Text>
              </Text>
              <TextInput
                autoFocus={true}
                maxLength={30}
                keyboardType="default"
                autoCapitalize="words"
                placeholder=""
                placeholderTextColor={colors.placeholder}
                value={address.fullname}
                style={{
                  ...styles.textInputRow,
                  fontSize: fontsize.input,
                  color: colors.text,
                  borderBottomColor: colors.border,
                }}
                onChangeText={(text: string) => {
                  setaddress({...address, fullname: text});
                }}
              />
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                {emptyNameError}
              </Text>
            </View>

            <View style={styles.inputWithLabelRow}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: fontsize.subtitle2}}>
                  Apartment name
                </Text>
                <TextInput
                  autoFocus={false}
                  maxLength={20}
                  keyboardType="default"
                  autoCapitalize="none"
                  placeholder="                    "
                  value={address.apartment}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    borderBottomColor: colors.border,
                    marginRight: 20,
                  }}
                  onChangeText={text => {
                    setaddress({...address, apartment: text});
                  }}
                />
              </View>

              <View style={{flex: 1}}>
                <Text style={{fontSize: fontsize.subtitle2}}>
                  House/Flat No
                  <Text style={{...styles.asterik, color: colors.error}}>
                    {' '}
                    *
                  </Text>
                </Text>
                <TextInput
                  autoFocus={false}
                  maxLength={12}
                  keyboardType="default"
                  placeholder="              "
                  placeholderTextColor={colors.placeholder}
                  value={address.flatno}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    borderBottomColor: colors.border,
                  }}
                  onChangeText={text => {
                    setaddress({...address, flatno: text});
                  }}
                />
                <Text style={styles.errorText}>{emptyHouseNoError}</Text>
              </View>
            </View>

            <View>
              {/*style={{marginTop: 5}} */}
              <Text style={{fontSize: fontsize.subtitle2}}>
                Street detail
                <Text style={{...styles.asterik, color: colors.error}}> *</Text>
              </Text>
              <TextInput
                autoFocus={false}
                maxLength={35}
                keyboardType="default"
                placeholder=""
                value={address.street}
                style={{
                  ...styles.textInputRow,
                  color: colors.text,
                  borderBottomColor: colors.border,
                }}
                onChangeText={text => {
                  setaddress({...address, street: text});
                }}
              />
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                {emptyStreetError}
              </Text>
            </View>
            <View>
              {/* style={{marginTop: 5}} */}
              <Text style={{fontSize: fontsize.subtitle2}}>Landmark</Text>
              <TextInput
                autoFocus={false}
                maxLength={35}
                keyboardType="default"
                placeholder=""
                value={address.landmark}
                style={{
                  ...styles.textInputRow,
                  color: colors.text,
                  borderBottomColor: colors.border,
                }}
                onChangeText={text => {
                  setaddress({...address, landmark: text});
                }}
              />
            </View>
            <View style={styles.inputWithLabelRow}>
              <View style={{flex: 1}}>
                {/* , marginTop: 5 */}
                <Text style={{fontSize: fontsize.subtitle2}}>Area</Text>
                <TextInput
                  autoFocus={false}
                  maxLength={35}
                  keyboardType="default"
                  placeholder="                                                                  "
                  value={address.area}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    borderBottomColor: colors.border,
                    marginRight: 20,
                  }}
                  onChangeText={text => {
                    setaddress({...address, area: text});
                  }}
                />
              </View>

              <View style={{flex: 1}}>
                {/* , marginTop: 5 */}
                <Text style={{fontSize: fontsize.subtitle2}}>
                  City
                  <Text style={{...styles.asterik, color: colors.error}}>
                    {' '}
                    *
                  </Text>
                </Text>
                <TextInput
                  autoFocus={false}
                  maxLength={20}
                  keyboardType="default"
                  placeholder="                                                                     "
                  value={address.city}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    borderBottomColor: colors.border,
                  }}
                  onChangeText={text => {
                    setaddress({...address, city: text});
                  }}
                />
                <Text style={styles.errorText}>{emptyCityError}</Text>
              </View>
            </View>
            <View>
              {/* style={{marginTop: 5}} */}
              <Text style={{fontSize: fontsize.subtitle2}}>
                State
                <Text style={{...styles.asterik, color: colors.error}}> *</Text>
              </Text>
              <TextInput
                autoFocus={false}
                maxLength={20}
                keyboardType="default"
                placeholder=""
                value={address.state}
                style={{
                  ...styles.textInputRow,
                  color: colors.text,
                  borderBottomColor: colors.border,
                }}
                onChangeText={text => {
                  setaddress({...address, state: text});
                }}
              />
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                {emptyStateError}
              </Text>
            </View>
            <View style={styles.inputWithLabelRow}>
              <View style={{flex: 1}}>
                {/* , marginTop: 5 */}
                <Text style={{fontSize: fontsize.subtitle2}}>
                  Pincode
                  <Text style={{...styles.asterik, color: colors.error}}>
                    {' '}
                    *
                  </Text>
                </Text>
                <TextInput
                  autoFocus={false}
                  maxLength={6}
                  keyboardType="numeric"
                  placeholder=""
                  value={address.pincode.toString()}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    borderBottomColor: colors.border,
                    marginRight: 20,
                  }}
                  onChangeText={text => {
                    setaddress({...address, pincode: parseInt(text)});
                  }}
                />
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  {emptyPinError}
                </Text>
              </View>
              <View style={{flex: 1}}>
                {/* , marginTop: 5 */}
                <Text style={{fontSize: fontsize.subtitle2}}>
                  Mobile no
                  <Text style={{...styles.asterik, color: colors.error}}>
                    {' '}
                    *
                  </Text>
                </Text>
                <TextInput
                  autoFocus={false}
                  maxLength={10}
                  keyboardType="number-pad"
                  placeholder=""
                  value={address.mobile.toString()}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    borderBottomColor: colors.border,
                  }}
                  onChangeText={text => {
                    setaddress({...address, mobile: parseInt(text)});
                  }}
                />
              </View>
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                {emptyMobileError}
              </Text>
            </View>
            <View
              style={{...styles.buttonBase, backgroundColor: colors.primary}}>
              <TouchableOpacity
                onPress={() => {
                  createNewAddress();
                }}>
                <Text
                  style={{
                    ...styles.buttonText,
                    color: colors.text,
                    fontSize: fontsize.buttonlarge,
                  }}>
                  Add Address
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {inProgress && (
          <View style={styles.indicatorWheel}>
            <ActivityIndicatorWheel />
          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <RenderAddress />
    </SafeAreaView>
    // <KeyboardAvoidingView style={styles.base}>
    //</KeyboardAvoidingView><ScrollView
    //  keyboardShouldPersistTaps="always"
    //  showsVerticalScrollIndicator={false}
    // style={styles.base}>
    //renderAddress()
    //</ScrollView>
    // </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  addressBase: {
    flex: 1,
    marginHorizontal: 15,
  },
  addressHeaderBase: {
    // paddingVertical: 10,
    flex: 1,
    // backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressTitle: {
    fontWeight: 'bold',
  },

  addressBlock: {
    //marginTop: 5,
    flex: 9,
    // backgroundColor: '#ff0',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignContent: 'space-between',
  },

  inputWithLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputRow: {
    // paddingVertical: 5,
    padding: 8,
    borderWidth: 0.4,
    // height: screen_height * 0.06,
    // borderBottomWidth: 0.4,
  },
  buttonBase: {
    // marginTop: 25,
    flex: 1,
    alignSelf: 'center',
    width: 300,
    borderRadius: 12,
  },
  buttonText: {
    paddingVertical: 10,

    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontStyle: 'italic',
    // marginTop: 4,
  },
  asterik: {
    height: 13,
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: '#f00',
  },
});
