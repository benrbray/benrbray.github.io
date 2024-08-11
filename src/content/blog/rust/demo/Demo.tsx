import { initGame } from "physics";
import { onMount } from "solid-js";

import "./Demo.css";

export const Demo = () => {
  let demoElt!: HTMLCanvasElement;

  onMount(() => {
    initGame(demoElt);
  });

  return (<div class="demo">
    <canvas tabIndex={1} ref={demoElt} />
  </div>);
}