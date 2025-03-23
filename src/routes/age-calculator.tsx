import { createFileRoute } from "@tanstack/solid-router";
import AgeCalculator from "../pages/AgeCalculator";

export const Route = createFileRoute("/age-calculator")({
  component: AgeCalculator,
});
