import type { ParentProps } from "solid-js"

namespace InlineType {
    export type Props = ParentProps<{

    }>;
}

export const InlineType = (props: InlineType.Props) => {
    return <span>{props.children}</span>
}