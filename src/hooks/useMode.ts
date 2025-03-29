import { createWithSignal } from "solid-zustand";

export type Mode = "light" | "dark";

type ModeState = {
  mode: Mode;
  switch: () => void;
};

function nextMode(mode: Mode): Mode {
  return mode === "light" ? "dark" : "light";
}

const localStorageKey = "mui-mode";

const useMode = createWithSignal<ModeState>((set) => ({
  mode: (localStorage.getItem(localStorageKey) as Mode) || "dark",
  switch: () =>
    set((state) => {
      const next = nextMode(state.mode);
      localStorage.setItem(localStorageKey, next);
      return { mode: next };
    }),
}));

export default useMode;
