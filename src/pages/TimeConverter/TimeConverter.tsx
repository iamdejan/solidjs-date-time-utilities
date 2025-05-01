import { createSignal, For, JSX, Show } from "solid-js";
import "@material/web/slider/slider.js";
import {
  Box,
  Fab,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@suid/material";
import { TZDate } from "@date-fns/tz";
import AddIcon from "@suid/icons-material/Add";
import useDateTimeRange, { max, min } from "./hooks/useDateTimeRange";
import useExtraColumn from "./hooks/useExtraColumn";
import DeleteIcon from "@suid/icons-material/Delete";
import { format } from "date-fns";
import useChosenTimeZones from "./hooks/useChosenTimeZones";
import CitySelect from "../../components/CitySelect";

const style = {
  display: "flex",
  flexGrow: "1",
} as CSSStyleDeclaration;

function formatForDisplay(date: Date, timeZone: string): string {
  const tzDate = new TZDate(date, timeZone);
  return format(tzDate, "iii, MMM d HH:mm");
}

export default function TimeConverter(): JSX.Element {
  const { canShowExtraColumn } = useExtraColumn();

  const [selectedCityKey, setSelectedCityKey] = createSignal<string>("");
  const {
    chosenTimeZones,
    addChosenTimeZone,
    removeChosenTimeZone,
    referenceTimeZone,
  } = useChosenTimeZones();
  const dateTimeRange = () => useDateTimeRange(referenceTimeZone);

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Time Converter
      </Typography>

      <Box
        sx={{
          display: "flex",
          minWidth: "clamp(50%, 90%, 90%)",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "2rem",
          marginX: "1rem",
        }}
      >
        <Typography component="div">Input city/country:</Typography>
        <CitySelect
          selectedCityKey={selectedCityKey}
          setSelectedCityKey={setSelectedCityKey}
        />
        <Fab
          onClick={() => {
            addChosenTimeZone(selectedCityKey());
            setSelectedCityKey("");
          }}
          disabled={selectedCityKey() === ""}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Box
        sx={{
          marginTop: "2rem",
          marginX: "2rem",
          justifyContent: "center",
        }}
      >
        <Typography displayRaw="flex" justifyContent="center" marginY="0.5rem">
          Slider Time Zone: {referenceTimeZone()}
        </Typography>
        <Grid
          container
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Grid item>00:00</Grid>
          <Grid item>06:00</Grid>
          <Grid item>12:00</Grid>
          <Grid item>18:00</Grid>
          <Grid item>24:00</Grid>
        </Grid>
        <md-slider
          range={true}
          min={min}
          max={max}
          labeled={true}
          ticks={true}
          value-label-start={dateTimeRange().startValueLabel()}
          aria-label-start={dateTimeRange().startValueLabel()}
          value-label-end={dateTimeRange().endValueLabel()}
          aria-label-end={dateTimeRange().endValueLabel()}
          value-start={dateTimeRange().startValue()}
          value-end={dateTimeRange().endValue()}
          style={style}
          onChange={dateTimeRange().handleSliderChange}
          onPointerMove={dateTimeRange().handleSliderChange}
        />
      </Box>

      <Table
        component={Paper}
        sx={{
          marginTop: "2rem",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <Show when={canShowExtraColumn()}>
              <TableCell>IANA Time Zone</TableCell>
            </Show>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={chosenTimeZones()}>
            {(timeZoneData) => (
              <TableRow>
                <TableCell>{timeZoneData.name}</TableCell>
                <Show when={canShowExtraColumn()}>
                  <TableCell>{timeZoneData.timeZone}</TableCell>
                </Show>
                <TableCell>
                  {formatForDisplay(
                    dateTimeRange().start(),
                    timeZoneData.timeZone,
                  )}
                </TableCell>
                <TableCell>
                  {formatForDisplay(
                    dateTimeRange().end(),
                    timeZoneData.timeZone,
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => removeChosenTimeZone(timeZoneData.key)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </>
  );
}
