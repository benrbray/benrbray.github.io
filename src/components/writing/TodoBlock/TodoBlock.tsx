import type { PropsWithChildren } from "@root/components/solid";
import "./TodoBlock.css";

export const TodoBlock = (props: PropsWithChildren<{}>) => {
  return (<div class="todo-block">
    <span style={{ "font-weight": "bold" }}>Todo:</span>
    {props.children}
  </div>);
}