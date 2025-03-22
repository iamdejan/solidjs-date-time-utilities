import { createFileRoute } from "@tanstack/solid-router";
import IntervalCalculator from "../pages/IntervalCalculator";

export const Route = createFileRoute("/interval-calculator")({
  component: IntervalCalculator,
});
