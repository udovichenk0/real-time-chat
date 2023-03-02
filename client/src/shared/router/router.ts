import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Router } from "@remix-run/router";
export let router: Router;
export const createRouter = (routes?: RouteObject[]) => {
  if (routes) {
    router = createBrowserRouter(routes);
    return router;
  }
  return router!;
};
