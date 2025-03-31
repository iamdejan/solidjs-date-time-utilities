import { Box, Typography } from "@suid/material";
import { JSX, For } from "solid-js";
import Tabs from "./Tabs";
import useChosenYear from "./hooks/useChosenYear";

export default function GregorianEaster(): JSX.Element {
  const years = [2024, 2025, 2026, 2027, 2028];

  const chosenYear = useChosenYear((state) => state.chosenYear);

  function chooseDisplay(yearInButton: number): "block" | "none" {
    if (chosenYear() === yearInButton) {
      return "block";
    }

    return "none";
  }

  return (
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Gregorian Easter
      </Typography>

      <Tabs years={years} />

      <For each={years}>
        {(year) => <Box displayRaw={chooseDisplay(year)}>Easter in {year}</Box>}
      </For>
    </>
  );
}
