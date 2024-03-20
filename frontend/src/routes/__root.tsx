import { createRootRoute, Outlet } from "@tanstack/react-router";
import TopNavbar from "../components/TopNavbar";
import React, { Suspense } from "react";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

function RootElement() {
  return (
    <>
      <TopNavbar />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}

export const Route = createRootRoute({
  component: RootElement,
});
