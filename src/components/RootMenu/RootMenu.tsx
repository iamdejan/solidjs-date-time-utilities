import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@suid/material";
import { Outlet } from "@tanstack/solid-router";
import { createSignal, JSX } from "solid-js";
import MenuIcon from "@suid/icons-material/Menu";
import DrawerLink from "../DrawerLink/DrawerLink";
import { useThemeWithMode } from "./hooks/useThemeWithMode";
import ThemeSwitch from "../ThemeSwitch";
import CreatedLinkComponent from "../CreatedLinkComponent";

export default function RootMenu(): JSX.Element {
  const { theme } = useThemeWithMode();
  const [open, setOpen] = createSignal<boolean>(false);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{ margin: "0", padding: "0" }}>
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <Button color="inherit" onClick={() => setOpen(true)}>
                <MenuIcon />
              </Button>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginLeft: "auto",
                  marginRight: "0",
                }}
              >
                <CreatedLinkComponent
                  to="/"
                  style={{ "text-decoration": "none", color: "inherit" }}
                >
                  Date Time Utilities
                </CreatedLinkComponent>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Paper
          sx={{
            minHeight: "100vh",
            minWidth: "100%",
            borderRadius: 0,
          }}
        >
          <Outlet />
        </Paper>
        <Drawer open={open()} onClose={() => setOpen(false)}>
          <List>
            <DrawerLink to="/" text="Home" />
            <DrawerLink to="/age-calculator" text="Age Calculator" />
            <DrawerLink to="/time-converter" text="Time Converter" />
            <DrawerLink to="/gregorian-easter" text="Gregorian Easter" />
          </List>
          <Divider />
          <List>
            <ListItem>
              <ThemeSwitch />
            </ListItem>
          </List>
        </Drawer>
      </ThemeProvider>
    </>
  );
}
