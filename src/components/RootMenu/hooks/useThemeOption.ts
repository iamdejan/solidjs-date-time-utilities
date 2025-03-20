import { createPalette, createTheme } from "@suid/material";
import { Accessor } from "solid-js";
import useThemeModeSignal, {
  ThemeOption,
} from "../../../hooks/useThemeModeSignal";

type HookOutput = {
  mode: Accessor<ThemeOption>;

  theme: Accessor<ReturnType<typeof createTheme>>;
  nextTheme: Accessor<ThemeOption>;
};

export function useThemeOption(): HookOutput {
  const mode = useThemeModeSignal((state) => state.mode);
  const palette = () => {
    return createPalette({
      mode: mode(),
    });
  };
  const theme = () =>
    createTheme({
      palette: palette,
    });
  function nextTheme(): ThemeOption {
    return mode() === "light" ? "dark" : "light";
  }

  return {
    mode,
    theme,
    nextTheme,
  };
}
