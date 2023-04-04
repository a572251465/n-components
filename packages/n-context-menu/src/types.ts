import { PropType } from "vue";

export type IDataField = {
  value: string;
  label: string;
  isShow?: boolean;
  disabled?: boolean;
};

export const contextMenuProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
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
  leaveAutoClose: {
    type: Boolean,
    default: true,
  },
  position: {
    type: Object as PropType<{ top: number; left: number }>,
    default: () => ({ top: 0, left: 0 }),
  },
};
