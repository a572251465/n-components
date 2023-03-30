import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  ref,
  VNodeRef,
} from "vue";
import { IFn, WrapperProps, wrapperProvideKey } from "./types";

export default defineComponent({
  name: "n-wrapper",
  props: WrapperProps,
  setup: function (props, { slots }) {
    const classNames = computed(() => props.classNames);
    const elRef = ref<VNodeRef | null>(null);

    const bindFn: IFn[] = [];
    const injectFn: IFn[] = [];
    let sureEventsNames = [] as string[];

    provide(wrapperProvideKey, (callback: IFn) => {
      injectFn.push(callback);
    });

    const bindEventFunction = () => {
      const el = elRef.value as HTMLDivElement;
      sureEventsNames = props.eventNames.filter((name) => {
        if (Reflect.has(el, `on${name}`)) {
          console.warn(`event name invalid. example: click, mousedown...`);
          return false;
        }
        return true;
      });

      sureEventsNames.forEach((name) => {
        const addFn = (...args: any[]) => {
          injectFn.forEach((fn) => {
            if (typeof fn === "function") fn(name, ...args);
          });
        };
        bindFn.push(addFn);
        el.addEventListener(name, addFn);
      });
    };

    const unBindEventFunction = () => {
      const el = elRef.value as HTMLDivElement;
      sureEventsNames.forEach((name, index) => {
        el.removeEventListener(name, bindFn[index]);
      });
      bindFn.length = 0;
    };
    onMounted(() => {
      bindEventFunction();
    });
    onUnmounted(() => {
      unBindEventFunction();
    });

    return () => (
      <div ref={elRef} class={classNames.value}>
        {slots.default ? slots.default() : ""}
      </div>
    );
  },
});
