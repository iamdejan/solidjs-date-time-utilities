import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from "@suid/material";
import { For, JSX } from "solid-js";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import { useDisplayTimeFormats } from "./hooks/useDisplayTimeFormat";

export default function Home(): JSX.Element {
  const { displays } = useDisplayTimeFormats();

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Home
      </Typography>

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
    </>
  );
}
