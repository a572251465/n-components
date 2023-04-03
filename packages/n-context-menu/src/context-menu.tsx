import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  VNodeRef,
} from "vue";
import { contextMenuProps } from "./types";

const componentName = "n-context-menu";

export default defineComponent({
  name: componentName,
  props: contextMenuProps,
  emits: ["on-cancel", "on-selected"],
  setup(props, { slots }) {
    const classNames = computed(() => [componentName]);
    const appendToBody = computed(() => props.appendToBody);
    const destroyOnClose = computed(() => props.destroyOnClose);
    const defaultWrapperRef = ref<HTMLDivElement>();
    const panelShowFlag = ref<boolean>(false);

    const willAddTriggerEvent = (e: Event) => {};

    if (props.trigger === "contextmenu") document.oncontextmenu = () => false;

    onMounted(() => {
      // add bind event
      defaultWrapperRef.value?.addEventListener(
        props.trigger,
        willAddTriggerEvent
      );
    });
    onUnmounted(() => {
      // remove bind event
      defaultWrapperRef.value?.removeEventListener(
        props.trigger,
        willAddTriggerEvent
      );
    });

    return () => (
      <div class={classNames.value}>
        <div ref={defaultWrapperRef} class={classNames.value.concat("-inner")}>
          {slots.default?.()}
        </div>
        {appendToBody.value ? null : (
          <div class={classNames.value.concat("-panel")}>

          </div>
        )}
      </div>
    );
  },
});
