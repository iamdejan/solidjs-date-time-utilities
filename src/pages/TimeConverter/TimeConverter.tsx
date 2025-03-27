import { createSignal, For, JSX } from "solid-js";
import "@material/web/slider/slider.js";
import {
  Box,
  Fab,
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

const style = {
  display: "flex",
  flexGrow: "1",
  marginLeft: "1rem",
  marginRight: "1rem",
} as CSSStyleDeclaration;

type TimeZoneData = {
  key: string;
  ianaTimeZone: string;
  city: string;
  country: string;
};

const timeZoneList: TimeZoneData[] = [
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGJ",
    ianaTimeZone: "Asia/Jakarta",
    city: "Jakarta",
    country: "Indonesia",
  },
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGK",
    ianaTimeZone: "Asia/Makassar",
    city: "Makassar",
    country: "Indonesia",
  },
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGM",
    ianaTimeZone: "Asia/Jayapura",
    city: "Ternate",
    country: "Indonesia",
  },
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGN",
    ianaTimeZone: "Asia/Jayapura",
    city: "Jayapura",
    country: "Indonesia",
  },
];

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

  const [selectedTZDropDown, setSelectedTZDropDown] = createSignal<
    TimeZoneData | undefined
  >(undefined);
  const [chosenTimeZones, setChosenTimeZones] = createSignal<TimeZoneData[]>([
    {
      key: "00000000000000000000000000",
      ianaTimeZone: getLocalTimeZone(),
      city: "(User's Location)",
      country: "",
    },
  ]);

  function handleTimeZoneSelectChange(ev: SelectChangeEvent) {
    const key = ev.target.value;
    const foundTimeZone = timeZoneList.find((tz) => {
      return tz.key === key;
    });
    if (foundTimeZone) {
      setSelectedTZDropDown(foundTimeZone);
    }
  }

  function addChosenTimeZone() {
    const selected = selectedTZDropDown();
    if (selected) {
      const chosenList = chosenTimeZones();
      chosenList.push(selected);
      setChosenTimeZones(chosenList);

      setSelectedTZDropDown(undefined);
    }
  }

  function handleSliderChange(ev: Event) {
    const target = ev.target as MdSlider;
    if (target.valueStart) {
      setStartValue(target.valueStart);
    }
    if (target.valueEnd) {
      setEndValue(target.valueEnd);
    }

    target.valueLabelStart = startValueLabel();
    target.valueLabelEnd = endValueLabel();
  }

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Time Converter
      </Typography>

      <Typography>Select time zone</Typography>
      <Select onChange={handleTimeZoneSelectChange}>
        <For each={timeZoneList}>
          {(timeZone) => (
            <MenuItem
              value={timeZone.key}
              selected={timeZone.ianaTimeZone === getLocalTimeZone()}
            >
              {timeZone.city}, {timeZone.country}
            </MenuItem>
          )}
        </For>
      </Select>
      <Fab onClick={addChosenTimeZone}>
        <AddIcon />
      </Fab>

      <Box
        sx={{
          marginTop: "2rem",
          justifyContent: "center",
          width: "clamp(50vw, 100vw, 100vw)",
        }}
      >
        <md-slider
          range={true}
          min={0}
          max={96}
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
          onPointerMove={handleSliderChange}
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
                <TableCell>{timeZoneData.city}</TableCell>
                <TableCell>{timeZoneData.ianaTimeZone}</TableCell>
                <TableCell>
                  {convertToTimeZone(
                    start(),
                    timeZoneData.ianaTimeZone,
                  ).toString()}
                </TableCell>
                <TableCell>
                  {convertToTimeZone(
                    end(),
                    timeZoneData.ianaTimeZone,
                  ).toString()}
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </>
  );
}
