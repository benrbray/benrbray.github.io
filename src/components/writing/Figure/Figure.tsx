import type { PropsWithChildren } from "@components/solid";
import style from "./Figure.module.css";

/* -------------------------------------------------------------------------- */

export namespace FigContent {
  export type Props = PropsWithChildren<{
    ncols?: number
  }>;
}

export const FigContent = (props: FigContent.Props) => {
  return <div
    class={style.figcontent}
    style={{
      "grid-template-columns": props.ncols ? "1fr".repeat(props.ncols) : undefined
    }}
  >
    {props.children}
  </div>
}

/* -------------------------------------------------------------------------- */

export namespace FigCaption {
  export type Props = PropsWithChildren<{}>;
}

export const FigCaption = (props: FigCaption.Props) => {
  return <figcaption class={style.figcaption}>
    {props.children}
  </figcaption>
}

/* -------------------------------------------------------------------------- */

export namespace Figure {
  export type Props = PropsWithChildren<{
    
  }>;
}

export const Figure = (props: Figure.Props) => {
  return <figure class={style.figure}>
    {props.children}
  </figure>
}



/* -------------------------------------------------------------------------- */

export namespace SubFigure {
  export type Props = PropsWithChildren<{}>;
}

export const SubFigure = (props: SubFigure.Props) => {
  return <div class={style.subfigure}>
    {props.children}
  </div>
}