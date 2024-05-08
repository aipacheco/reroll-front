import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import itemReducer from "./itemSlice"
import addressReducer from "./addressSlice"
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { encryptTransform } from "redux-persist-transform-encrypt"

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  address: addressReducer,
})

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_SECRET_KEY,
      onError: function (error) {
        console.log(error)
      },
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
