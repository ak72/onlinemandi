import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICInventory} from '../../../../globals';

export interface InventoryState {
  products: typeof ICInventory;
  // product: [];
  loading: boolean;
  error: unknown;
}
const initialState = {
  products: ICInventory,
  // product: initialProducts,
  loading: true,
  error: null,
} as InventoryState;

/* interface IInventory {
  city: {
    products: [
      {
        id: string;
        name: string;
        image_url: string;
        inStock: boolean;
        units: [{weight: string; price: number}];
        desc: string;
        rating: 0;
        category: string;
        type: string;
        inOffer: boolean;
        images_url: string[];
      },
    ];
  };
} */

/* const initialInventory: IInventory[] = [
  {
    city: {
      products: [
        {
          id: '',
          name: '',
          image_url: '',
          inStock: false,
          units: [{weight: '', price: 0}],
          desc: '',
          rating: 0,
          category: '',
          type: '',
          inOffer: false,
          images_url: [''],
        },
      ],
    },
  },
]; */

/* interface InventoryState {
  inventory: [];
  cities: [];
  error: unknown;
  loading: boolean;
}
const inventoryInitialState = {
  inventory: initialInventory,
  cities: [],
  error: null,
  loading: true,
} as InventoryState; */

let uid = 'GY4qFFzOWkfivVGzhmhYjU1Aoze2';
/* export const fetchInventory = createAsyncThunk('inventory/cities', async () => {
  const response = await fetch(
    `https://freshonlinemandi-default-rtdb.firebaseio.com/inventory/${uid}/.json`,
  );
  return response.json();
}); */

export const fetchInventory = createAsyncThunk(
  'inventory/fetchAllProducts',
  async (city_name: string, {rejectWithValue}) => {
    const response = await fetch(
      `https://freshonlinemandi-default-rtdb.firebaseio.com/inventory/${uid}/city/${city_name.toLowerCase()}/products.json`,
    );
    if (!response.ok) {
      //  const errorResData = await response.text();
      // const errorID = JSON.parse(errorResData);
      let message = 'Something went wrong';
      if (response.status == 401) {
        message = 'Permission denied.';
      }
      //throw new Error(message);
      return rejectWithValue(message);
    }
    /* const resData = await response.json();
    return resData; */

    return response.json();
  },
);

/* const inventorySlice = createSlice({
  name: 'inventory',
  initialState: inventoryInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
      state.cities = action.payload.cities;
    });
  },
}); */

const inventorySlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchInventory.pending, (state, _action) => {
      state.loading = true;
    }),
      builder.addCase(fetchInventory.fulfilled, (state, _action) => {
        state.products = _action.payload;
        //  state.product = action.payload.id;
        state.loading = false;
        //return {...state, products: action.payload.products, loading: false};
      }),
      builder.addCase(fetchInventory.rejected, (state, _action) => {
        state.error = _action.payload;
        state.loading = false;
      });
  },
});
//export const selectAllPosts = (state: {products: any}) => state.products;
export default inventorySlice.reducer;
//export const inventoryReducerFromSlice = inventorySlice.reducer;
