import { IPartFn, ITheme, IType, NMessageProps } from "./types";

const handleMessage =
  (info: { type: IType; theme: ITheme } | IType): IPartFn =>
  (message) => {
    console.log(info, message);
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
