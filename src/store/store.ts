import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice, { IAuthState } from "./features/AuthSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import CitySlice, { ICityState } from "./features/CitySlice";

export interface IStateInterface {
  authentication: IAuthState;
  cities: ICityState;
}

const rootReducer = combineReducers({
  authentication: AuthSlice,
  cities: CitySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
