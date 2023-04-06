import { PropType } from "vue";

export type IDataField = {
  value: string;
  label: string;
  isShow?: boolean;
  disabled?: boolean;
};

const isPropNumber = (value: number) => typeof value === "number";

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
  slotGap: {
    type: Number,
    default: 5,
    validator: (value: number) => isPropNumber(value),
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  leaveAutoClose: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Object as PropType<{ top: number; left: number }>,
    default: () => ({ top: 0, left: 0 }),
  },
  align: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
    validator: (value: string) => ["left", "center", "right"].includes(value),
  },
  minWidth: {
    type: Number,
    default: 100,
    validator: (value: number) => isPropNumber(value),
  },
  zIndex: {
    type: Number,
    default: 10,
    validator: (value: number) => isPropNumber(value),
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
};
