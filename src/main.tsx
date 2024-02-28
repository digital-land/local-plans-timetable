import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {
  LPAPage,
  TitlePage,
  DescriptionPage,
  StagePage,
  PublishLDSPage,
  UploadTimetablePage,
} from "./pages";
import { FormPageHoC } from "./pages/FormPageHoc";
import { validateDescription } from "./pages/description-page/description-validation";
import { validateTimetableStage } from "./pages/stage-page/validate-stage-page";
import { validateTitle } from "./pages/title-page/validate-title-page";
import { validatePublishLDSEvent } from "./pages/publish-LDS-page/validate-publish-LDS-page";
import { CreateTimetablePage } from "./pages/create-timetable-page/CreateTimetablePage";
import { ExportPage } from "./pages/export-page/ExportPage";
import { stages } from "./pages/stages";
import { Page } from "./routes/Page";
import { PageRoute } from "./routes/routes";

import "./main.css";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const router = createHashRouter([
  {
    element: <Page />,
    children: [
      {
        path: PageRoute.Root,
        element: <CreateTimetablePage />,
      },
      {
        path: PageRoute.UploadTimetable,
        element: FormPageHoC(UploadTimetablePage, {}),
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
      {
        path: PageRoute.Export,
        element: FormPageHoC(ExportPage, {}),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
