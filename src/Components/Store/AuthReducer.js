import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: localStorage.getItem("emailId"),
  idToken: localStorage.getItem("idToken"),
  isPremiumUser: localStorage.getItem("isPremiumUser"),
  isLoggedIn: !!localStorage.getItem("emailId"),
  userName: localStorage.getItem("userName")
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      state.isPremiumUser = action.payload.isPremiumUser;
      state.userName = action.payload.userName;

      localStorage.setItem("emailId", action.payload.email);
      localStorage.setItem("idToken", action.payload.idToken);
      localStorage.setItem("isPremiumUser", action.payload.isPremiumUser);
      localStorage.setItem("userName", action.payload.userName);

      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = null;
      state.idToken = null;
      state.isPremiumUser = null;
      state.userName = null;

      localStorage.removeItem("emailId");
      localStorage.removeItem("idToken");
      localStorage.removeItem("isPremiumUser");
      localStorage.removeItem("userName");

      state.isLoggedIn = false;
    },
    isPremium: (state, action) => {
      localStorage.setItem("isPremiumUser", action.payload.isPremium);
      state.isPremiumUser = action.payload.isPremium;
    }
  }
});

export const AuthActions = authSlice.actions;

export default authSlice.reducer;
