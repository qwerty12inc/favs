import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export interface IAuthState {
    isLogined: boolean;
    authData: User;
}

const initialState: IAuthState = {
    isLogined: true,
    authData: null,
};

export const AuthSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuthentication: (state, action: PayloadAction<User>) => {
            state.isLogined = true;
            state.authData = action.payload
        },
        resetAuthentication: (state) => {
            state.isLogined = false;
            state.authData = null;
        },
    },
});

export const { setAuthentication, resetAuthentication } = AuthSlice.actions;

export default AuthSlice.reducer;
