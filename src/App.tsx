import { createTheme, ThemeProvider, CssBaseline, Paper, Typography, Button, createPalette, Table, TableHead, TableBody, TableRow, TableCell } from '@suid/material';
import { createSignal, For, type Component } from 'solid-js';

type ThemeOption = "light" | "dark";

type DateTimeDisplay = {
  format: string;
  function: () => string;
};

function formatDateToISO9075(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDateToUnixSeconds(date: Date): string {
  const ms = date.getTime();
  return String(Math.floor(ms / 1000));
}

function formatDateToUnixMilliseconds(date: Date): string {
  const ms = date.getTime();
  return String(ms);
}

const SECONDS_IN_DAY = 24 * 60 * 60;
const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000;
const MAGIC_NUMBER_OF_DAYS = (25567 + 2);

function toExcelDate(date: Date): string {
  const result = (date.getTime() / MISSING_LEAP_YEAR_DAY) + MAGIC_NUMBER_OF_DAYS;
  return result.toFixed(6);
}

const App: Component = () => {
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

  // date-time
  const [now, setNow] = createSignal<Date>(new Date());
  setInterval(() => setNow(new Date()), 1);

  const displays: DateTimeDisplay[] = [
    {
      format: "Indonesian Locale",
      function: () => now().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    },
    {
      format: "RFC 3339",
      function: () => now().toISOString(),
    },
    {
      format: "ISO 9075",
      function: () => formatDateToISO9075(now()),
    },
    {
      format: "Unix Timestamp (seconds)",
      function: () => formatDateToUnixSeconds(now()),
    },
    {
      format: "Unix Timestamp (milliseconds)",
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
                    }}>{display.function()}</TableCell>
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

export default App;
