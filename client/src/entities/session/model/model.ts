import { createBaseSelector } from "@/shared/lib/redux";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Profile = {
  username: string;
};
const initialState = {
  isAuthenticated: false,
  profile: {
    username: "",
  } as Profile,
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
    setProfile(state, action: PayloadAction<{ username: string }>) {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

const baseSelector = createBaseSelector<State>(name);

const isAuthenticated = createSelector(
  baseSelector,
  (state) => state.isAuthenticated
);

export const actions = {
  login: slice.actions.login,
  setProfile: slice.actions.setProfile,
};
export const selectors = { isAuthenticated };
export const reducer = { [slice.name]: slice.reducer };
