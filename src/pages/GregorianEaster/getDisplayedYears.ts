import { TZDate } from "@date-fns/tz";
import { getYear, isAfter } from "date-fns";
import { getPentecostDate } from "./getEasterDates";

export default function getDisplayedYears(): number[] {
  const now = new TZDate();

  let years = Array.from({ length: 2 }, (_, k) => getYear(now) + k);
  const pentecost = getPentecostDate(years[0]);
  if (isAfter(now, pentecost)) {
    years = [...years.slice(1)];
  } else {
    years.pop();
  }

  return years;
}
