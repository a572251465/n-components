import { contextMenuProps, IDataField, IExtractProps } from "./types";
import { computed, ref } from "vue";

type IPosLocation = "left" | "top" | "width" | "height";
const basicLocation = { left: 0, top: 0, width: 0, height: 0 };
const addUnit = (value: unknown, unit = "px") => value + unit;

export const usePropsOrCustomField = (
  props: Omit<IExtractProps<typeof contextMenuProps>, "data" | "position"> & {
    data: IDataField[];
    position: { left: number; top: number };
  },
  emit
) => {
  const defaultSlotWrapperInfo =
    ref<Pick<DOMRect, IPosLocation>>(basicLocation);
  const panelWrapperInfo = ref<Pick<DOMRect, IPosLocation>>(basicLocation);
  const appendToBody = computed(() => props.appendToBody);
  const destroyOnClose = computed(() => props.destroyOnClose);
  const leaveAutoClose = computed(() => props.leaveAutoClose);
  const defaultWrapperRef = ref<HTMLDivElement>();
  const panelWrapperRef = ref<HTMLDivElement>();
  const showArrow = computed(() => props.showArrow);

  const bottomPosFlag = computed(() => {
    const defaultPosInfo = defaultSlotWrapperInfo.value;
    const panelPosInfo = panelWrapperInfo.value;
    const viewH = document.documentElement.clientHeight;
    return (
      viewH - defaultPosInfo.top - defaultPosInfo.height - 10 >
      panelPosInfo.height
    );
  });
  const computeDisplayStyles = computed(() => {
    const pos = computePosLocation(props.slotGap);
    return {
      left: addUnit(pos.left + props.position?.left || 0),
      top: addUnit(pos.top + props.position?.top || 0),
      minWidth: addUnit(props.minWidth),
      zIndex: props.zIndex,
    };
  });
  const showFlag = computed({
    get: () => props.modelValue,
    set: (value: boolean) => {
      emit("update:modelValue", value);
    },
  });
  const displayData = computed(() => {
    const data = (props.data || [])?.map(
      (item) =>
        ({
          ...item,
          isShow: item.isShow === false ? item.isShow : true,
          disabled: item.disabled === true ? item.disabled : false,
        } as IDataField)
    );
    return data.filter((item) => item.isShow);
  });
  const genInstanceId = ref<string | null>(null);

  const computePosLocation = (
    slotGap: number
  ): { left: number; top: number } => {
    const pos = { left: 0, top: 0 };
    const defaultPosInfo = defaultSlotWrapperInfo.value;
    const panelPosInfo = panelWrapperInfo.value;

    pos.left =
      defaultPosInfo.left +
      defaultPosInfo.width / 2 -
      (panelPosInfo.width || 0) / 2;
    pos.top = defaultPosInfo.top + defaultPosInfo.height + slotGap;
    if (!bottomPosFlag.value)
      pos.top =
        pos.top - defaultPosInfo.height - panelPosInfo.height - slotGap * 2;
    return pos;
  };

  return {
    defaultSlotWrapperInfo,
    panelWrapperInfo,
    panelWrapperRef,
    appendToBody,
    destroyOnClose,
    leaveAutoClose,
    defaultWrapperRef,
    showArrow,
    bottomPosFlag,
    computeDisplayStyles,
    showFlag,
    displayData,
    genInstanceId,
  };
};
