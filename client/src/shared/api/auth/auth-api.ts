import { baseApi } from "../base-api";
import { Profile } from "./type";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.query<Profile, void>({
      query: () => ({
        url: "signin",
        credentials: 'include'
      }),
    }),
  }),
});

export const { useSignInQuery } = authApi;
