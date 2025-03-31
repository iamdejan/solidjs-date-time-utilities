import { Box, Button, Grid, Typography } from "@suid/material";
import { createSignal, JSX } from "solid-js";

export default function GregorianEaster(): JSX.Element {
  const [year, setYear] = createSignal<number>(0);

  function chooseVariant(
    yearInButton: number,
  ): "text" | "outlined" | "contained" {
    if (year() === yearInButton) {
      return "contained";
    }

    return "text";
  }

  function chooseDisplay(yearInButton: number): "block" | "none" {
    if (year() === yearInButton) {
      return "block";
    }

    return "none";
  }

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Gregorian Easter
      </Typography>

      <Grid
        container
        sx={{
          display: "grid",
          borderBottom: 1,
          borderColor: "palette.primary.light",
        }}
        gridTemplateColumns="repeat(3, 1fr)"
      >
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
      </Grid>

      <Box displayRaw={chooseDisplay(2024)}>Easter in 2024</Box>
      <Box displayRaw={chooseDisplay(2025)}>Easter in 2025</Box>
      <Box displayRaw={chooseDisplay(2026)}>Easter in 2026</Box>
    </>
  );
}
