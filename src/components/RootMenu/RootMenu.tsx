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
                SolidJS Date Time Utilities
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Paper
          sx={{
            minHeight: "100vh",
            minWidth: "100%",
          }}
        >
          <Outlet />
        </Paper>
        <Drawer open={open()} onClose={() => setOpen(false)}>
          <List>
            <DrawerLink to="/" text="Home" />
            <DrawerLink to="/interval-calculator" text="Interval Calculator" />
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
