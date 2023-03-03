import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useAction = <T extends any[]>(
  actionCreator: (...args: T) => any
) => {
  const dispatch = useDispatch();

  return useCallback(
    (...args: T) => {
      dispatch(actionCreator.apply(null, args));
    },
    [dispatch, actionCreator]
  );
};
