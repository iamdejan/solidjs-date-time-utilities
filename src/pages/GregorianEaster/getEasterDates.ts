import { TZDate } from "@date-fns/tz";
import { addDays } from "date-fns";

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

  if (d === 29 && e === 6 && a > 10) {
    return new TZDate(year, 4, 18);
  }

  if (d === 29 && e === 6) {
    return new TZDate(year, 4, 19);
  }

  const days = 22 + d + e;
  return new TZDate(year, 2, days);
}

export function getAshWednesdayDate(year: number): TZDate {
  return addDays(getEasterDate(year), -46);
}

export function getAscensionDate(year: number): TZDate {
  return addDays(getEasterDate(year), 40);
}

export function getPentecostDate(year: number): TZDate {
  return addDays(getEasterDate(year), 50);
}
