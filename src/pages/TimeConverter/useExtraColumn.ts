import { createSignal } from "solid-js";

type HookOutput = {
  canShowExtraColumn: () => boolean;
};

export default function useExtraColumn(): HookOutput {
  const [windowWidth, setWindowWith] = createSignal<number>(window.innerWidth);
  window.addEventListener("resize", () => {
    setWindowWith(window.innerWidth);
  });

  function canShowExtraColumn(): boolean {
    return windowWidth() >= 1000;
  }

  return {
    canShowExtraColumn,
  };
}
