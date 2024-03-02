import { createSlice } from '@reduxjs/toolkit';
import { TFormStage } from '../../models/forms';

export interface IFormState {
  formStage: TFormStage;
}

const initialState: IFormState = {
  formStage: 'email',
};

export const AuthSlice = createSlice({
  name: 'registration form',
  initialState,
  reducers: {
    setConfirmStep: (state) => {
      state.formStage = 'code';
    },
    setEmailStep: (state) => {
      state.formStage = 'email';
    },
  },
});

export const { setConfirmStep, setEmailStep } = AuthSlice.actions;

export default AuthSlice.reducer;
