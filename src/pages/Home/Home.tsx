import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Button,
  useTheme,
} from "@suid/material";
import { For, JSX } from "solid-js";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import { useDisplayTimeFormats } from "./hooks/useDisplayTimeFormat";
import useThemeModeSignal, { nextTheme } from "../../hooks/useThemeModeSignal";

export default function Home(): JSX.Element {
  const { displays } = useDisplayTimeFormats();
  const mode = useThemeModeSignal((state) => state.mode);
  const switchMode = useThemeModeSignal((state) => state.switch);
  const theme = useTheme();

  return (
    <Paper
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
      }}
    >
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Solidjs Date Time Utilities
      </Typography>

      <Button onClick={switchMode}>
        Change theme from {theme.palette.mode} to {nextTheme(mode())}
      </Button>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Format</TableCell>
            <TableCell
              sx={{
                width: "80%",
              }}
            >
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={displays}>
            {(display) => (
              <TableRow>
                <TableCell>{display.format}</TableCell>
                <TableCell
                  sx={{
                    width: "80%",
                  }}
                >
                  <Grid container flexGrow={1} alignItems="center">
                    <Grid item>{display.function()}</Grid>
                    <Grid
                      item
                      sx={{
                        marginLeft: "auto",
                        marginRight: "0",
                      }}
                    >
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
  );
}
