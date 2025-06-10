import { createSignal } from "solid-js";

type HookOutput = {
  canShowExtraColumn: () => boolean;
};

export default function useExtraColumn(): HookOutput {
  const [windowWidth, setWindowWith] = createSignal<number>(window.innerWidth);

  function setWindowWithByValue() {
    setWindowWith(window.innerWidth);
  }

  window.addEventListener("resize", setWindowWithByValue);
  window.onbeforeunload = () => {
    window.removeEventListener("resize", setWindowWithByValue);
  };

  function canShowExtraColumn(): boolean {
    return windowWidth() >= 1000;
  }

  return {
    canShowExtraColumn,
  };
}
