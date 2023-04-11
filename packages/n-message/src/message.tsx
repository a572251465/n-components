import { defineComponent } from "vue";
import { messageProps } from "./types";

const componentName = "n-message";

export default defineComponent({
  name: componentName,
  props: messageProps,
});
