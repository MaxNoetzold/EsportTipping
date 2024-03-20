import { createLazyFileRoute } from "@tanstack/react-router";
import SingleGroupView from "./-components/SingleGroupView";

export const Route = createLazyFileRoute("/groups/$groupId/")({
  component: SingleGroupView,
});
