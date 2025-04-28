import { Button, Grid } from "@suid/material";
import { For, JSX } from "solid-js";
import useChosenYear from "./hooks/useChosenYear";

type Props = {
  years: number[];
};

export default function Tabs(props: Props): JSX.Element {
  const chosenYear = useChosenYear((state) => state.chosenYear);
  const setChosenYear = useChosenYear((state) => state.setChosenYear);

  function pickVariant(yearInButton: number): "text" | "contained" {
    if (chosenYear() === yearInButton) {
      return "contained";
    }

    return "text";
  }

  function handleClickTab(clickedYear: number): void {
    setChosenYear(clickedYear);
    history.pushState(
      {},
      "",
      "/gregorian-easter?" +
        new URLSearchParams({ year: clickedYear.toString() }),
    );
  }

  return (
    <Grid
      container
      sx={{
        display: "grid",
        borderBottom: 2,
        borderColor: "primary.main",
      }}
      gridTemplateColumns={"repeat(" + props.years.length + ", 1fr)"}
    >
      <For each={props.years}>
        {(displayedYear) => (
          <Grid
            item
            sx={{
              display: "grid",
            }}
          >
            <Button
              type="button"
              disableElevation
              sx={{
                borderRadius: 0,
              }}
              variant={pickVariant(displayedYear)}
              onClick={() => handleClickTab(displayedYear)}
            >
              {displayedYear}
            </Button>
          </Grid>
        )}
      </For>
    </Grid>
  );
}
