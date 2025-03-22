import { Switch, useTheme } from "@suid/material";
import { JSX } from "solid-js";
import useMode from "../../hooks/useMode";

export default function ThemeSwitch(): JSX.Element {
  const theme = useTheme();
  const switchMode = useMode((state) => state.switch);

  return (
    <>
      <Switch onChange={switchMode} checked={theme.palette.mode === "light"} />
      {theme.palette.mode === "light" ? "Light" : "Dark"}
    </>
  );
}
