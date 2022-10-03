/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  NavigationContainer,
  DefaultTheme as NativeDefaultTheme,
  DarkTheme as NativeDarkTheme,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {store} from './src/assets/redux/store/store';
/* import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
 DarkTheme as PaperDarkTheme,
} from 'react-native-paper'; */
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import 'react-native-gesture-handler';
import {Provider as ReduxProvider} from 'react-redux';
import DrawerNavigator from './src/navigator/Drawer/DrawerNavigator';
import {darktheme, lighttheme} from './src/assets/globals/theme';
import {AuthContext} from './src/assets/redux/context';
import {StripeProvider} from '@stripe/stripe-react-native';
//import Permissions from './src/components/Permissions';

const pKey =
  'pk_test_51LiNOSSC0FCnqSKePB4Dp5JeB5rVllw4sTLG4qBCtVbUWNNDhRXo8nq9ORc9RlcAU2WKcvb1fNDZD5siDg53cJO100zcNsYKkW';

//import RazorpayCheckout from 'react-native-razorpay';
/* const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; */
enableScreens();
const appDefaultTheme = {
  ...NativeDefaultTheme,
  dark: false,
  colors: {
    ...NativeDefaultTheme.colors,
    ...lighttheme.colors,
  },
  fontsize: lighttheme.fontsize,
};
const appDarkTheme = {
  ...NativeDarkTheme,
  dark: true,
  colors: {
    ...NativeDarkTheme.colors,
    ...darktheme.colors,
  },
  fontsize: darktheme.fontsize,
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [publishableKey, setPublishableKey] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const authContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );
  const theme = isDarkTheme ? appDarkTheme : appDefaultTheme;
  // Permissions();
  // const fetchPublishableKey = async () => {
  //  const key = await fetch('http://192.168.1.10:4000/publishablekey');
  // console.log('Found publishablekey on server');
  // setPublishableKey(JSON.stringify(key));
  // setPublishableKey(pKey);
  //  };
  /* useEffect(() => {
    fetchPublishableKey();
  }, []);*/

  return (
    console.log('App tsx said theme dark is ', isDarkMode),
    (
      <ReduxProvider store={store}>
        <StripeProvider
          publishableKey={pKey}
          urlScheme=""
          threeDSecureParams={{
            backgroundColor: '#fff',
            timeout: 6,
          }}>
          <AuthContext.Provider value={authContext}>
            <SafeAreaProvider>
              <StatusBar
                backgroundColor={theme.colors.primary}
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
              />
              <NavigationContainer theme={theme}>
                <DrawerNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </AuthContext.Provider>
        </StripeProvider>
        {/*</CustomThemeProvider>
      </PaperProvider>*/}
        {/* </PersistGate> */}
      </ReduxProvider>
    )
  );
};

export default App;
