import { createWithSignal } from "solid-zustand";

export type Mode = "light" | "dark";

type ModeState = {
  mode: Mode;
  switch: () => void;
};

function nextMode(mode: Mode): Mode {
  return mode === "light" ? "dark" : "light";
}

const useMode = createWithSignal<ModeState>((set) => ({
  mode: (localStorage.getItem("mode") as Mode) || "dark",
  switch: () =>
    set((state) => {
      const next = nextMode(state.mode);
      localStorage.setItem("mode", next);
      return { mode: next };
    }),
}));

export default useMode;
