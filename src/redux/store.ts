import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";

import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  userReducer,
});

const store = configureStore({
  reducer,
});
export default store;
