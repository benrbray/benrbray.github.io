import type { ParentProps } from "solid-js";
import style from "./LongQuote.module.css";

export namespace LongQuote {
  export type Props = ParentProps<{

  }>;
}

export const LongQuote = (props: LongQuote.Props) => {
  return <div class={style.longQuote}>
    {props.children}
  </div>
}