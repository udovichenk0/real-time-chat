import { baseApi } from "../base-api/base-api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<any, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "signin",
        method: "POST",
        body: { username, password },
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
