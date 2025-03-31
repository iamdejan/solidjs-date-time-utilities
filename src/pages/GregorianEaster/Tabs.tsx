import { Button, Grid } from "@suid/material";
import { For, JSX } from "solid-js";
import useChosenYear from "./hooks/useChosenYear";

type Props = {
  years: number[];
};

export default function Tabs(props: Props): JSX.Element {
  const year = useChosenYear((state) => state.chosenYear);
  const setYear = useChosenYear((state) => state.setChosenYear);

  function chooseVariant(
    yearInButton: number,
  ): "text" | "outlined" | "contained" {
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
        borderColor: "primary.light",
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
      {/* <Grid
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
          variant={chooseVariant(2024)}
          onClick={() => setYear(2024)}
        >
          2024
        </Button>
      </Grid>

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
          variant={chooseVariant(2025)}
          onClick={() => setYear(2025)}
        >
          2025
        </Button>
      </Grid>
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
          variant={chooseVariant(2026)}
          onClick={() => setYear(2026)}
        >
          2026
        </Button>
      </Grid>
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
          variant={chooseVariant(2027)}
          onClick={() => setYear(2027)}
        >
          2027
        </Button>
      </Grid> */}
    </Grid>
  );
}
