import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ICurrentOrders} from '../../assets/interface';
import CartScreen from '../../screens/CartScreen';
import CurrentOrderScreen from '../../screens/CurrentOrderScreen';
import HomeScreen from '../../screens/HomeScreen';
import OrderPlacedScreen from '../../screens/OrderPlacedScreen';
import OrderSummaryScreen from '../../screens/OrderSummaryScreen';
import PaymentOptionScreen from '../../screens/PaymentOptionScreen';
import AccountStackNavigator from './AccountStackNavigator';
import {useTheme} from '@react-navigation/native';

export type CartStackParamList = {
  CartScreen: undefined;
  // SavedAddressScreen: {localId: string; canSelect: boolean};
  HomeFromCartScreen: undefined;
  OrderSummaryScreen: {orderSummary: ICurrentOrders; localId: string};
  PaymentOptionScreen: {orderSummary: ICurrentOrders; localId: string};
  AccountStackNavigator: undefined;
  OrderPlacedScreen: {
    orderdata: ICurrentOrders;
    localId: string;
    trackingId: string;
  };
  CurrentOrderScreen: undefined;
};
const CartStackNavigator = createNativeStackNavigator<CartStackParamList>();

export default () => {
  const {colors} = useTheme();

  return (
    <CartStackNavigator.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <CartStackNavigator.Screen name="CartScreen" component={CartScreen} />
      <CartStackNavigator.Screen
        name="HomeFromCartScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      {/* <CartStackNavigator.Screen
        name="SavedAddressScreen"
        component={SavedAddressScreen}
        options={{
          headerTitle: 'Select delivery address',
        }}
      /> */}
      <CartStackNavigator.Screen
        name="AccountStackNavigator"
        component={AccountStackNavigator}
        options={{
          headerShown: false,
          /* headerStyle: {
            backgroundColor: colors.grey2,
          },*/
          // headerTitle: 'Select delivery address',
        }}
      />
      <CartStackNavigator.Screen
        name="OrderSummaryScreen"
        component={OrderSummaryScreen}
      />
      <CartStackNavigator.Screen
        name="PaymentOptionScreen"
        component={PaymentOptionScreen}
      />
      <CartStackNavigator.Screen
        name="OrderPlacedScreen"
        component={OrderPlacedScreen}
        options={{
          headerShown: false,
        }}
      />
      <CartStackNavigator.Screen
        name="CurrentOrderScreen"
        component={CurrentOrderScreen}
      />
    </CartStackNavigator.Navigator>
  );
};
