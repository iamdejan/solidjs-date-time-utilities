import { createFileRoute } from "@tanstack/solid-router";
import AgeCalculator from "../pages/AgeCalculator";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

const searchSchema = z.object({
  start: z.string().date().optional(),
  end: z.string().date().optional(),
  calculate: z.boolean().optional(),
});

export const Route = createFileRoute("/age-calculator")({
  component: AgeCalculator,
  validateSearch: zodValidator(searchSchema),
});
