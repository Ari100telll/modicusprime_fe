import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {mainApi} from "./services/main";
import {baseApi} from "./services/base";
import {rtkQueryErrorLogger} from "./services/middleware";
import {setupListeners} from "@reduxjs/toolkit/query";
import userReducer from "./slices/user";
import uiReducer from "./slices/ui";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
  user: userReducer,
  ui: uiReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(rtkQueryErrorLogger),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector