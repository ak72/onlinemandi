import React, {useState} from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
import {
  CardField,
  //PaymentMethodCreateParams,
  useConfirmPayment,
  // CardFieldInput,
  //PaymentIntent,
  BillingDetails,
} from '@stripe/stripe-react-native';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../assets/globals/theme';
import {Button} from '@rneui/themed';

interface IProp {
  onPaymentSuccess: Function;
  onPaymentCancel: () => void;
  onPaymentFailed: Function;
  lodingStatus: (param: boolean) => void;
  amount: number;
  setError: (param: string) => void;
  //inProgress:boolean
}
export default ({
  onPaymentSuccess,
  onPaymentCancel,
  onPaymentFailed,
  lodingStatus,

  amount = 500,
  setError,
}: // inProgress
IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [cardHolderName, setCardHolderName] = useState('');
  const {confirmPayment, loading} = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    lodingStatus(true);
    const response = await fetch(
      'http://192.168.1.10:4000/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'inr',
          paymentMethod: 'card',
        }),
      },
    );
    try {
      const {clientSecret} = await response.json();
      console.log('Client secret found', clientSecret);
      return clientSecret;
    } catch (error: any) {
      setError(error.message);
    }
  };
  // if (response.ok) {
  //  const {clientSecret} = await response.json();
  //   return clientSecret;
  //   const billingDetails = {
  //      name: cardHolderName,
  //address:{name:'', city:'', country:"in", postalCode:'45435'},
  //carrier:"",
  // phone:'',
  // trackingNumber:''
  //  };

  //const {error, paymentIntent} = await confirmPayment(parsed.clientSecret, {
  // type: 'Card',
  //   billingDetails,
  //  });
  // if (error) {
  //  onPaymentFailed(error.message);
  //   } else {
  //   onPaymentSuccess(paymentIntent);
  //   }

  //return clientSecret;
  //  } else {
  //   onPaymentFailed('Invalid info found');
  //   onPaymentFailed;
  //  onPaymentSuccess;
  //lodingStatus(loading);
  //}
  //  }
  //  };

  const handlePayPress = async () => {
    const billingDetails: BillingDetails = {
      phone: '9907410015',
      name: 'Anurag Kanchan',
      email: 'anuraagkanchan@hotmail.com',
    };

    // Fetch the intent client secret from the backend.
    const clientSecret = await fetchPaymentIntentClientSecret();
    console.log('fetchPaymentIntentClientSecret', clientSecret);
    /*const { paymentMethod, error as paymentError } = await createPaymentMethod({
      type: 'Card',
      billingDetails: {
        email: 'email@stripe.com',
      }, // optional
    });*/

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      //if (error?.message) {
      console.log('Payment confirmation error', error);
      onPaymentFailed(error.message);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
      lodingStatus(false);
      onPaymentSuccess(paymentIntent);
    }
    // }
  };
  return (
    <View style={{...styles.base, backgroundColor: colors.background}}>
      <View>
        <View style={{height: 60}}>
          <Text
            style={{
              fontSize: fontsize.h5,
              fontWeight: '600',
              color: colors.text,
            }}>
            Make Payment
          </Text>
        </View>

        <View style={{marginTop: 60, marginBottom: 30}}>
          <View
            style={{...styles.amountView, backgroundColor: colors.backgroundL}}>
            <Text style={{fontSize: fontsize.h6, color: colors.text}}>
              Payable Amount
            </Text>
            <Text
              style={{
                fontSize: fontsize.h6,
                color: colors.text,
                fontWeight: '700',
              }}>
              {amount.toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.creditDebitCardBase,
            borderColor: colors.grey,
            backgroundColor: colors.backgroundL,
          }}>
          <TextInput
            autoCapitalize="none"
            placeholder="Name on Card"
            placeholderTextColor={colors.text}
            keyboardType="name-phone-pad"
            onChange={value => setCardHolderName(value.nativeEvent.text)}
            style={{
              ...styles.textinput,
              fontSize: fontsize.h6,
              borderBottomColor: colors.border,
            }}
          />
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '0000 0000 0000 0000',
            }}
            cardStyle={{
              //borderWidth: 1,
              // borderColor: colors.border,
              //borderRadius: 8,
              backgroundColor: colors.backgroundLLL,
              textColor: colors.text,
              fontSize: fontsize.body1,
              placeholderColor: colors.placeholder,
              borderRadius: 4,
            }}
            onCardChange={cardDetails => {
              console.log('Card details', cardDetails);
            }}
            onFocus={focusField => {
              console.log('Focus on', focusField);
            }}
            style={styles.cardfield}
          />
        </View>
      </View>

      <View style={styles.buttonBase}>
        <Button
          type="solid"
          disabled={loading}
          title="Pay now"
          titleStyle={{fontSize: fontsize.buttonmedium, color: colors.text}}
          buttonStyle={{backgroundColor: colors.primary}}
          containerStyle={{
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 5,
            width: 320,
          }}
          onPress={handlePayPress}
        />
        <Button
          type="clear"
          disabled={loading}
          title="Cancel payment"
          titleStyle={{fontSize: fontsize.buttonmedium, color: colors.text}}
          // buttonStyle={{backgroundColor: colors.grey}}
          containerStyle={{
            // borderWidth: 1,
            // borderRadius: 10,
            marginTop: 5,
            width: 320,
          }}
          onPress={onPaymentCancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  amountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },

  creditDebitCardBase: {
    //marginHorizontal: 20,
    // marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    // height: 300,
    // width: '100%',
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 50,
    borderWidth: 5,
  },
  cardfield: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  textinput: {
    height: 44,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  buttonBase: {
    alignItems: 'center',
  },
});
