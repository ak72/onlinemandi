import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import {ICfbUserMap} from '../../../../globals';
import {
  //IAddressCRUD,
  IAddressDelete,
  IDeleteProduct,
  IUpdateCartCount,
  IUserCart,
} from '../../../../interface';

export interface FirebaseUserState {
  current: typeof ICfbUserMap;
  cart: IUserCart;
  loading: boolean;
  isLoggedIn: boolean;
  error: unknown;
}
const initialState = {
  current: ICfbUserMap,
  cart: {},
  loading: true,
  isLoggedIn: false,
  error: null,
} as FirebaseUserState;

export const userDefaultState = {
  current: ICfbUserMap,
  cart: {},
  loading: true,
  isLoggedIn: false,
  error: null,
} as FirebaseUserState;

//`https://freshonlinemandi-default-rtdb.firebaseio.com/users/${userId}.json?access_token=CREDENTIAL`
export const fetchFBUserByID = createAsyncThunk(
  'users/fetchUserbyID',
  async (userId: string) => {
    const response = await fetch(
      `https://freshonlinemandi-default-rtdb.firebaseio.com/users/${userId}.json`,
    );

    /* if (response.status == 200) {
      throw new Error('No data linked with the user found');
    }*/
    if (!response.ok) {
      const errorResData = await response.text();
      const errorID = JSON.parse(errorResData);
      let message = 'Something went wrong';
      if (errorID.error.message === '') {
      }
      console.log(errorID.error.message);
      throw new Error(message);
    }
    //console.log(response.json());
    return response.json();
  },
);

const fbUserByIDSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IUpdateCartCount>) => {
      if (state.cart[action.payload.product_id] != undefined) {
        state.cart = {
          ...state.cart,
          [action.payload.product_id]: {
            ...state.cart[action.payload.product_id],
            weights: {
              ...state.cart[action.payload.product_id].weights,
              [action.payload.weight]: 1,
            },
            total_count: state.cart[action.payload.product_id].total_count + 1,
          },
        };
      } else {
        state.cart = {
          ...state.cart,
          [action.payload.product_id]: {
            product_id: action.payload.product_id,
            weights: {[action.payload.weight]: 1},
            total_count: 1,
          },
        };
      }
    },
    increaseItemQty: (state, action: PayloadAction<IUpdateCartCount>) => {
      state.cart = {
        ...state.cart,
        [action.payload.product_id]: {
          ...state.cart[action.payload.product_id],
          weights: {
            ...state.cart[action.payload.product_id].weights,
            [action.payload.weight]:
              +state.cart[action.payload.product_id].weights[
                action.payload.weight
              ] + +1,
          },
          total_count: state.cart[action.payload.product_id].total_count + 1,
        },
      };
    },
    decreaseItemQty: (state, action: PayloadAction<IUpdateCartCount>) => {
      state.cart = {
        ...state.cart,
        [action.payload.product_id]: {
          ...state.cart[action.payload.product_id],
          weights: {
            ...state.cart[action.payload.product_id].weights,
            [action.payload.weight]:
              +state.cart[action.payload.product_id].weights[
                action.payload.weight
              ] - +1,
          },
          total_count: state.cart[action.payload.product_id].total_count - 1,
        },
      };
    },
    removeItemFromCart: (state, action: PayloadAction<IDeleteProduct>) => {
      for (const item in state.cart) {
        if (state.cart[item].product_id == action.payload.product_id) {
          delete state.cart[action.payload.product_id];
        }
      }
    },
    loadLocalCart: (state, action) => {
      console.log('loadLocalCart is ' + action.payload);
      state.cart = action.payload;
    },
    mergeLocalCart: (state, action) => {
      const a = action.payload;
      state.cart = action.payload;
      console.log('merge cart is ' + a);
    },
    cartToCurrentOrder: (state, action) => {
      const gg = {
        ...state.current.all_orders,
        ...action.payload.all_orders,
      };
      console.log(gg);

      /* console.log(current(state));*/
      (state.current.current_order_id = {
        ...state.current.current_order_id,
        ...action.payload.current_order_id,
      }),
        (state.current.all_orders = {
          ...state.current.all_orders,
          ...action.payload.all_orders,
        });
      state.cart = {};
      //   const p = current(state.current.all_orders);
      //  console.log(p);
    },
    updateUserState: (state, action) => {
      console.log(state);
      console.log(action);
    },
    resetUserToDefaultState: (state, action) => {
      state.current = action.payload.current;
      state.isLoggedIn = false;
      state.cart = action.payload.cart;
      state.loading = true;
      state.error = null;
      console.log('resetUserToDefaultState done');
    },
    updateProfile: (state, action) => {
      console.log('Update profile');
      console.log(action.payload);
      state.current = {...state.current, ...action.payload};
    },
    createUpdateAddress: (state, action) => {
      state.current.addresses = {
        ...state.current.addresses,
        ...action.payload,
      };
    },
    deleteAddress: (state, action: PayloadAction<IAddressDelete>) => {
      delete state.current.addresses[action.payload.id];
    },
    setDefaultAddress: (state, action) => {
      state.current.default_address = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFBUserByID.pending, (state, action) => {
      //  state.loading = true;
      state.error = action.payload;
    }),
      builder.addCase(fetchFBUserByID.fulfilled, (state, action) => {
        state.current = action.payload;
        //  console.log('on fulfilled cart is ' + action.payload.cart);
        state.cart =
          action.payload.cart != undefined ? action.payload.cart : [];
        state.loading = false;
        state.isLoggedIn = true;
        // state.error = null;
        // console.log(current(state.current));
      }),
      builder.addCase(fetchFBUserByID.rejected, (state, action) => {
        //     state.loading = true;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {getIT, setIt} = userSlice.actions;

//const {actions} = fbUserByIDSlice;
export const {
  addItemToCart,
  increaseItemQty,
  decreaseItemQty,
  removeItemFromCart,
  loadLocalCart,
  mergeLocalCart,
  cartToCurrentOrder,
  updateUserState,
  resetUserToDefaultState,
  updateProfile,
  createUpdateAddress,
  setDefaultAddress,
  deleteAddress,
} = fbUserByIDSlice.actions;

export default fbUserByIDSlice.reducer;
