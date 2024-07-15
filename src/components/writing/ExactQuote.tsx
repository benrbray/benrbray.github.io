import type { PropsWithChildren } from "../solid";

export const ExactQuote = (props: PropsWithChildren<{}>) => (
  <span class="exactquote">
    {props.children}
  </span>
);