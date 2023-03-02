import { sessionModel } from "@/models/session";
import { baseApi } from "@/service";
import { listenerMiddleware } from "@/shared/redux";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    ...sessionModel.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(baseApi.middleware);
  },
});
