import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ITheme} from '../../assets/globals/theme';
import {IUser} from '../../assets/interface';
import {localCartCRU} from '../../assets/redux/slices/asyncLocalStorage';
import {
  addItemToCart,
  decreaseItemQty,
  removeItemFromCart,
} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPatchRTDb} from '../../assets/redux/slices/rest/crud/fbUserPatchRTDb';

import {RootState, store} from '../../assets/redux/store/store';

interface IProp {
  id: number;
  weight: string;
}

export default ({id, weight}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  const [confirmationMSG, setConfirmationMSG] = useState('');
  useEffect(() => {
    if (confirmationMSG) {
      Alert.alert('Confirmation', confirmationMSG, [
        {
          text: 'Ok',
          onPress: () => {
            try {
              user.cart[id] != undefined && user.cart[id].total_count > 1
                ? store.dispatch(
                    decreaseItemQty({product_id: id, weight: weight}),
                  )
                : store.dispatch(removeItemFromCart({product_id: id}));
            } catch (error: any) {
              setConfirmationMSG('Error occured while removing the item');
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            setConfirmationMSG('');
          },
        },
      ]);
    }
  }, [confirmationMSG]);

  console.log(
    user.cart[id] != undefined ? user.cart[id].weights[weight] : 'nothing',
  );

  return user.cart[id] != undefined && user.cart[id].weights[weight] > 0 ? (
    <View style={styles.buttonBase}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.primary,
        }}
        onPress={() => {
          setConfirmationMSG(
            'Are you sure you want to remove the item from cart',
          );
        }}>
        <Text
          style={{
            fontSize: fontsize.buttonmedium,
            color: colors.text,
          }}>
          Remove item
        </Text>
      </TouchableOpacity>

      <View
        style={{
          ...styles.button,
          backgroundColor: colors.backgroundLLL,
          borderColor: colors.border,
          borderWidth: 1,
        }}>
        <Text
          style={{
            fontSize: fontsize.buttonmedium,
            color: colors.text,
          }}>
          In cart
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.buttonBase}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.backgroundLLL,
          borderColor: colors.border,
          borderWidth: 1,
        }}
        onPress={() => {
          ToastAndroid.show('Saved for later list', 6);
        }}>
        <Text
          style={{
            fontSize: fontsize.buttonmedium,
            color: colors.text,
          }}>
          Save for later
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.primary}}
        onPress={() => {
          store.dispatch(
            addItemToCart({
              product_id: id,
              weight,
            }),
          );
          if (user.isLoggedIn) {
            user.cart[id] != undefined
              ? fbUserPatchRTDb({
                  data: {
                    product_id: id,
                    weights: {
                      ...user.cart[id].weights,
                      [weight]: 1,
                    },
                    total_count: +user.cart[id].total_count + +1,
                  },
                  url: `${user.current.localId}/cart/${id}`,
                })
              : fbUserPatchRTDb({
                  data: {
                    product_id: id,
                    weights: {
                      [weight]: 1,
                    },
                    total_count: 1,
                  },
                  url: `${user.current.localId}/cart/${id}`,
                });
          } else {
            user.cart[id] != undefined
              ? localCartCRU({
                  ...user.cart,
                  [id]: {
                    product_id: id,
                    weights: {
                      ...user.cart[id].weights,
                      [weight]: 1,
                    },
                    total_count: +user.cart[id].total_count + +1,
                  },
                })
              : localCartCRU({
                  ...user.cart,
                  [id]: {
                    product_id: id,
                    weights: {
                      [weight]: 1,
                    },
                    total_count: 1,
                  },
                });
          }
        }}>
        <Text
          style={{
            fontSize: fontsize.buttonmedium,
            color: colors.text,
          }}>
          Add to cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
    marginHorizontal: 10,
    borderRadius: 12,
  },
});
