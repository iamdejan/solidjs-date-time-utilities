import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@suid/material";
import { For, JSX } from "solid-js";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import { useDisplayTimeFormats } from "./hooks/useDisplayTimeFormat";

export default function Home(): JSX.Element {
  const { selectedTimeZone, setSelectedTimeZone, displays } =
    useDisplayTimeFormats();

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Home
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginBottom: "2rem",
          marginRight: "2rem",
        }}
      >
        <FormControl>
          <InputLabel id="time-zone-select">Time Zone</InputLabel>
          <Select
            value={selectedTimeZone()}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            labelId="time-zone-select"
            label="Time Zone"
            sx={{
              width: "clamp(120px, 200px, 200px)",
            }}
          >
            <MenuItem value={""}>(User's Location)</MenuItem>
            <For each={Intl.supportedValuesOf("timeZone")}>
              {(timezone) => <MenuItem value={timezone}>{timezone}</MenuItem>}
            </For>
          </Select>
        </FormControl>
      </Box>

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
