import { computed, defineComponent, PropType } from "vue";
import { IDataField } from "./types";
import { flattenJoinSymbol as mergeFn } from "@lihh/n-utils";

const basicClass = mergeFn(["context-menu", "panel"]);
const rowClass = mergeFn([basicClass, "row"]);

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataField[]>,
      default: [],
    },
    align: {
      type: String as PropType<"left" | "center" | "right">,
      default: "left",
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const data = computed(() => props.data || []);

    const rowClickHandel = (item: IDataField, e: MouseEvent) => {
      e.stopPropagation();
      emit("selected", item);
    };

    return () => (
      <ul>
        {data.value.map((item) => {
          return (
            <li
              key={item.value}
              onClick={(e) => rowClickHandel(item, e)}
              class={[
                rowClass,
                item.disabled ? mergeFn([rowClass, "disabled"], "__") : "",
                mergeFn([rowClass, props.align], "--"),
              ]}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    );
  },
});
