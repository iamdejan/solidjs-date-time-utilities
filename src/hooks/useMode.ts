import { createWithSignal } from "solid-zustand";

export type Mode = "light" | "dark";

type ModeState = {
  mode: Mode;
  switch: () => void;
};

function nextMode(mode: Mode): Mode {
  return mode === "light" ? "dark" : "light";
}

const defaultMode: Mode = window.matchMedia(`(prefers-color-scheme: dark)`)
  .matches
  ? "dark"
  : "light";
const localStorageKey = "mui-mode";

const useMode = createWithSignal<ModeState>((set) => ({
  mode: (localStorage.getItem(localStorageKey) as Mode) || defaultMode,
  switch: () =>
    set((state) => {
      const next = nextMode(state.mode);
      localStorage.setItem(localStorageKey, next);
      return { mode: next };
    }),
}));

window
  .matchMedia(`(prefers-color-scheme: ${defaultMode})`)
  .addEventListener("change", (ev: MediaQueryListEvent) => {
    const newColorScheme = ev.matches ? defaultMode : nextMode(defaultMode);
    const currentMode = useMode.getState().mode;
    if (currentMode !== newColorScheme) {
      localStorage.setItem(localStorageKey, newColorScheme);
      useMode.setState({ mode: newColorScheme });
    }
  });

export default useMode;
