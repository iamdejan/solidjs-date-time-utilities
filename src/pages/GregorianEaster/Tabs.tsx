import { Button, Grid } from "@suid/material";
import { For, JSX } from "solid-js";
import useChosenYear from "./hooks/useChosenYear";

type Props = {
  years: number[];
};

export default function Tabs(props: Props): JSX.Element {
  const year = useChosenYear((state) => state.chosenYear);
  const setYear = useChosenYear((state) => state.setChosenYear);

  function chooseVariant(yearInButton: number): "text" | "contained" {
    if (year() === yearInButton) {
      return "contained";
    }

    return "text";
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
        {(year) => (
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
              variant={chooseVariant(year)}
              onClick={() => setYear(year)}
            >
              {year}
            </Button>
          </Grid>
        )}
      </For>
    </Grid>
  );
}
