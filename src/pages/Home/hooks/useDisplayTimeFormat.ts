import { TZDate, TZDateMini } from "@date-fns/tz";
import { formatISO9075, formatRFC3339, formatRFC7231, getTime, getUnixTime } from "date-fns";
import { createSignal } from "solid-js";

type HookOutput = {
  displays: DateTimeDisplay[];
};

type DateTimeDisplay = {
  format: string;
  function: () => string;
};

function formatDateToUnixSeconds(date: TZDate): string {
  return getUnixTime(date).toString();
}

function formatDateToUnixMilliseconds(date: TZDate): string {
  const ms = getTime(date);
  return String(ms);
}

const SECONDS_IN_DAY = 24 * 60 * 60;
const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000;
const MAGIC_NUMBER_OF_DAYS = (25567 + 2);

function toExcelDate(date: TZDate): string {
  const result = (date.getTime() / MISSING_LEAP_YEAR_DAY) + MAGIC_NUMBER_OF_DAYS;
  return result.toFixed(6);
}

export function useDisplayTimeFormats(): HookOutput {
  const [now, setNow] = createSignal<TZDate>(new TZDateMini());
  setInterval(() => setNow(new TZDateMini()), 1);

  const displays: DateTimeDisplay[] = [
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
      function: () => formatRFC3339(now(), {
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
    displays,
  };
}
