import { PropType, VNode } from "vue";

export type IVNodeFn = () => VNode;
export type INormalFn = () => void;

export type IType = "success" | "warn" | "danger" | "info";
export type ITheme = "light" | "dark";
export interface IMessageProps {
  theme: "light" | "dark";
  message: string | IVNodeFn;
  type: IType;
  duration: number;
  showClose: boolean;
  autoClose: boolean;
  align: "left" | "center" | "right";
  onClose: INormalFn;
  offset: number;
}

export type IPartFn = (
  message: string | Omit<IMessageProps, "theme" | "type">
) => void;
type IMessageTypes = {
  success: IPartFn;
  warn: IPartFn;
  danger: IPartFn;
  info: IPartFn;
};

export type NMessageProps = {
  success: IPartFn;
  warn: IPartFn;
  danger: IPartFn;
  info: IPartFn;
  dark: IMessageTypes;
};

export const messageProps = {
  theme: {
    type: String as PropType<"light" | "dark">,
    default: "light",
    validator: (value: string) => ["light", "dark"].includes(value),
  },
  message: {
    type: [String, Function] as PropType<string | IVNodeFn>,
    required: true,
  },
  type: {
    type: String as PropType<"success" | "warn" | "danger" | "info">,
    default: "success",
    validator: (value: string) =>
      ["success", "warn", "danger", "info"].includes(value),
  },
  duration: {
    type: Number as PropType<number>,
    default: 3000,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
  align: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
    validator: (value: string) => ["left", "center", "right"].includes(value),
  },
  onClose: {
    type: Function,
    default: null,
  },
  offset: {
    type: Number,
    default: 16,
  },
};
