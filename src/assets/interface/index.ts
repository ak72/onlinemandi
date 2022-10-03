export interface IProduct {
  id: number;
  name: string;
  image_url: string;
  inStock: boolean;
  units: {
    weight: string;
    price: number;
    inStock: boolean;
    inOffer: boolean;
  }[];
  desc: string;
  rating: number;
  category: string;
  type: string;
  images_url: string[];
}

export interface IUserCart {
  [key: number]: {
    product_id: number;
    total_count: number;
    weights: {
      [x: string]: number;
    };
  };
}

export interface IUserAddresses {
  [x: string]: any;
  [key: number]: {
    uid: number;
    fullname: string;
    flatno: string;
    apartment: string;
    street: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    mobile: number;
  };
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  image_url: string;
  mobile: number;
  addresses: IUserAddresses;
  /* current_order_id: {
    [key: string]: {
      status: string;
    };
  }; */
  current_order_id: string[];
  favorites: number[];
  payment_type: string[];
  past_order_ids: string[];
  all_orders: IAllOrders;
  cart: IUserCart;
  default_address: number;
  localId: string;
}

export interface IUserProfile {
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  image_url: string;
  mobile: number;
}

export interface ICurrentOrders {
  //[key: string]: {
  //localId: string;
  items: {
    id: number;
    name: string;
    qty: number;
    weight: string;
    imageURL: string;
  }[];
  total: number;
  deliveryDate: string;
  orderedDate: string;

  address: {
    fullname: string;
    flatno: string;
    area: string;
    city: string;
    state: string;
    pincode: number;
    mobile: number;
  };

  // trackingID: string;
}
//}

interface IAllOrders {
  [key: string]: {
    id: string;
    items: {
      id: number;
      name: string;
      qty: number;
      weight: string;
      imageURL: string;
    }[];
    total: number;
    orderedDate: number;
    deliveryDate: string;
    trackingID: string;
    address: {
      fullname: string;
      flatno: string;
      apartment: string;
      street: string;
      landmark: string;
      area: string;
      city: string;
      state: string;
      pincode: number;
      coordinates: {
        latitude: number;
        longitude: number;
      };
      mobile: number;
    };
  };
}

/* export interface IUserCartTwo {
  [key: string]:
    | number
    | {
        [x: string]: string;
        product_id: string;
        total_count: string;
      };
}
 */
export interface ISignupUserCallbackData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}

export interface ISignupORLoginPOSTData {
  email: string;
  password: string;
}
export interface IUserLoginCallbackData {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered: true;
}

export interface IUpdateCartCount {
  product_id: number;
  weight: string;
}
export interface IDeleteProduct {
  product_id: number;
}
/*export interface IAddressCRUD {
  [id: number]: IUserAddresses;
}*/
export interface IAddressDelete {
  id: number;
}

export interface INotification {
  notification?: {
    android?: {};
    body?: string;
    title?: string;
  };
  sentTime?: number;
  data?: {};
  from?: string;
  messageId?: string;
  ttl?: number;
  collapseKey?: string;
}
