import { foo, initGame } from "physics";
import { onMount } from "solid-js";

export const Demo = () => {
  let demoElt!: HTMLCanvasElement;

  onMount(() => {
    // initGame(demoElt);
    initGame();
  });

  return <canvas ref={demoElt} />
}

export const Hello = () => {
  return <button onClick={() => console.log(foo)}>Hello, client!</button>;
}