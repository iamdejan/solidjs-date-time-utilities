import { createRootRoute } from "@tanstack/solid-router";
import RootMenu from "../components/RootMenu";

export const Route = createRootRoute({
  component: RootMenu,
});
