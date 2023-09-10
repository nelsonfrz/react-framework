import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import HomePage from "./pages/index";
import AboutPage from "./pages/about";

// @ts-ignore
const serverSideProps = window.__ssr_props;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage serverSideProps={serverSideProps} />,
  },
  {
    path: "about",
    element: <AboutPage serverSideProps={serverSideProps} />,
  },
]);

hydrateRoot(
  // @ts-ignoreÌ
  document.getElementById("root"),
  <RouterProvider router={router} />
);
