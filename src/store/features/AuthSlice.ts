import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  isLogined: boolean;
}

const initialState: IAuthState = {
  isLogined: false,
};

export const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isLogined = true;
    },
    resetAuthentication: (state) => {
      state.isLogined = false;
    },
  },
});

export const { setAuthentication, resetAuthentication } = AuthSlice.actions;

export default AuthSlice.reducer;
