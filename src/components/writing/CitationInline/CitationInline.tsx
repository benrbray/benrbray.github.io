import type { ParentProps } from "solid-js"

export namespace CitationInline {
    export type Props = ParentProps<{
        
    }>
}

export const CitationInline = (props: CitationInline.Props) => {
    return <span>
        {props.children}
    </span>
}