import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  ref,
  VNodeRef,
} from "vue";
import {
  IFn,
  IWrapperInstallFn,
  IWrapperUninstallFn,
  WrapperProps,
  wrapperProvideKey,
} from "./types";

const componentName = "n-wrapper";

export default defineComponent({
  name: componentName,
  props: WrapperProps,
  setup: function (props, { slots }) {
    const classNames = computed(() => [componentName, ...props.classNames]);
    const elRef = ref<VNodeRef | null>(null);

    const bindFn: IFn[] = [];
    const injectFn: IFn[] = [];
    let sureEventsNames = [] as string[];

    const installFn: IWrapperInstallFn = (callback) => {
      if (~injectFn.indexOf(callback)) return;
      injectFn.push(callback);
    };
    const unInstallFn: IWrapperUninstallFn = (callback) => {
      const index = injectFn.findIndex((fn) => fn == callback);
      if (~index) injectFn.splice(index, 1);
    };
    provide(wrapperProvideKey, [installFn, unInstallFn]);

    const bindEventFunction = () => {
      const el = (elRef.value as HTMLDivElement) || window;
      sureEventsNames = props.eventNames.filter((name) => {
        if (!Reflect.has(el, `on${name}`)) {
          console.warn(`event name invalid. example: click, mousedown...`);
          return false;
        }
        return true;
      });

      sureEventsNames.forEach((name) => {
        const addFn = (e: Event) => {
          injectFn.forEach((fn) => {
            if (typeof fn === "function") fn([name, e]);
          });
        };
        bindFn.push(addFn);
        if (!!el) el.addEventListener(name, addFn);
      });
    };

    const unBindEventFunction = () => {
      const el = elRef.value as HTMLDivElement;
      sureEventsNames.forEach((name, index) => {
        if (!!el) el.removeEventListener(name, bindFn[index]);
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
