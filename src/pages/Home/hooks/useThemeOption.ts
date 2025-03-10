import { createPalette, createTheme } from "@suid/material";
import { Accessor, createSignal, Setter } from "solid-js";

export type ThemeOption = "light" | "dark";

type HookOutput = {
  mode: Accessor<ThemeOption>;
  setMode: Setter<ThemeOption>;

  theme: Accessor<ReturnType<typeof createTheme>>;
  nextTheme: Accessor<ThemeOption>;
};

export function useThemeOption(): HookOutput {
  const [mode, setMode] = createSignal<ThemeOption>("dark");
  const palette = () => {
    return createPalette({
      mode: mode(),
    });
  };
  const theme = () => createTheme({
    palette: palette,
  });
  function nextTheme(): ThemeOption {
    return mode() === "light" ? "dark" : "light";
  }

  return {
    mode,
    setMode,
    theme,
    nextTheme,
  }
}
