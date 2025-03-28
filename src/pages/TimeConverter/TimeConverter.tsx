import { For, JSX, Show } from "solid-js";
import "@material/web/slider/slider.js";
import {
  Box,
  Fab,
  FormControl,
  Grid,
  IconButton,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@suid/material";
import { TZDate } from "@date-fns/tz";
import AddIcon from "@suid/icons-material/Add";
import useDateTimeRange, { max, min } from "./hooks/useDateTimeRange";
import useExtraColumn from "./hooks/useExtraColumn";
import useCityDropDown, { zeroULID } from "./hooks/useCityDropDown";
import DeleteIcon from "@suid/icons-material/Delete";
import { format } from "date-fns";

const style = {
  display: "flex",
  flexGrow: "1",
} as CSSStyleDeclaration;

function formatForDisplay(date: Date, timeZone: string): string {
  const tzDate = new TZDate(date, timeZone);
  return format(tzDate, "iii, MMM d HH:mm");
}

export default function TimeConverter(): JSX.Element {
  const {
    start,
    end,
    startValue,
    endValue,
    startValueLabel,
    endValueLabel,
    handleSliderChange,
  } = useDateTimeRange();

  const {
    selectedTZDropDown,
    handleTimeZoneSelectChange,
    chosenTimeZones,
    addChosenTimeZone,
    removeChosenTimeZone,
    searchText,
    setSearchText,
    displayedCityList,
  } = useCityDropDown();

  const { canShowExtraColumn } = useExtraColumn();

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Time Converter
      </Typography>

      <Box
        sx={{
          display: "flex",
          minWidth: "clamp(50vw, 90vw, 90vw)",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <Typography component="div">Search city:</Typography>
        <FormControl
          sx={{
            minWidth: "clamp(50px, 200px, 250px)",
          }}
        >
          <Select
            value={selectedTZDropDown()}
            MenuProps={{ autoFocus: false }}
            onChange={handleTimeZoneSelectChange}
          >
            {/* ref: https://stackoverflow.com/a/70918883 */}
            <ListSubheader>
              <TextField
                label="Keyword"
                value={searchText()}
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                    // Prevents autoselecting item while typing (default Select behaviour)
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
            <For each={displayedCityList()}>
              {(city) => (
                <MenuItem value={city.key}>
                  {city.name}, {city.country}
                </MenuItem>
              )}
            </For>
          </Select>
        </FormControl>
        <Fab onClick={addChosenTimeZone} disabled={selectedTZDropDown() === ""}>
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
          value-label-start={startValueLabel()}
          aria-label-start={startValueLabel()}
          value-label-end={endValueLabel()}
          aria-label-end={endValueLabel()}
          value-start={startValue()}
          value-end={endValue()}
          style={style}
          onChange={handleSliderChange}
          onPointerMove={handleSliderChange}
        />
      </Box>

      <Table component={Paper}>
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
                  {formatForDisplay(start(), timeZoneData.timeZone)}
                </TableCell>
                <TableCell>
                  {formatForDisplay(end(), timeZoneData.timeZone)}
                </TableCell>
                <TableCell>
                  <Show when={timeZoneData.key !== zeroULID}>
                    <IconButton
                      onClick={() => removeChosenTimeZone(timeZoneData.key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Show>
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </>
  );
}
