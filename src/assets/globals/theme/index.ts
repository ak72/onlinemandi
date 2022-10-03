import {Dimensions} from 'react-native';

export const screen_width = Dimensions.get('window').width;
export const screen_height = Dimensions.get('window').height;

export interface ITheme {
  colors: {
    header: string;
    background: string;
    statusBar: string;
    backgroundL: string;
    backgroundLL: string;
    backgroundLLL: string;
    grey: string;
    text: string;
    accenttext: string;
    placeholder: string;
    error: string;
    primary: string;
    accent: string;
    border: string;
    card: string;
    notification: string;
    icon: string;

    loader: string;
  };
  fontsize: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
    small: number;
    body1: number;
    body2: number;
    subtitle1: number;
    subtitle2: number;
    caption: number;
    buttonsmall: number;
    buttonmedium: number;
    buttonlarge: number;
    iconsmall: number;
    icon: number;
    iconlarge: number;
    iconxlarge: number;
    input: number;
  };
}

const lightthemesettings = {
  primary: '#a6b58d',
  accent: '#edf0e8',
  shadeLight: '#b8c4a4',
  shadeLighter: '#cad3bb',
  shadeLightest: '#edf0e8',

  //colorfive: '#edf0e8',
  //colorsix: '#ebebeb',
  //colorseven: '#bcbcbc',
  grey: '#cccccc',
  textcolor: '#000000',
  accenttextcolor: '#000000',
  border: '#272729',
  card: 'rgb(18, 18, 18)',
  notification: 'rgb(255, 69, 58)',
  error: '#ff0000',
  placeholder: '#888888',
  xxxlarge: 26,
  xxlarge: 24,
  xlarge: 22,
  large: 20,
  medium: 18,
  normal: 16,
  default: 14,
  small: 12,
  icon: 32,
  iconlarge: 64,
  iconxlarge: 96,
};
const darkthemesettings = {
  primary: '#333d22',
  // accent: '#222719',
  accent: '#a6b58d',
  shadeLight: '#444e33',
  shadeLighter: '#66754c',
  shadeLightest: '#889c66',
  // colorsix: '#edefee',
  // colorseven: '#8d8d8d',
  grey: '#bbbbbb',
  textcolor: '#ffffff',
  accenttextcolor: '#000000',
  border: '#272729',
  card: 'rgb(18, 18, 18)',
  notification: 'rgb(255, 69, 58)',
  error: '#ff0000',
  placeholder: '#cccccc',
  xxxlarge: 26,
  xxlarge: 24,
  xlarge: 22,
  large: 20,
  medium: 18,
  normal: 16,
  default: 14,
  small: 12,
  icon: 32,
  iconlarge: 64,
  iconxlarge: 96,
};

export const lighttheme: ITheme = {
  colors: {
    header: lightthemesettings.primary,
    background: lightthemesettings.accent,
    statusBar: lightthemesettings.primary,
    backgroundL: lightthemesettings.shadeLight,
    backgroundLL: lightthemesettings.shadeLighter,
    backgroundLLL: lightthemesettings.shadeLightest,
    grey: lightthemesettings.grey,
    text: lightthemesettings.textcolor,
    accenttext: lightthemesettings.accenttextcolor,
    placeholder: lightthemesettings.placeholder,
    error: lightthemesettings.error,
    primary: lightthemesettings.primary,
    accent: lightthemesettings.accent,
    border: lightthemesettings.border,
    card: lightthemesettings.card,
    notification: lightthemesettings.notification,
    icon: lightthemesettings.textcolor,
    loader: '#000',
  },
  fontsize: {
    h1: lightthemesettings.xxxlarge,
    h2: lightthemesettings.xxlarge,
    h3: lightthemesettings.xlarge,
    h4: lightthemesettings.large,
    h5: lightthemesettings.medium,
    h6: lightthemesettings.normal,
    small: lightthemesettings.small,
    body1: lightthemesettings.normal,
    body2: lightthemesettings.default,
    subtitle1: lightthemesettings.medium,
    subtitle2: lightthemesettings.normal,
    caption: lightthemesettings.normal,
    buttonsmall: lightthemesettings.default,
    buttonmedium: lightthemesettings.normal,
    buttonlarge: lightthemesettings.medium,
    iconsmall: lightthemesettings.large,
    icon: lightthemesettings.icon,
    iconlarge: lightthemesettings.iconlarge,
    iconxlarge: lightthemesettings.iconxlarge,
    input: lightthemesettings.default,
  },
};

export const darktheme: ITheme = {
  colors: {
    header: darkthemesettings.primary,
    background: darkthemesettings.shadeLightest,
    statusBar: darkthemesettings.primary,
    backgroundL: darkthemesettings.shadeLight,
    backgroundLL: darkthemesettings.shadeLighter,
    backgroundLLL: darkthemesettings.shadeLightest,
    grey: darkthemesettings.grey,
    text: darkthemesettings.textcolor,
    accenttext: darkthemesettings.accenttextcolor,
    placeholder: darkthemesettings.placeholder,
    error: darkthemesettings.error,
    primary: darkthemesettings.primary,
    accent: darkthemesettings.accent,

    border: darkthemesettings.border,
    card: darkthemesettings.card,
    notification: darkthemesettings.notification,
    icon: darkthemesettings.textcolor,
    loader: '#fff',
  },
  fontsize: {
    h1: darkthemesettings.xxxlarge,
    h2: darkthemesettings.xxlarge,
    h3: darkthemesettings.xlarge,
    h4: darkthemesettings.large,
    h5: darkthemesettings.medium,
    h6: darkthemesettings.normal,
    small: darkthemesettings.small,
    body1: darkthemesettings.normal,
    body2: darkthemesettings.default,
    subtitle1: darkthemesettings.medium,
    subtitle2: darkthemesettings.normal,
    caption: darkthemesettings.normal,
    buttonsmall: darkthemesettings.default,
    buttonmedium: darkthemesettings.normal,
    buttonlarge: darkthemesettings.medium,
    iconsmall: darkthemesettings.large,

    icon: darkthemesettings.icon,
    iconlarge: darkthemesettings.iconlarge,
    iconxlarge: darkthemesettings.iconxlarge,
    input: darkthemesettings.default,
  },
};
/**
 * fonts: {
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
 */
/**
 *  {
     "colors": 
     {
       "background": "rgb(1, 1, 1)", 
       "border": "rgb(39, 39, 41)", 
       "card": "rgb(18, 18, 18)", 
       "notification": "rgb(255, 69, 58)", 
       "primary": "rgb(10, 132, 255)", 
       "text": "rgb(229, 229, 231)"}, 
       "dark": true
     }
 */
