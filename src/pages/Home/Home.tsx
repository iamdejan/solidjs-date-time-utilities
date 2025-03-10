import { ThemeProvider, CssBaseline, Paper, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Grid } from '@suid/material';
import { For, JSX } from 'solid-js';
import CopyToClipboardButton from '../../components/CopyToClipboardButton';
import { useThemeOption } from './hooks/useThemeOption';
import { useDisplayTimeFormats } from './hooks/useDisplayTimeFormat';


export default function Home(): JSX.Element {
  const { mode, setMode, theme, nextTheme } = useThemeOption();
  const { displays } = useDisplayTimeFormats();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme()}>
        <Paper sx={{
          minHeight: "100vh",
          minWidth: "100%",
        }}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Solidjs Date Time Utilities
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
