import { For, JSX } from "solid-js";
import {
  getAscensionDate,
  getAshWednesdayDate,
  getEasterDate,
  getGoodFridayDate,
  getHolySaturdayDate,
  getMaundyThursdayDate,
  getPentecostDate,
} from "./getEasterDates";
import useChosenYear from "./hooks/useChosenYear";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@suid/material";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

function formatForDisplay(date: TZDate): string {
  return format(date, "PPPP");
}

type Event = {
  name: string;
  date: TZDate;
};

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

  const events: Event[] = [
    {
      name: "Ash Wednesday",
      date: getAshWednesdayDate(props.year),
    },
    {
      name: "Palm Sunday",
      date: getMaundyThursdayDate(props.year),
    },
    {
      name: "Maundy Thursday",
      date: getMaundyThursdayDate(props.year),
    },
    {
      name: "Good Friday",
      date: getGoodFridayDate(props.year),
    },
    {
      name: "Holy Saturday",
      date: getHolySaturdayDate(props.year),
    },
    {
      name: "Easter Sunday",
      date: getEasterDate(props.year),
    },
    {
      name: "Jesus' Ascension",
      date: getAscensionDate(props.year),
    },
    {
      name: "Pentecost",
      date: getPentecostDate(props.year),
    },
  ];

  return (
    <Box
      sx={{
        margin: "1rem",
      }}
      displayRaw={chooseDisplay(props.year)}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={events}>
              {(event) => (
                <TableRow>
                  <TableCell>{event.name}</TableCell>
                  <TableCell
                    sx={{
                      width: "70%",
                    }}
                  >
                    {formatForDisplay(event.date)}
                  </TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
