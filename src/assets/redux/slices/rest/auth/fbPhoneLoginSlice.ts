import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fbEmailLoginURL} from '../../../../globals';
import {ISignupORLoginPOSTData} from '../../../../interface';

export const fbUserPhoneLogin = createAsyncThunk(
  'user/phonelogin',
  async (data: ISignupORLoginPOSTData) => {
    const {email, password} = data;
    const response = await fetch(fbEmailLoginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });
    if (!response.ok) {
      const erroResData = await response.text();
      const errorID = JSON.parse(erroResData);
      let message = 'Something went wrong!';
      if (errorID.error.message == 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found';
      } else if (errorID.error.message == 'INVALID_PASSWORD') {
        message = 'This password is incorrect';
      }
      throw new Error(message);
    }
    /*   const resData = await response.json(); 
    return resData; */
    /*   await saveUserLoginToStorage(
      resData.data.token,
      resData.data.localId,
      resData.data.expiresIn,
    ); 

    return resData; fbLoggedUserRTDbFrom*/
    //return 'All ok';
    // console.log(resData);
    return response.json();
  },
);
interface IUserLogin {
  idToken: string;
  localId: string;
  expiresIn: string;
}
const initialUserLogin: IUserLogin = {
  idToken: '',
  localId: '',
  expiresIn: '',
};
interface UserLoginState {
  user: typeof initialUserLogin;
  loading: boolean;
  isLoggedIn: boolean;
}
const initialState = {
  user: initialUserLogin,
  loading: true,
  isLoggedIn: false,
} as UserLoginState;

const fbUserLoginSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fbUserPhoneLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isLoggedIn = true;
    });
  },
});

export default fbUserLoginSlice.reducer;
