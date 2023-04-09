import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  Transition,
  watch,
  h,
  render,
} from "vue";
import { contextMenuProps, IDataField } from "./types";
import { flattenJoinSymbol } from "@lihh/n-utils";
import { wrapperProvideKey } from "@lihh/n-wrapper";
import MenuPanel from "./menu-panel";
import { usePropsOrCustomField } from "./helper";

const basicClass = "context-menu";
const componentName = "n-context-menu";
let idCount = (Math.random() * 1000000) | 0;
const cacheMap = new WeakMap<object, HTMLDivElement>();

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
      genInstanceId,
    } = usePropsOrCustomField(props, emit);

    watch(showFlag, (value: boolean) => {
      if (value) addContextMenuOnBody();
      else {
        emit("on-cancel");
        removeContextMenuOnBody();
      }
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

    const addContextMenuOnBody = () => {
      if (!appendToBody.value || genInstanceId.value) return;

      genInstanceId.value = new String(
        flattenJoinSymbol(["context", "menu", "id", idCount++])
      );
      const element = document.createElement("div");
      element.id = genInstanceId.value.valueOf();
      render(componentToBody(), element);
      document.body.appendChild(element);
      cacheMap.set(genInstanceId.value, element);
    };

    const removeContextMenuOnBody = () => {
      if (!appendToBody.value || !leaveAutoClose.value) return;

      const element = cacheMap.get(genInstanceId.value!) as HTMLDivElement;
      render(null, element);
      genInstanceId.value = null;
      element.parentNode!.removeChild(element);
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

    const componentToBody = () => (
      <Transition name="context-menu-fade">
        <div
          v-show={showFlag.value}
          class={flattenJoinSymbol([basicClass, "blank"])}
        >
          {commonComponent()}
        </div>
      </Transition>
    );

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
          <Transition name="context-menu-fade">
            {destroyOnClose.value ? (
              showFlag.value ? (
                commonComponent()
              ) : null
            ) : (
              <div
                class={flattenJoinSymbol([basicClass, "blank"])}
                v-show={showFlag.value}
              >
                {commonComponent()}
              </div>
            )}
          </Transition>
        )}
      </div>
    );
  },
});
