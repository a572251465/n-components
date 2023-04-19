import { computed, defineComponent } from "vue";
import { messageProps } from "./types";
import { flattenJoinSymbol } from "@lihh/n-utils";

const componentName = "n-message";

export default defineComponent({
  name: componentName,
  props: messageProps,
  setup(props) {
    const wrapperClasses = computed(() => [
      flattenJoinSymbol([componentName, props.type]),
      flattenJoinSymbol([componentName, props.theme]),
    ]);

    return () => (
      <div class={wrapperClasses.value}>
        <div class={flattenJoinSymbol([componentName, "left"])}></div>
        <div class={flattenJoinSymbol([componentName, "body"])}></div>
        <div class={flattenJoinSymbol([componentName, "right"])}></div>
      </div>
    );
  },
});
