import { authApi } from "@/service";
import { createBaseSelector } from "@/shared/hooks/create-base-selector";
import { listenerMiddleware } from "@/shared/redux";
import { isRtkAction } from "@/shared/redux-type-guard";
import { router } from "@/shared/router";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isAllOf,
  isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./api";
type Profile = {
  username: string;
};
const initialState = {
  isAuthenticated: false,
  profile: {} as Profile,
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
    setProfile(state, action) {
      console.log(action);
      state.profile = action.payload;
    },
  },
});

export const loginThunk = createAsyncThunk<
  any,
  { username: string; password: string }
>(
  "loginThunk",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await login({ username, password });
      const d = await axios.get("http://localhost:3001");
      if (data.status == 200) {
        dispatch(slice.actions.setProfile(username));
        // router.navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const baseSelector = createBaseSelector<State>(name);

const isAuthenticated = createSelector(
  baseSelector,
  (state) => state.isAuthenticated
);

export const selectors = { isAuthenticated };
export const reducer = { [slice.name]: slice.reducer };
