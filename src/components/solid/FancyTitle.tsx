export namespace FancyTitle {
  export type Props = {
    title : string
  }
}

export const FancyTitle = (props: FancyTitle.Props) => {
  return <h1>{props.title}</h1>
}