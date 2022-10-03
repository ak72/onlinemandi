import {configureStore} from '@reduxjs/toolkit';
import fbUserByIDReducerFromSlice from '../slices/rest/auth/fbUserByIDSlice';
//import fbSignupUserReducerFromSlice from '../slices/rest/auth/fbSignupUserSlice';
import fbUserLoginFromSlice from '../slices/rest/auth/fbUserLoginSlice';
import inventoryReducerFromSlice from '../slices/rest/inventory/inventorySlice';
import themeReducerFromSlice from '../slices/themeSlice';
/*
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} FROM 'redux-persist/es/constants'
const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['themeReducerOfStore']
}
const persistedReducer = persistReducer(persistConfig, themeReducer);
*/

export const store = configureStore({
  reducer: {
    // fbSignupUserReducerOfStore: fbSignupUserReducerFromSlice,
    fbUserLoginOfStore: fbUserLoginFromSlice,
    fbUserByIDReducerOfStore: fbUserByIDReducerFromSlice,
    inventoryReducerOfStore: inventoryReducerFromSlice,
    themeReducerOfStore: themeReducerFromSlice,
    //themeReducerOfStore:persistedReducer
  },
  /* middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
      ignoredActions,
    }
  }), 
  devTools:process.env.NODE_ENV !== 'production' */
});

//export let persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
