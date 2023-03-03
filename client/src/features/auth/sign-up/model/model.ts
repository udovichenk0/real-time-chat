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
      console.log("sodfaosdjf");
      //   dispatch(sessionModel.actions.login());
      //   dispatch(sessionModel.actions.setProfile({ username }));
      // router.navigate("/");
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
