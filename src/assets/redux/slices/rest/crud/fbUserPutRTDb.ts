//import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fbSignedUserRTDbURL} from '../../../../globals';

/* const initialSignedUserRTDb: IUserInfo = {
  first_name: '',
  last_name: '',
  email: '',
  city: '',
  image_url: '',
  mobile: 0,
}; */

/* export interface SignedUserRTDbState {
  user: typeof fbUserMap;
  loading: boolean;
  error: unknown;
}

const initialState = {
  user: fbUserMap,
  loading: true,
  error: null,
} as SignedUserRTDbState; */

/* export const fbUserPutRTDb = createAsyncThunk(
  'user/putrtdb', */
export const fbUserPutRTDb = async (put: any) => {
  //  const userpost = post;
  console.log('url received is ' + fbSignedUserRTDbURL + put.url + '.json');
  console.log('data received is ,', put.data);
  const response = await fetch(fbSignedUserRTDbURL + put.url + '.json', {
    // const response = await fetch(fbSignedUserRTDbURL + post.localId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(put.data),
  });

  if (!response.ok) {
    const errorResData = await response.text();
    const errorID = JSON.parse(errorResData);
    let message = 'Something went wrong';
    if (errorID.error === 'Permission denied.') {
      message = 'You dont have permission to use this data';
    } else if (errorID.error === 'Unauthorized request.') {
      message = 'This password is incorrect';
    } else if (errorID.error === 'Failed to validate signature.') {
    } else if (errorID.error === 'No data supplied.') {
    }
    //  ('status==404',400);
    throw new Error(message);
  }
  return await response.json();
};
/*);

 const fbUserPutRTDbSlice = createSlice({
  name: 'putrtdb',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fbUserPutRTDb.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      
    });
  },
});

export default fbUserPutRTDbSlice.reducer; */

//`https://freshonlinemandi-default-rtdb.firebaseio.com/users/${authid}.json?auth=${idToken}`

//https://freshonlinemandi-default-rtdb.firebaseio.com/users/GY4qFFzOWkfivVGzhmhYjU1Aoze2.json
