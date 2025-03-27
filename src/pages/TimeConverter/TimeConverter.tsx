import { createSignal, For, JSX } from "solid-js";
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
import { MdSlider } from "@material/web/slider/slider.js";
import { addMinutes, format, startOfToday } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { SelectChangeEvent } from "@suid/material/Select";
import AddIcon from "@suid/icons-material/Add";
import cityList, { City } from "./cityList";

const min = 0;
const max = 96;

const style = {
  display: "flex",
  flexGrow: "1",
} as CSSStyleDeclaration;

function getLocalTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function convertToTimeZone(date: Date, timeZone: string): TZDate {
  return new TZDate(date, timeZone);
}

export default function TimeConverter(): JSX.Element {
  const [startValue, setStartValue] = createSignal<number>(32);
  const [endValue, setEndValue] = createSignal<number>(64);

  function start(): Date {
    return addMinutes(startOfToday(), startValue() * 15);
  }

  function startValueLabel(): string {
    return format(start(), "HH:mm");
  }

  function end(): Date {
    return addMinutes(startOfToday(), endValue() * 15);
  }

  function endValueLabel(): string {
    return format(end(), "HH:mm");
  }

  const [selectedTZDropDown, setSelectedTZDropDown] = createSignal<string>("");
  const [chosenTimeZones, setChosenTimeZones] = createSignal<City[]>([
    {
      key: "00000000000000000000000000",
      timeZone: getLocalTimeZone(),
      name: "(User's Location)",
      country: "",
    },
  ]);

  function handleTimeZoneSelectChange(ev: SelectChangeEvent) {
    const key = ev.target.value;
    setSelectedTZDropDown(key);
  }

  function addChosenTimeZone() {
    const selectedKey = selectedTZDropDown();
    if (selectedKey) {
      const found = cityList.find((city) => city.key === selectedKey);
      if (!found) {
        return;
      }

      setChosenTimeZones([...chosenTimeZones(), found]);
      setSelectedTZDropDown("");
    }
  }

  function handleSliderChange(ev: Event) {
    const target = ev.target as MdSlider;
    if (!target) {
      return;
    }

    if (target.valueStart === undefined) {
      target.valueStart = min;
    }
    setStartValue(target.valueStart);
    target.valueLabelStart = startValueLabel();

    if (target.valueEnd === undefined) {
      target.valueEnd = max;
    }
    setEndValue(target.valueEnd);
    target.valueLabelEnd = endValueLabel();
  }

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
            <For each={cityList}>
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
            <TableCell>IANA Time Zone</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={chosenTimeZones()}>
            {(timeZoneData) => (
              <TableRow>
                <TableCell>{timeZoneData.name}</TableCell>
                <TableCell>{timeZoneData.timeZone}</TableCell>
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
