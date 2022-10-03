import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAppTheme {
  isDark: boolean;
}

export interface AppThemeState {
  isDark: IAppTheme;
  loading: boolean;
}
const initialState = {
  isDark: false,
  loading: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      state.loading = true;
    },
  },
});

export default themeSlice.reducer;
export const {setIsDarkTheme} = themeSlice.actions;
