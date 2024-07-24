import type { PropsWithChildren } from "../solid";

export const FancyBox = (props: PropsWithChildren<{}>) => {
  return (<div class="fancy-box">
    {props.children}
  </div>);
}