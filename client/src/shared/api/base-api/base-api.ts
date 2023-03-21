import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ['Friend'],
  baseQuery: fetchBaseQuery({ baseUrl: "https://real-time-chat-steel.vercel.app/" }),
  endpoints: () => ({}),
});
