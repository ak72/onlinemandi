import {ICurrentOrders, IProduct, IUser} from '../interface';

const apiKey = 'AIzaSyArOnpCIa3kh_1x34EqyVrjfoR6KwsfsjQ';
const projectID = 'freshonlinemandi-default-rtdb';
export const fbEmailLoginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
export const fbPhoneLoginURL = '';
export const fbSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
export const fbSignedUserRTDbURL = `https://${projectID}.firebaseio.com/users/`;
export const googleSigninWebClientId =
  '1070022446261-v160u77qd3701dnto8lr0of1d9ql97qm.apps.googleusercontent.com';
export const facebookSigninWebClientId = '';
export const fbDB = 'https://freshonlinemandi-default-rtdb.firebaseio.com/';

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export enum Weight {
  ten = '10Kg',
  five = '5Kg',
  four = '4Kg',
  three = '3Kg',
  two = '2Kg',
  one = '1Kg',
  half = '500gms',
  quarter = '250gms',
  twohundred = '200gms',
  hundred = '100gms',
  fifty = '50gms',
}
export const ICUserAddress = {
  uid: 0,
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
};
export const ICfbUserMap: IUser = {
  first_name: '',
  last_name: '',
  email: '',
  city: '',
  image_url: '',
  mobile: 0o000000000,
  addresses: ICUserAddress,
  current_order_id: [],
  favorites: [],
  payment_type: [],
  past_order_ids: [],
  all_orders: {},
  cart: {},
  default_address: 0,
  localId: '',
};

export const ICInventory: IProduct = {
  id: 0,
  name: '',
  image_url: '',
  inStock: false,
  units: [{weight: '', price: 0, inStock: false, inOffer: false}],
  desc: '',
  rating: 0,
  category: '',
  type: '',
  images_url: [''],
};

export const ICCurrentOrders: ICurrentOrders = {
  //O: {
  // id: '',
  items: [
    {
      id: 0,
      name: '',
      qty: 0,
      weight: '',
      imageURL: '',
    },
  ],

  total: 0,
  deliveryDate: '',
  orderedDate: '',
  address: {
    fullname: '',
    flatno: '',
    area: '',
    city: '',
    state: '',
    pincode: 0,
    mobile: 0,
  },

  // },
};
/**
 *  uid: 0,
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
  },
 */
