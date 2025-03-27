import { createFileRoute } from "@tanstack/solid-router";
import TimeConverter from "../pages/TimeConverter";

export const Route = createFileRoute("/time-converter")({
  component: TimeConverter,
});
