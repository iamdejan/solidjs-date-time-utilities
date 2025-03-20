import { createWithSignal } from "solid-zustand";

export type ThemeOption = "light" | "dark";

type ThemeState = {
  mode: ThemeOption;
  switch: () => void;
};

export function nextTheme(mode: ThemeOption): ThemeOption {
  return mode === "light" ? "dark" : "light";
}

const useThemeModeSignal = createWithSignal<ThemeState>((set) => ({
  mode: "dark",
  switch: () => set((state) => ({ mode: nextTheme(state.mode) })),
}));

export default useThemeModeSignal;
