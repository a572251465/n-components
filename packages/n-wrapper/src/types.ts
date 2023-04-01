import { InjectionKey, PropType } from "vue";

export type IFn<T = any> = (...args: T[]) => any;
export type IWrapperInstallFn = (fn: IFn<IWrapperInjectFnParams>) => void;
export type IWrapperUninstallFn = (fn: IFn) => void;
export type IWrapperInjectFnParams = [string, Event];
export type IWrapperInjectFn = {
  installFn: IWrapperInstallFn;
  unInstallFn: IWrapperUninstallFn;
};
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
