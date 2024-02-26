import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Page } from "./routes/Page";
import { Root } from "./routes/Root";
import { Routes } from "./routes/routes";
import "./main.css";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const router = createBrowserRouter(
  [
    {
      element: <Page />,
      children: [
        {
          path: Routes.Root,
          element: <Root />,
        },
      ],
    },
  ],
  { basename: Routes.Base }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
