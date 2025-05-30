import { TZDate, TZDateMini } from "@date-fns/tz";
import {
  format,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  getTime,
  getUnixTime,
} from "date-fns";
import { Accessor, createSignal, onCleanup, Setter } from "solid-js";
import sortedCityList from "../../../components/CitySelect/cityList";

type DateTimeDisplay = {
  format: string;
  function: () => string;
};

function convertToTZDate(date: Date, timeZone?: string): TZDate {
  if (timeZone === "") {
    timeZone = undefined;
  }
  const tzDate = new TZDate(date, timeZone);
  return tzDate;
}

function getDateString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

function formatDateToUnixSeconds(date: TZDate): string {
  return getUnixTime(date).toString();
}

function formatDateToUnixMilliseconds(date: TZDate): string {
  const ms = getTime(date);
  return String(ms);
}

const SECONDS_IN_DAY = 24 * 60 * 60;
const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000;
const MAGIC_NUMBER_OF_DAYS = 25567 + 2;

function toExcelDate(date: TZDate): string {
  const result = date.getTime() / MISSING_LEAP_YEAR_DAY + MAGIC_NUMBER_OF_DAYS;
  return result.toFixed(6);
}

type HookOutput = {
  selectedCityKey: Accessor<string>;
  setSelectedCityKey: Setter<string>;
  displays: DateTimeDisplay[];
};

export function useDisplayTimeFormats(): HookOutput {
  const [now, setNow] = createSignal<TZDate>(new TZDateMini());

  const [selectedCityKey, setSelectedCityKey] = createSignal<string>("");
  function cityKeyToTimeZone(): string | undefined {
    return sortedCityList.find((city) => city.key === selectedCityKey())
      ?.timeZone;
  }
  const timer = setInterval(
    () => setNow(convertToTZDate(new TZDateMini(), cityKeyToTimeZone())),
    1,
  );
  onCleanup(() => clearInterval(timer));

  const displays: DateTimeDisplay[] = [
    {
      format: "Date",
      function: () => getDateString(now()),
    },
    {
      format: "Locale",
      function: () => now().toString(),
    },
    {
      format: "UTC Format",
      function: () => now().toUTCString(),
    },
    {
      format: "RFC 7231",
      function: () => formatRFC7231(now()),
    },
    {
      format: "RFC 3339",
      function: () => formatRFC3339(now()),
    },
    {
      format: "RFC 3339 with Milliseconds",
      function: () =>
        formatRFC3339(now(), {
          fractionDigits: 3,
        }),
    },
    {
      format: "ISO 9075",
      function: () => formatISO9075(now()),
    },
    {
      format: "Unix Timestamp (seconds)",
      function: () => formatDateToUnixSeconds(now()),
    },
    {
      format: "Timestamp (milliseconds)",
      function: () => formatDateToUnixMilliseconds(now()),
    },
    {
      format: "Excel Date (1900)",
      function: () => toExcelDate(now()),
    },
  ];

  return {
    selectedCityKey,
    setSelectedCityKey,
    displays,
  };
}
