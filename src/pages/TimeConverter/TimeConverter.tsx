import { For, JSX, Show } from "solid-js";
import "@material/web/slider/slider.js";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@suid/material";
import { TZDate } from "@date-fns/tz";
import AddIcon from "@suid/icons-material/Add";
import sortedCityList from "./cityList";
import useDateTimeRange, { max, min } from "./useDateTimeRange";
import useExtraColumn from "./useExtraColumn";
import useCityDropDown from "./useCityDropDown";

const style = {
  display: "flex",
  flexGrow: "1",
} as CSSStyleDeclaration;

function convertToTimeZone(date: Date, timeZone: string): TZDate {
  return new TZDate(date, timeZone);
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
        <Typography component="div">Select city: </Typography>
        <FormControl
          sx={{
            minWidth: "clamp(50px, 200px, 250px)",
          }}
        >
          <InputLabel id="select-city">City</InputLabel>
          <Select
            labelId="select-city"
            id="select-city"
            value={selectedTZDropDown()}
            onChange={handleTimeZoneSelectChange}
          >
            <For each={sortedCityList()}>
              {(city) => (
                <MenuItem value={city.key}>
                  {city.name}, {city.country}
                </MenuItem>
              )}
            </For>
          </Select>
        </FormControl>
        <Fab onClick={addChosenTimeZone}>
          <AddIcon />
        </Fab>
      </Box>

      <Box
        sx={{
          marginTop: "2rem",
          marginX: "2rem",
          justifyContent: "center",
          width: "clamp(50vw, 90vw, 90vw)",
        }}
      >
        <md-slider
          range={true}
          min={min}
          max={max}
          labeled={true}
          ticks={true}
          valueLabelStart={startValueLabel()}
          ariaLabelStart={startValueLabel()}
          valueLabelEnd={endValueLabel()}
          ariaLabelEnd={endValueLabel()}
          valueStart={startValue()}
          valueEnd={endValue()}
          style={style}
          onChange={handleSliderChange}
          onMouseMove={handleSliderChange}
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
                  {convertToTimeZone(start(), timeZoneData.timeZone).toString()}
                </TableCell>
                <TableCell>
                  {convertToTimeZone(end(), timeZoneData.timeZone).toString()}
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </>
  );
}
