import { baseApi } from "@/shared/api";
import { AnyAction } from "@reduxjs/toolkit";

export const isRtkAction = (action: AnyAction): action is AnyAction => {
  return action.type.includes(baseApi.reducerPath);
};

// export const isAnyAction = (action: unknown):action is AnyAction => {
// 	return isPlay
// }
