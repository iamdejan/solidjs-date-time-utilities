import { Button, Container, Grid, TextField, Typography } from "@suid/material";
import { createSignal, JSX } from "solid-js";
import { format, intervalToDuration, max, min } from "date-fns";

function getDateString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export default function AgeCalculator(): JSX.Element {
  const [years, setYears] = createSignal<number>(0);
  const [months, setMonths] = createSignal<number>(0);
  const [days, setDays] = createSignal<number>(0);

  const [startDate, setStartDate] = createSignal<string>(
    getDateString(new Date(0)),
  );
  const [endDate, setEndDate] = createSignal<string>(
    getDateString(new Date(0)),
  );

  function calculate() {
    const s = min([startDate(), endDate()]);
    const e = max([startDate(), endDate()]);
    setStartDate(getDateString(s));
    setEndDate(getDateString(e));

    const result = intervalToDuration({
      start: startDate(),
      end: endDate(),
    });
    setYears(result.years ?? 0);
    setMonths(result.months ?? 0);
    setDays(result.days ?? 0);
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
          </Grid>
        </Grid>

        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="button" variant="contained" onClick={calculate}>
            Calculate
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
