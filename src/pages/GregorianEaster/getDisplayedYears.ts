import { TZDate } from "@date-fns/tz";
import { getYear, isAfter } from "date-fns";
import { getPentecostDate } from "./getEasterDates";

const YEARS_AHEAD = 5;

export default function getDisplayedYears(): number[] {
  const now = new TZDate();

  let years = Array.from(
    { length: YEARS_AHEAD + 1 },
    (_, k) => getYear(now) + k,
  );
  const pentecost = getPentecostDate(years[0]);
  if (isAfter(now, pentecost)) {
    years = [...years.slice(1)];
  } else {
    years.pop();
  }

  return years;
}
