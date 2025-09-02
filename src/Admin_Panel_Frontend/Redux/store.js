import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./Slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
   
  /*
 migrate: (state) => {
    return Promise.resolve(undefined); 
  },

*/
};

const userReducer = combineReducers({
  app: SliceReducer,
});

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persister = persistStore(store);
