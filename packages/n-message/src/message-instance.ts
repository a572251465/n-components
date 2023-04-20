import {
  IMessageProps,
  INormalFn,
  IPartFn,
  ITheme,
  IType,
  NMessageProps,
} from "./types";
type IMergeType = Omit<IMessageProps, "theme" | "type">;

let globalConfigField: Partial<IMergeType> = {};
export const useGlobalMessageField = (mergeInfo: IMergeType) => {
  globalConfigField = mergeInfo;
};

const defaultFn = Function.prototype as INormalFn;
const defaultValues: IMessageProps = {
  duration: 3000,
  theme: "light",
  message: "",
  type: "success",
  showClose: true,
  autoClose: true,
  align: "left",
  onClose: defaultFn,
  offset: 16,
  modelValue: false,
};

const handleMessage =
  (info: { type: IType; theme: ITheme } | IType): IPartFn =>
  (message) => {
    const mergeInfo = (
      typeof info === "string" ? { type: info, theme: "light" } : info
    ) as { type: IType; theme: ITheme };
    const mergeOptions = Object.assign(
      mergeInfo,
      typeof message === "string" ? { message } : message
    ) as Partial<IMessageProps>;
    const finalOptions = Object.assign(
      {},
      defaultValues,
      globalConfigField,
      mergeOptions
    ) as IMessageProps;

    console.log(finalOptions);
  };

const handleProps = (theme?: ITheme) => {
  return (["success", "dark", "info", "warn"] as const).reduce((memo, curr) => {
    memo[curr] = handleMessage(
      theme ? { type: curr as IType, theme: theme } : (curr as IType)
    );
    return memo;
  }, {} as Record<IType, IPartFn>);
};

const NMessage: NMessageProps = {
  ...handleProps("light"),
  dark: handleProps("dark"),
};

export { NMessage };
export default NMessage;
