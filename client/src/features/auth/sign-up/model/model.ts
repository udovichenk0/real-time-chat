import { sessionModel } from "@/entities/session";
import { router } from "@/shared/lib/router";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../api";

export const registerThunk = createAsyncThunk<
  any,
  { username: string; password: string }
>(
  "registerThunk",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await register({ username, password });
      dispatch(sessionModel.actions.login());
      dispatch(sessionModel.actions.setProfile(data));
      router.navigate("/");
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
