import {
  ThemeProvider,
  CssBaseline,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Drawer,
  AppBar,
  Container,
  Toolbar,
  List,
} from "@suid/material";
import { createSignal, For, JSX } from "solid-js";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import { useThemeOption } from "./hooks/useThemeOption";
import { useDisplayTimeFormats } from "./hooks/useDisplayTimeFormat";
import MenuIcon from "@suid/icons-material/Menu";
import DrawerLink from "../../components/DrawerLink/DrawerLink";

export default function Home(): JSX.Element {
  const { mode, setMode, theme, nextTheme } = useThemeOption();
  const { displays } = useDisplayTimeFormats();
  const [open, setOpen] = createSignal<boolean>(false);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme()}>
        <AppBar position="static">
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <Button color="inherit" onClick={() => setOpen(true)}>
                <MenuIcon />
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Paper
          sx={{
            minHeight: "100vh",
            minWidth: "100%",
          }}
        >
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Solidjs Date Time Utilities
          </Typography>

          <Button
            onClick={() => setMode(mode() === "light" ? "dark" : "light")}
          >
            Change theme from {mode()} to {nextTheme()}
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
        <Drawer open={open()} onClose={() => setOpen(false)}>
          <List>
            <DrawerLink to="/" text="Home" />
            <DrawerLink to="/interval-calculator" text="Interval Calculator" />
          </List>
        </Drawer>
      </ThemeProvider>
    </>
  );
}
