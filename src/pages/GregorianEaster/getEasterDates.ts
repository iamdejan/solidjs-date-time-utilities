import { TZDate } from "@date-fns/tz";
import { addDays } from "date-fns";

enum Month {
  March = 2,
  April,
}

export function getEasterDate(year: number): TZDate {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const k = Math.floor(year / 100);

  const p = Math.floor((13 + 8 * k) / 25.0);
  const q = Math.floor(k / 4.0);
  const m = Math.floor(15 - p + k - q) % 30;
  const n = Math.floor(4 + k - q) % 7;

  const d = Math.floor(19 * a + m) % 30;
  const e = Math.floor(2 * b + 4 * c + 6 * d + n) % 7;

  if (d === 28 && e === 6 && Math.floor(11 * m + 11) % 30 < 19) {
    return new TZDate(year, Month.April, 18);
  }

  if (d === 29 && e === 6) {
    return new TZDate(year, Month.April, 19);
  }

  return addDays(new TZDate(year, Month.March, 22), d + e);
}

export function getAshWednesdayDate(year: number): TZDate {
  return addDays(getEasterDate(year), -46);
}

export function getPalmSundayDate(year: number): TZDate {
  return addDays(getEasterDate(year), -7);
}

export function getMaundyThursdayDate(year: number): TZDate {
  return addDays(getEasterDate(year), -3);
}

export function getGoodFridayDate(year: number): TZDate {
  return addDays(getEasterDate(year), -2);
}

export function getHolySaturdayDate(year: number): TZDate {
  return addDays(getEasterDate(year), -1);
}

export function getAscensionDate(year: number): TZDate {
  return addDays(getEasterDate(year), 39);
}

export function getPentecostDate(year: number): TZDate {
  return addDays(getEasterDate(year), 49);
}
