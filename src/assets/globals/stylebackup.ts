import {Dimensions} from 'react-native';

export const screen_width = Dimensions.get('window').width;
export const screen_height = Dimensions.get('window').height;
export const colors = {
  button: {
    primarybutton: '#ff8c52',
    secondarybutton: '#ff8c52',
    lightdarkbutton: '#352c2c',
    middarkbutton: '#262020',
    darkbutton: '#000000',
  },
  buttonText: {
    type2: '#5e6977',
    type3: '#eee',
    type4: '#262020',
  },
  background: {
    primary: '#ff8c52',
    secondary: '#003488',

    darkgrey: '#333',
    grey: '#666',
    lightgrey: '#aaa',

    light: '#ccc',
    lightest: '#eee',

    cartbuttons: '#f00',
  },
  header: {
    backButton: '#fff',
    type1: '#5e6977',
    type2: '#43484d',
    text: '#fff',
    title: '#000',
  },
  bordercolor: {
    grey: '#86939e',
    type2: '#5e6977',
    type3: '#262020',
    white: '#fff',
    dark: '#000',
  },
  text: {
    primary: '#ff8c52',
    secondary: '#008080',
    placeholder: '#86939e',
    offwhite: '#eee',
    grey: '#5e6977',
    grey2: '#43484d',
    lightgrey: '#86939e',
    white: '#fff',
    error: '#f00',
    semiblack: '#262020',
    black: '#000',
  },
  icon: {
    type1: '#fff',
    type2: '#5e6977',
    grey: '#5e6977',
    primary: 'ff8c52',
    secondary: '#ac8345',
    white: '#fff',
    combination: '#DE6422',
  },
  textInput: {
    type1: '#fff',
    type2: '#5e6977',
    type3: '#262020',
    type4: '#000',
  },
  maroon: '#cd391a',
  buttons: '#ff8c52',
  light: '#eee',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  statusBar: '#ff8c52',
  background1: '#C29E5D',
  background2: '#dddddd',
  lightDark: '#352c2c',
  midDark: '#262020',
  fullDark: '#000000',

  white: '#fff',
  error: '#f00',
};

export const parameters = {
  headerHeight: 50,
};

export const font = {
  header: {
    super: 26,
    xlargetitle: 22,
    largetitle: 18,
    title: 16,
    subtitle: 14,
  },
  icon: {
    size2: 20,
    size3: 25,
    size4: 32,
    size8: 75,
    size10: 96,
  },
  size: {
    screentitle: 20,
    xlarge: 20,
    //large: '18sp',

    headertitle: 18,
    title: 16,
    subtitle: 14,
    modaltext: 16,
    input: 16,
    /* largebutton: 16,
    normalbutton: 16,
    smallbutton: 14,*/

    tabheading: 14,
    large: 18,
    medium: 16,
    default: 14,
    buttonlarge: 16,
    button: 14,
    error: 12,
    small: 12,
  },
  buttonSize: {xlarge: 20, large: 18, medium: 16, default: 14},
  type: {
    header1: 20,
    header2: 18,
    subheader: 16,
    header4: 14,
    header5: 12,
  },
};
/* export const BB = (...[props, props:ReactElement}) =>{
return(
  <props
  props.title="Login"
  props.color={colors.buttons}
  props.onPress={() => {
  console.log(props, 'Pressed');
   
  }}
/>
)
} */
export const dummydata = [
  {
    type: 'Green',
    image: 'http://etcetera.ai/assets/native/images/fruits/orange/thumb01.jpg',
    id: 2001,
  },
  {
    type: 'Juicy',
    image:
      'http://etcetera.ai/assets/native/images/vegetables/cauliflower/thumb02.jpg',
    id: 1001,
  },
  {
    type: 'Season',
    image: 'http://etcetera.ai/assets/native/images/fruits/banana/thumb01.jpg',
    id: 2002,
  },
  {
    type: 'Seeds',
    image:
      'http://etcetera.ai/assets/native/images/vegetables/brinjal/thumb01.jpg',
    id: 1002,
  },
  {
    type: 'Bulbs',
    image: 'http://etcetera.ai/assets/native/images/fruits/orange/thumb03.jpg',
    id: 2003,
  },
  {
    type: 'Stem',
    image:
      'http://etcetera.ai/assets/native/images/vegetables/cauliflower/thumb03.jpg',
    id: 1003,
  },
  {
    type: 'Salad',
    image:
      'http://etcetera.ai/assets/native/images/vegetables/brinjal/thumb01.jpg',
    id: 1004,
  },
  {
    type: 'Leaf',
    image: 'http://etcetera.ai/assets/native/images/fruits/banana/thumb01.jpg',
    id: 2004,
  },
];

export const restData = [
  {
    restaurantName: 'Mc Donald',
    farAway: '21.2',
    businessAddress: '174, Goyal Vihar',
    images: '',
    averageReview: 4.9,
    numberOfReview: 300,
    coordinates: {lat: -24.34433, lng: 26.5554},
    discount: 10,
    deliveryTime: 15,
    collectTime: 5,
    foodType: 'Burger, Wrap....',
    productDate: [
      {name: 'Hand Cut Chops', price: 200, image: ''},
      {name: 'Big Mac', price: 300, image: ''},
    ],
  },
];
