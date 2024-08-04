import type { PropsWithChildren } from "../../solid";
import "./Admonition.css";

export namespace Admonition {
  export type Props = PropsWithChildren<{
    title: string
  }>;
}

export const Admonition = (props: Admonition.Props) => {
  return (<div class="admonition">
    {/* <div class="admonition-title">{props.title}</div> */}
    <div class="admonition-body">
      {props.children}
    </div>
  </div>);
}