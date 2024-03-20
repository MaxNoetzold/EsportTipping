import { createLazyFileRoute } from "@tanstack/react-router";
import Schedule from "../views/Schedule";

export const Route = createLazyFileRoute("/")({
  component: Schedule,
});
