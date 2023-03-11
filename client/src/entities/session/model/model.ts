import { SessionUser } from "@/shared/api/auth";
import { createBaseSelector } from "@/shared/lib/redux";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {store} from "@/app/redux/store";

const initialState = {
  isAuthenticated: false,
  profile: {
    username: "",
  } as SessionUser,
};
const name = "models/session-model";
type State = typeof initialState;
export const slice = createSlice({
  name,
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    setProfile(state, action: PayloadAction<SessionUser>) {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

const baseSelector = createBaseSelector<State>(name);

const isAuthenticated = createSelector(
  baseSelector,
  (state) => state.isAuthenticated
);

const profile = createSelector(baseSelector, (state) => state.profile)

export const actions = {
  login: slice.actions.login,
  setProfile: slice.actions.setProfile,
};
export const selectors = { isAuthenticated, profile };
export const reducer = { [slice.name]: slice.reducer };
