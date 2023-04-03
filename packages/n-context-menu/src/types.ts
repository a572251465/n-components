import { PropType } from "vue";

export type IDataField = {
  value: string;
  label: string;
  isShow?: boolean;
};

export const contextMenuProps = {
  trigger: {
    type: String as PropType<"contextmenu" | "click">,
    default: "contextmenu",
    validator: (value: string) => ["contextmenu", "click"].includes(value),
  },
  data: {
    type: Array as PropType<IDataField[]>,
    default: [],
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  position: {
    type: Object as PropType<{ top: number; left: number }>,
    default: () => ({ top: 0, left: 0 }),
  },
};
