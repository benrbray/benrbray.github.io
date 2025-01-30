import type { PropsWithChildren } from "../solid";

export const ExactQuote = (props: PropsWithChildren<{ source: string }>) => (
  <span class="exactquote" title={props.source}>
    {props.children}
  </span>
);