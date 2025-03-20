import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Drawer,
  List,
  ThemeProvider,
  Toolbar,
} from "@suid/material";
import { Outlet } from "@tanstack/solid-router";
import { createSignal, JSX } from "solid-js";
import MenuIcon from "@suid/icons-material/Menu";
import DrawerLink from "../DrawerLink/DrawerLink";
import { createThemeWithPredefinedMode } from "./hooks/createThemeWithPredefinedMode";

export default function RootMenu(): JSX.Element {
  const { theme } = createThemeWithPredefinedMode();
  const [open, setOpen] = createSignal<boolean>(false);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <Button color="inherit" onClick={() => setOpen(true)}>
                <MenuIcon />
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Outlet />
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
