import { createFileRoute } from "@tanstack/solid-router";
import GregorianEaster from "../pages/GregorianEaster";

export const Route = createFileRoute("/gregorian-easter")({
  component: GregorianEaster,
});
