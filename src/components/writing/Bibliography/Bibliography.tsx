import type { ParentProps } from "solid-js"

export namespace Bibliography {
    export type Props = ParentProps<{
        
    }>
}

export const Bibliography = (props: Bibliography.Props) => {
    return <span>
        {props.children}
    </span>
}