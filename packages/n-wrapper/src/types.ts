import { InjectionKey, PropType } from "vue";

export type IFn<T = any> = (...args: T[]) => T;
export const wrapperProvideKey = Symbol() as InjectionKey<IFn>;
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
