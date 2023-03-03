import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api";

export const loginThunk = createAsyncThunk<
  any,
  { username: string; password: string }
>(
  "loginThunk",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await login({ username, password });
      console.log("sodfaosdjf");
      //   dispatch(sessionModel.actions.login());
      //   dispatch(sessionModel.actions.setProfile({ username }));
      // router.navigate("/");
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
