import { createWithSignal } from "solid-zustand";

export type Mode = "light" | "dark";

type ModeState = {
  mode: Mode;
  switch: () => void;
};

export function nextMode(mode: Mode): Mode {
  return mode === "light" ? "dark" : "light";
}

const useMode = createWithSignal<ModeState>((set) => ({
  mode: "dark",
  switch: () => set((state) => ({ mode: nextMode(state.mode) })),
}));

export default useMode;
