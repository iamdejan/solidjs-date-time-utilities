import { createPalette, createTheme } from "@suid/material";
import { Accessor } from "solid-js";
import useThemeModeSignal from "../../../hooks/useThemeModeSignal";

type HookOutput = {
  theme: Accessor<ReturnType<typeof createTheme>>;
};

export function useThemeWithMode(): HookOutput {
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

  return {
    theme,
  };
}
