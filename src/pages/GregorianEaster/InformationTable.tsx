import { For, JSX, Show } from "solid-js";
import {
  getAscensionDate,
  getAshWednesdayDate,
  getEasterDate,
  getGoodFridayDate,
  getHolySaturdayDate,
  getMaundyThursdayDate,
  getPalmSundayDate,
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
  date: () => TZDate;
  needExtraNotice: boolean;
};

type Props = {
  year: number;
};

export default function InformationTable(props: Props): JSX.Element {
  const chosenYear = useChosenYear((state) => state.chosenYear);

  const events: Event[] = [
    {
      name: "Ash Wednesday",
      date: () => getAshWednesdayDate(props.year),
      needExtraNotice: false,
    },
    {
      name: "Palm Sunday",
      date: () => getPalmSundayDate(props.year),
      needExtraNotice: false,
    },
    {
      name: "Maundy Thursday",
      date: () => getMaundyThursdayDate(props.year),
      needExtraNotice: true,
    },
    {
      name: "Good Friday",
      date: () => getGoodFridayDate(props.year),
      needExtraNotice: true,
    },
    {
      name: "Holy Saturday",
      date: () => getHolySaturdayDate(props.year),
      needExtraNotice: true,
    },
    {
      name: "Easter Sunday",
      date: () => getEasterDate(props.year),
      needExtraNotice: true,
    },
    {
      name: "Jesus' Ascension",
      date: () => getAscensionDate(props.year),
      needExtraNotice: false,
    },
    {
      name: "Pentecost",
      date: () => getPentecostDate(props.year),
      needExtraNotice: false,
    },
  ];

  return (
    <Show when={chosenYear() === props.year}>
      <Box
        sx={{
          padding: "1rem",
        }}
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
                      {formatForDisplay(event.date())}
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Show>
  );
}
