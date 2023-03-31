import { InjectionKey, PropType } from "vue";

export type IFn<T = any> = (...args: T[]) => any;
export type IWrapperInjectFn = (fn: IFn<IWrapperInjectFnParams>) => void;
export type IWrapperInjectFnParams = [string, Event];
export const wrapperProvideKey = Symbol() as InjectionKey<IWrapperInjectFn>;
export const WrapperProps = {
  eventNames: {
    type: Array as PropType<string[]>,
    default: ["click"],
  },
  classNames: {
    type: Array as PropType<string[]>,
    default: [],
  },
};
