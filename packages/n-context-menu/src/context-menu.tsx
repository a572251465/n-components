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
    const basicClass = "context-menu";
    const appendToBody = computed(() => props.appendToBody);
    const destroyOnClose = computed(() => props.destroyOnClose);
    const leaveAutoClose = computed(() => props.leaveAutoClose);
    const defaultWrapperRef = ref<HTMLDivElement>();
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

    watch(showFlag, (value: boolean) => {
      if (!value) emit("on-cancel");
    });
    const [installFn, uninstallFn] = inject(wrapperProvideKey) || [];

    const willAddTriggerEvent = (e: MouseEvent) => {
      e.stopPropagation();
      showFlag.value = !showFlag.value;
    };
    const closePanelHandel = () => (showFlag.value = false);

    const panelRowSelectedCallback = (item: IDataField) => {
      emit("on-selected", item);
      closePanelHandel();
    };

    if (props.trigger === "contextmenu") document.oncontextmenu = () => false;
    onMounted(() => {
      // add bind event
      defaultWrapperRef.value?.addEventListener(
        props.trigger,
        willAddTriggerEvent
      );

      if (typeof installFn === "function") installFn(closePanelHandel);
    });
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
          class={flattenJoinSymbol([basicClass, "panel"])}
          onMouseleave={() =>
            leaveAutoClose.value ? closePanelHandel() : null
          }
        >
          {slots.panel ? (
            slots.panel()
          ) : (
            <MenuPanel
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
