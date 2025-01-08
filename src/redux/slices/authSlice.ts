import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoginMode: boolean;
  email: string;
  password: string;
  error: string | null;
  user: { email: string; password: string } | null;
}

const initialState: AuthState = {
  isLoginMode: true,
  email: "",
  password: "",
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginMode(state, action: PayloadAction<boolean>) {
      state.isLoginMode = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<{ email: string; password: string }>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const {
  setLoginMode,
  setEmail,
  setPassword,
  setError,
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
