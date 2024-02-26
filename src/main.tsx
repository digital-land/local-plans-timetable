import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LPAPage,
  TitlePage,
  DescriptionPage,
  StagePage,
  PublishLDSPage,
} from "./pages";
import { FormPageHoC } from "./pages/FormPageHoc";
import { validateDescription } from "./pages/description-page/description-validation";
import { validateTimetableStage } from "./pages/stage-page/validate-stage-page";
import { validateTitle } from "./pages/title-page/validate-title-page";
import { validatePublishLDSEvent } from "./pages/publish-LDS-page/validate-publish-LDS-page";
import { CreateTimetablePage } from "./pages/create-timetable-page/CreateTimetablePage";
import { stages } from "./pages/stages";
import { Page } from "./routes/Page";
import { PageRoute } from "./routes/routes";

import "./main.css";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const router = createBrowserRouter(
  [
    {
      element: <Page />,
      children: [
        {
          path: PageRoute.Root,
          element: <CreateTimetablePage />,
        },
        {
          path: PageRoute.LPA,
          element: FormPageHoC(LPAPage, {}),
        },
        {
          path: PageRoute.Title,
          element: FormPageHoC(TitlePage, {}, validateTitle),
        },
        {
          path: PageRoute.Description,
          element: FormPageHoC(DescriptionPage, {}, validateDescription),
        },
        {
          path: PageRoute.PublishLocalDevelopmentScheme,
          element: FormPageHoC(PublishLDSPage, {}, validatePublishLDSEvent),
        },
        ...stages.map(({ key, ...otherProps }) => ({
          path: key,
          element: FormPageHoC(StagePage, otherProps, validateTimetableStage),
        })),
      ],
    },
  ],
  { basename: PageRoute.Base }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
