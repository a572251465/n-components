import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  Transition,
  watch,
} from "vue";
import { contextMenuProps, IDataField } from "./types";
import { flattenJoinSymbol } from "@lihh/n-utils";
import { wrapperProvideKey } from "@lihh/n-wrapper";
import MenuPanel from "./menu-panel";
import { usePropsOrCustomField } from "./helper";

const basicClass = "context-menu";
const componentName = "n-context-menu";

export default defineComponent({
  name: componentName,
  props: contextMenuProps,
  components: {
    MenuPanel,
    Transition,
  },
  emits: ["on-cancel", "on-selected", "update:modelValue"],
  setup(props, { slots, emit }) {
    const [installFn, uninstallFn] = inject(wrapperProvideKey) || [];
    const {
      defaultWrapperRef,
      defaultSlotWrapperInfo,
      panelWrapperInfo,
      panelWrapperRef,
      appendToBody,
      destroyOnClose,
      leaveAutoClose,
      computeDisplayStyles,
      showFlag,
      displayData,
      showArrow,
      bottomPosFlag,
    } = usePropsOrCustomField(props, emit);

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
      showFlag.value = !showFlag.value;
      if (props.trigger === "click") e.stopPropagation();
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
          class={[
            flattenJoinSymbol([basicClass, "panel"]),
            showArrow.value
              ? flattenJoinSymbol([
                  basicClass,
                  `arrow--${bottomPosFlag.value ? "top" : "bottom"}`,
                ])
              : "",
          ]}
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
