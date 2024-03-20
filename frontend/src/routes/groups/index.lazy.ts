import { createLazyFileRoute } from "@tanstack/react-router";
import GroupsOverview from "./-components/GroupsOverview";

export const Route = createLazyFileRoute("/groups/")({
  component: () => GroupsOverview(),
});
