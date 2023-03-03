import { TypedUseSelectorHook, useSelector } from "react-redux";
import { BaseStore } from "./base-store";

export const useAppSelector: TypedUseSelectorHook<BaseStore> = useSelector;
