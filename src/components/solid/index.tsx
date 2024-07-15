import type { JSX } from "solid-js";

export type PropsWithChildren<P> = P & { children?: JSX.Element };