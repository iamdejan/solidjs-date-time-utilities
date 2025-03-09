import { TZDate, TZDateMini } from '@date-fns/tz';
import { createTheme, ThemeProvider, CssBaseline, Paper, Typography, Button, createPalette, Table, TableHead, TableBody, TableRow, TableCell, Grid } from '@suid/material';
import { formatISO9075, formatRFC3339, formatRFC7231, getUnixTime } from 'date-fns';
import { createSignal, For, JSX } from 'solid-js';
import CopyToClipboardButton from '../../components/CopyToClipboardButton';

type ThemeOption = "light" | "dark";

type DateTimeDisplay = {
  format: string;
  function: () => string;
};

function formatDateToUnixSeconds(date: TZDate): string {
  return getUnixTime(date).toString();
}

function formatDateToUnixMilliseconds(date: TZDate): string {
  const ms = date.getTime();
  return String(ms);
}

const SECONDS_IN_DAY = 24 * 60 * 60;
const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000;
const MAGIC_NUMBER_OF_DAYS = (25567 + 2);

function toExcelDate(date: TZDate): string {
  const result = (date.getTime() / MISSING_LEAP_YEAR_DAY) + MAGIC_NUMBER_OF_DAYS;
  return result.toFixed(6);
}

export default function Home(): JSX.Element {
  const [mode, setMode] = createSignal<ThemeOption>("dark");
  const palette = () => {
    return createPalette({
      mode: mode(),
    });
  };
  const theme = () => createTheme({
    palette: palette,
  });
  function nextTheme(): ThemeOption {
    return mode() === "light" ? "dark" : "light";
  }

  const [now, setNow] = createSignal<TZDate>(new TZDateMini());
  setInterval(() => setNow(new TZDateMini()), 1);

  const displays: DateTimeDisplay[] = [
    {
      format: "Indonesian Locale",
      function: () => now().toLocaleString("id-ID"),
    },
    {
      format: "RFC 3339",
      function: () => formatRFC3339(now()),
    },
    {
      format: "RFC 3339 with Fractions",
      function: () => formatRFC3339(now(), {
        fractionDigits: 3,
      }),
    },
    {
      format: "ISO 9075",
      function: () => formatISO9075(now()),
    },
    {
      format: "RFC 7231",
      function: () => formatRFC7231(now()),
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

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme()}>
        <Paper sx={{
          minHeight: "100vh",
          minWidth: "100%",
        }}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            My Solid Superweb
          </Typography>

          <Button onClick={() => setMode(mode() === "light" ? "dark" : "light")}>
            Change theme from {mode()} to {nextTheme()}
          </Button>

          <Table component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell sx={{
                  width: "80%",
                }}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={displays}>
                {display => (
                  <TableRow>
                    <TableCell>{display.format}</TableCell>
                    <TableCell sx={{
                      width: "80%",
                    }}>
                      <Grid container flexGrow={1} alignItems='center'>
                        <Grid item>
                          {display.function()}
                        </Grid>
                        <Grid item sx={{
                          marginLeft: "auto",
                          marginRight: "0",
                        }}>
                          <CopyToClipboardButton function={display.function} />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </Paper>
      </ThemeProvider>
    </>
  );
};
