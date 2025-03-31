import { JSX } from "solid-js";
import { getEasterDate } from "./getEasterDates";
import useChosenYear from "./hooks/useChosenYear";
import { Box } from "@suid/material";
import { format } from "date-fns";

type Props = {
  year: number;
};

export default function InformationTable(props: Props): JSX.Element {
  const chosenYear = useChosenYear((state) => state.chosenYear);

  function chooseDisplay(yearInButton: number): "block" | "none" {
    if (chosenYear() === yearInButton) {
      return "block";
    }

    return "none";
  }

  return (
    <Box displayRaw={chooseDisplay(props.year)}>
      Easter in {props.year} will fall on{" "}
      {format(getEasterDate(props.year), "iii, MMM d yyyy")}
    </Box>
  );
}
