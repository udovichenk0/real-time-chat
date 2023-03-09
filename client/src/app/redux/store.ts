import { sessionModel } from "@/entities/session";
import { usersModel } from "@/entities/user";
import { baseApi } from "@/shared/api";
import { listenerMiddleware } from "@/shared/lib/redux/listener";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    ...sessionModel.reducer,
    ...usersModel.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(baseApi.middleware);
  },
});
