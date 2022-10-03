import {useGooglePay} from '@stripe/stripe-react-native';

const {initGooglePay, presentGooglePay} = useGooglePay();
// ...
const {error} = await initGooglePay({
  merchantName: 'Widget Store',
  countryCode: 'IN',
  billingAddressConfig: {
    format: 'FULL',
    isPhoneNumberRequired: true,
    isRequired: false,
  },
  existingPaymentMethodRequired: false,
  isEmailRequired: true,
});
if (error) {
  // handle error
  return;
}
const {error: presentError} = await presentGooglePay({
  clientSecret,
  forSetupIntent: true,
  currencyCode: 'USD',
});
