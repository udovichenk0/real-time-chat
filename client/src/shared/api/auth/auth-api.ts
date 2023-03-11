import { baseApi } from "../base-api";
import { SessionUser } from "./type";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.query<SessionUser, void>({
      query: () => ({
        url: "signin",
        credentials: 'include'
      }),
    }),
  }),
});

export const { useSignInQuery } = authApi;
