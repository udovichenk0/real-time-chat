import { BaseStore } from "./base-store";
export const createBaseSelector = <T>(key: string) => {
  return (state: BaseStore) => {
    if (key in state) {
      return state[key] as T;
    } else {
      throw new Error(`Selector ${key} is not registered`);
    }
  };
};
