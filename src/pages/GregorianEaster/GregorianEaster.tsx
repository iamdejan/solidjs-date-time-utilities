import { Typography } from "@suid/material";
import { JSX, For } from "solid-js";
import Tabs from "./Tabs";
import getDisplayedYears from "./getDisplayedYears";
import InformationTable from "./InformationTable";

export default function GregorianEaster(): JSX.Element {
  const years = getDisplayedYears();

  return (
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Gregorian Easter
      </Typography>

      <Tabs years={years} />

      <For each={years}>{(year) => <InformationTable year={year} />}</For>
    </>
  );
}
