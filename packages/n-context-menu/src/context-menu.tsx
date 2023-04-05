import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  Transition,
  watch,
} from "vue";
import { contextMenuProps, IDataField } from "./types";
import { flattenJoinSymbol } from "@lihh/n-utils";
import { wrapperProvideKey } from "@lihh/n-wrapper";
import MenuPanel from "./menu-panel";

type IPosLocation = "left" | "top" | "width" | "height";
const componentName = "n-context-menu";
const basicLocation = { left: 0, top: 0, width: 0, height: 0 };
const defaultSlotWrapperInfo = ref<Pick<DOMRect, IPosLocation>>(basicLocation);
const panelWrapperInfo = ref<Pick<DOMRect, IPosLocation>>(basicLocation);

const computePosLocation = (slotGap: number): { left: number; top: number } => {
  const pos = { left: 0, top: 0 };
  const defaultPosInfo = defaultSlotWrapperInfo.value;
  const panelPosInfo = panelWrapperInfo.value;

  const viewH = document.documentElement.clientHeight;
  const bottomPosFlag =
    viewH - defaultPosInfo.top - defaultPosInfo.height - 10 >
    panelPosInfo.height;

  pos.left =
    defaultPosInfo.left +
    defaultPosInfo.width / 2 -
    (panelPosInfo.width || 0) / 2;
  pos.top = defaultPosInfo.top + defaultPosInfo.height + slotGap;
  if (!bottomPosFlag)
    pos.top =
      pos.top - defaultPosInfo.height - panelPosInfo.height - slotGap * 2;
  return pos;
};
const addUnit = (value: unknown, unit = "px") => value + unit;

export default defineComponent({
  name: componentName,
  props: contextMenuProps,
  components: {
    MenuPanel,
    Transition,
  },
  emits: ["on-cancel", "on-selected", "update:modelValue"],
  setup(props, { slots, emit }) {
    const basicClass = "context-menu";
    const appendToBody = computed(() => props.appendToBody);
    const destroyOnClose = computed(() => props.destroyOnClose);
    const leaveAutoClose = computed(() => props.leaveAutoClose);
    const defaultWrapperRef = ref<HTMLDivElement>();
    const panelWrapperRef = ref<HTMLDivElement>();
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
      const data = (props.data || [])?.map((item) => ({
        ...item,
        isShow: item.isShow === false ? item.isShow : true,
        disabled: item.disabled === true ? item.disabled : false,
      }));
      return data.filter((item) => item.isShow);
    });
    const [installFn, uninstallFn] = inject(wrapperProvideKey) || [];

    watch(showFlag, (value: boolean) => {
      if (!value) emit("on-cancel");
    });
    watch([showFlag, () => props.data], () => {
      queueMicrotask(() => {
        if (!!panelWrapperRef.value) {
          panelWrapperInfo.value =
            panelWrapperRef.value?.getBoundingClientRect();
        }
      });
    });

    const willAddTriggerEvent = (e: MouseEvent) => {
      e.stopPropagation();
      showFlag.value = !showFlag.value;
    };
    const closePanelHandel = () => (showFlag.value = false);
    const initMethod = () => {
      // add bind event
      defaultWrapperRef.value?.addEventListener(
        props.trigger,
        willAddTriggerEvent
      );

      if (typeof installFn === "function") installFn(closePanelHandel);

      defaultSlotWrapperInfo.value =
        defaultWrapperRef.value?.getBoundingClientRect()!;
    };

    const panelRowSelectedCallback = (item: IDataField) => {
      emit("on-selected", item);
      closePanelHandel();
    };

    if (props.trigger === "contextmenu") document.oncontextmenu = () => false;
    onMounted(initMethod);
    onUnmounted(() => {
      // remove bind event
      defaultWrapperRef.value?.removeEventListener(
        props.trigger,
        willAddTriggerEvent
      );

      if (typeof uninstallFn === "function") uninstallFn(closePanelHandel);
    });

    const commonComponent = () => {
      return (
        <div
          style={computeDisplayStyles.value}
          class={flattenJoinSymbol([basicClass, "panel"])}
          ref={panelWrapperRef}
          onMouseleave={() =>
            leaveAutoClose.value ? closePanelHandel() : null
          }
        >
          {slots.panel ? (
            slots.panel()
          ) : (
            <MenuPanel
              {...props}
              data={displayData.value}
              onSelected={panelRowSelectedCallback}
            />
          )}
        </div>
      );
    };

    return () => (
      <div class={basicClass}>
        <div
          ref={defaultWrapperRef}
          class={flattenJoinSymbol([basicClass, "wrapper"])}
        >
          {slots.default?.()}
        </div>
        {appendToBody.value ? null : (
          <Transition name="fade">
            {showFlag.value ? commonComponent() : null}
          </Transition>
        )}
      </div>
    );
  },
});
