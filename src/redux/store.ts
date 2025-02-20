import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/redux/slices/uiSlice";
import authReducer from "@/redux/slices/authSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
