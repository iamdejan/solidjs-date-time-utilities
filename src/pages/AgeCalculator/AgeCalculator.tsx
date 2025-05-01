import { Button, Container, Grid, TextField, Typography } from "@suid/material";
import { createEffect, createSignal, JSX } from "solid-js";
import {
  addMonths,
  differenceInDays,
  Duration,
  format,
  lastDayOfMonth,
  max,
  min,
} from "date-fns";
import { getRouteApi } from "@tanstack/solid-router";
import { useClipboard } from "solidjs-use";

function getDateString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

function getProlepticMonth(date: Date): number {
  return date.getUTCFullYear() * 12 + date.getUTCMonth() - 1;
}

function getLastDateOfMonth(date: Date): number {
  return lastDayOfMonth(date).getUTCDate();
}

export default function AgeCalculator(): JSX.Element {
  const routeSearch = getRouteApi("/age-calculator").useSearch();
  const { copy } = useClipboard();

  const [years, setYears] = createSignal<number>(0);
  const [months, setMonths] = createSignal<number>(0);
  const [days, setDays] = createSignal<number>(0);

  const [startDate, setStartDate] = createSignal<string>(
    routeSearch().start ?? getDateString(new Date(0)),
  );
  const [endDate, setEndDate] = createSignal<string>(
    routeSearch().end ?? getDateString(new Date(0)),
  );

  /**
   * Calculate age. This logic is taken from Period.between method in Java.
   */
  function calculate() {
    const s = min([startDate(), endDate()]);
    const e = max([startDate(), endDate()]);
    setStartDate(getDateString(s));
    setEndDate(getDateString(e));

    let months = getProlepticMonth(e) - getProlepticMonth(s);
    let days = e.getUTCDate() - s.getUTCDate();
    if (months > 0 && days < 0) {
      months -= 1;
      const calcDate = addMonths(s, months);
      days =
        differenceInDays(e, new Date(0)) -
        differenceInDays(calcDate, new Date(0));
    }
    if (months < 0 && days > 0) {
      months++;
      days -= getLastDateOfMonth(e);
    }

    const years = Math.floor(months / 12);
    months %= 12;
    const result: Duration = {
      years: years,
      months: months,
      days: days,
    };
    setYears(result.years ?? 0);
    setMonths(result.months ?? 0);
    setDays(result.days ?? 0);
  }

  createEffect(() => {
    if (routeSearch().calculate) {
      calculate();
    }
  });

  function generateLink(): string {
    const link =
      window.location.origin +
      "/age-calculator?" +
      new URLSearchParams({
        start: startDate(),
        end: endDate(),
        calculate: "true",
      });
    return link;
  }

  function generateAndCopyURL() {
    const link = generateLink();
    copy(link);
  }

  function calculateAndUpdateURL() {
    calculate();

    const link = generateLink();
    history.pushState({}, "", link);
  }

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", marginBottom: 2 }}>
        Age Calculator
      </Typography>

      <Container
        sx={{
          minWidth: "100%",
          zIndex: 0,
        }}
      >
        <Grid
          container
          spacing={10}
          justifyContent="center"
          marginBottom={5}
          zIndex={1}
        >
          <Grid item>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 1,
              }}
            >
              Start Date
            </Typography>
            <input
              type="date"
              style={{
                font: "inherit",
                padding: "16.5px 14px",
              }}
              value={startDate()}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item justifyItems="center">
            <Typography
              variant="h5"
              sx={{
                marginBottom: 1,
              }}
            >
              End Date
            </Typography>
            <input
              type="date"
              style={{
                font: "inherit",
                padding: "16.5px 14px",
              }}
              value={endDate()}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <br />
            <Button
              type="button"
              variant="text"
              color="secondary"
              onClick={() => setEndDate(getDateString(new Date()))}
            >
              Today
            </Button>
          </Grid>
        </Grid>

        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <Button
            type="button"
            variant="contained"
            onClick={calculateAndUpdateURL}
          >
            Calculate
          </Button>
          <Button
            type="button"
            variant="contained"
            color="success"
            onClick={generateAndCopyURL}
          >
            Save URL
          </Button>
        </Container>

        <Container
          sx={{
            maxWidth: "clamp(20vw, 50vw, 50vw)",
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <TextField disabled fullWidth value={years() + " years"} />
        </Container>
        <Container
          sx={{
            maxWidth: "clamp(20vw, 50vw, 50vw)",
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <TextField disabled fullWidth value={months() + " months"} />
        </Container>
        <Container
          sx={{
            maxWidth: "clamp(20vw, 50vw, 50vw)",
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <TextField disabled fullWidth value={days() + " days"} />
        </Container>
      </Container>
    </>
  );
}
