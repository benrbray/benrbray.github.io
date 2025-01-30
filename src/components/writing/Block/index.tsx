import type { PropsWithChildren } from "@components/solid";
import "./Block.css";

export namespace Admonition {
  export type Props = PropsWithChildren<{
    title: string
  }>;
}

export const Block = (props: Admonition.Props) => {

  return (<div class="block" style={`--block-label: "${props.title}."`}>
    <div class="block-body">
      {/* <div class="block-title">{props.title}</div> */}
      {props.children}
    </div>
  </div>);
}

export const TitledBlock = (title: string) => (props: PropsWithChildren<{}>) => {
  return <Block title={title}>
    {props.children}
  </Block>
}

export const Theorem = TitledBlock("Theorem");
export const Lemma = TitledBlock("Lemma");
export const Definition = TitledBlock("Definition");
export const Proposition = TitledBlock("Proposition");
export const Example = TitledBlock("Example");
export const Corollary = TitledBlock("Corollary");
export const Property = TitledBlock("Property");
export const Observation = TitledBlock("Observation");