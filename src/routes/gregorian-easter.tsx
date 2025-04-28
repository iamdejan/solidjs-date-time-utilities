import { createFileRoute } from "@tanstack/solid-router";
import GregorianEaster from "../pages/GregorianEaster";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

const searchSchema = z.object({
  year: z.optional(z.number().min(1900).max(2999)),
});

export const Route = createFileRoute("/gregorian-easter")({
  component: GregorianEaster,
  validateSearch: zodValidator(searchSchema),
});
