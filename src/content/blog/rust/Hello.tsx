import { foo, initGame } from "game-of-life";
import { onMount } from "solid-js";

export const Demo = () => {
  let demoElt!: HTMLCanvasElement;

  onMount(() => {
    initGame(demoElt);
  });

  return <canvas ref={demoElt} />
}

export const Hello = () => {
  return <button onClick={() => console.log(foo)}>Hello, client!</button>;
}