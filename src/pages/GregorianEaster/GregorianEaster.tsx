import { Box, Button, Typography } from "@suid/material";
import { JSX, For, createEffect } from "solid-js";
import Tabs from "./Tabs";
import getDisplayedYears from "./getDisplayedYears";
import InformationTable from "./InformationTable";
import { getRouteApi, useNavigate } from "@tanstack/solid-router";
import useChosenYear from "./hooks/useChosenYear";
import { useClipboard } from "solidjs-use";

export default function GregorianEaster(): JSX.Element {
  const routeSearch = getRouteApi("/gregorian-easter").useSearch();
  const { copy } = useClipboard();

  const years = getDisplayedYears();
  const chosenYear = useChosenYear((state) => state.chosenYear);
  const setYear = useChosenYear((state) => state.setChosenYear);
  const clearYear = useChosenYear((state) => state.clearYear);

  const navigate = useNavigate();
  createEffect(() => {
    const foundYear = years.find((y) => y === routeSearch().year);
    if (!foundYear) {
      clearYear();
      navigate({ to: "/gregorian-easter" });
      return;
    }

    setYear(foundYear);
  });

  function copyYear(): void {
    const link =
      window.location.origin +
      "/gregorian-easter?" +
      new URLSearchParams({
        year: chosenYear().toString(),
      });
    copy(link);
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

      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <For each={years}>{(year) => <InformationTable year={year} />}</For>
        <Button
          type="button"
          sx={{
            marginTop: "2rem",
          }}
          onClick={copyYear}
        >
          Copy Year
        </Button>
      </Box>
    </>
  );
}
