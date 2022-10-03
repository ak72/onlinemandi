import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fbEmailLoginURL} from '../../../../globals';
import {ISignupORLoginPOSTData} from '../../../../interface';

export const fbUserLogin = createAsyncThunk(
  'user/login',
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
      if (response.status == 400) {
        if (errorID.error.message == 'EMAIL_NOT_FOUND') {
          message = 'No user with this email exist';
        } else if (errorID.error.message == 'INVALID_PASSWORD') {
          message = 'The password is incorrect';
        } else if ((errorID.error.message = 'TOO_MANY_ATTEMPTS_TRY_LATER')) {
          message = 'Too many attempts, try again later..';
        }
      }
      throw new Error(message);
    }
    /*   const resData = await response.json(); 
    console.log(resData);
    return resData; */
    /*   await saveUserLoginToStorage(
      resData.data.token,
      resData.data.localId,
      resData.data.expiresIn,
    ); 

    return resData; fbLoggedUserRTDbFrom*/
    //return 'All ok';
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
export interface UserLoginState {
  user: typeof initialUserLogin;
  loading: boolean;
  // isLoggedIn: boolean;
  error: unknown;
}
const initialState = {
  user: initialUserLogin,
  loading: true,
  //isLoggedIn: false,
  error: null,
} as UserLoginState;

const fbUserLoginSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fbUserLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      //  state.isLoggedIn = true;
    }),
      builder.addCase(fbUserLogin.pending, (state, _action) => {
        state.loading = true;
      }),
      builder.addCase(fbUserLogin.rejected, (state, action) => {
        state.loading = true;
        //  state.isLoggedIn = false;
        state.error = action.error.message;
      });
  },
});

export default fbUserLoginSlice.reducer;
