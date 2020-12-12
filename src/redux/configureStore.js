import { createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import reducer from "./Modules/index";

const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage, // define which storage to use
  blacklist: ['studentlist']
};

const persistedReducer = persistReducer(persistConfig, reducer); // create a persisted reducer

const store = createStore(persistedReducer, applyMiddleware()); // add any middlewares here);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor };
