import { computed, defineComponent, onMounted, Transition } from "vue";
import { messageProps } from "./types";
import { equals, flattenJoinSymbol } from "@lihh/n-utils";

const componentName = "n-message";

export default defineComponent({
  name: componentName,
  props: messageProps,
  components: {
    Transition,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const wrapperClasses = computed(() => [
      flattenJoinSymbol([componentName, props.type]),
      flattenJoinSymbol([componentName, props.theme]),
      flattenJoinSymbol(["message", "theme", props.theme]),
    ]);
    const showFlag = computed({
      get: () => props.modelValue,
      set: (newValue: boolean) => {
        emit("update:modelValue", newValue);
      },
    });
    const iconClasses = computed(() => [
      "icon",
      "iconfont",
      `icon-${props.type}`,
    ]);

    const autoCloseMessage = () => {
      if (equals(props.autoClose, false) || equals(props.duration, 0)) return;

      let timer = setTimeout(() => {
        showFlag.value = false;
        clearTimeout(timer as number);
        timer = null;
      }, props.duration) as number | null;
    };

    const handCloseMessage = () => {
      showFlag.value = false;
    };

    onMounted(() => {
      autoCloseMessage();
    });

    return () => (
      <Transition name="fade">
        {showFlag.value ? (
          <div class={wrapperClasses.value}>
            <div class={flattenJoinSymbol([componentName, "left"])}>
              <i class={iconClasses.value}></i>
            </div>
            <div class={flattenJoinSymbol([componentName, "body"])}>
              {props.message}
            </div>
            {props.showClose ? (
              <div class={flattenJoinSymbol([componentName, "right"])}>
                <i
                  class="icon iconfont icon-close"
                  onClick={handCloseMessage}
                ></i>
              </div>
            ) : null}
          </div>
        ) : null}
      </Transition>
    );
  },
});
