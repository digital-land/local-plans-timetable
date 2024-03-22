import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LPAPage,
  TitlePage,
  DescriptionPage,
  StagePage,
  PublishLDSPage,
  UploadTimetablePage,
  UpdateTimetableStatusPage,
  StatusChangeEventPage,
  CreateTimetablePage,
  ExportPage,
} from "./pages";
import { FormPageHoC } from "./pages/FormPageHoc";
import { validateDescription } from "./pages/description-page/description-validation";
import { validateTimetableStage } from "./pages/stage-page/validate-stage-page";
import { validateUpload } from "./pages/upload-timetable-page/validate-upload-timetable-page";
import { validateTitle } from "./pages/title-page/validate-title-page";
import { validatePublishLDSEvent } from "./pages/publish-LDS-page/validate-publish-LDS-page";
import { validateStatusChangeEvent } from "./pages/status-change-event-page/status-change-event-validation";
import { validateUpdateTimetableStatus } from "./pages/update-timetable-status-page/update-timetable-status-validation";
import { UpdateDatesPage } from "./pages/update-dates-page/UpdateDatesPage";
import { validateUpdateDates } from "./pages/update-dates-page/update-dates-validation";
import { validateLPA } from "./pages/LPA-page/lpa-validation";
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
          path: PageRoute.HowToPublish,
          lazy: async () => {
            const { HowToPublishPage } = await import(
              "./pages/how-to-publish-page/HowToPublishPage"
            );
            return { Component: HowToPublishPage };
          },
        },
        {
          path: PageRoute.HowToUpdate,
          lazy: async () => {
            const { HowToUpdatePage } = await import(
              "./pages/how-to-update-page/HowToUpdatePage"
            );
            return { Component: HowToUpdatePage };
          },
        },
        {
          path: PageRoute.PublishOnlineGuidance,
          lazy: async () => {
            const { PublishOnlineGuidancePage } = await import(
              "./pages/publish-online-guidance/PublishOnlineGuidancePage"
            );
            return { Component: PublishOnlineGuidancePage };
          },
        },
        {
          path: PageRoute.UploadTimetable,
          element: FormPageHoC(UploadTimetablePage, {}, validateUpload),
        },
        {
          path: PageRoute.LPA,
          element: FormPageHoC(LPAPage, {}, validateLPA),
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
        {
          path: PageRoute.UpdateTimetableStatus,
          element: FormPageHoC(
            UpdateTimetableStatusPage,
            {},
            validateUpdateTimetableStatus
          ),
        },
        {
          path: PageRoute.StatusChangeEvent,
          element: FormPageHoC(
            StatusChangeEventPage,
            {},
            validateStatusChangeEvent
          ),
        },
        {
          path: PageRoute.UpdateDates,
          element: FormPageHoC(UpdateDatesPage, {}, validateUpdateDates),
        },
        ...stages.map(({ key, ...otherProps }) => ({
          path: key,
          element: FormPageHoC(
            StagePage,
            { ...otherProps, stageName: key.slice(1) },
            validateTimetableStage
          ),
        })),
        {
          path: PageRoute.Export,
          element: FormPageHoC(ExportPage, {}),
        },
        {
          path: PageRoute.VisualisationExample,
          lazy: async () => {
            const { VisualisationExamplePage } = await import(
              "./pages/visualisation-example/VisualisationExamplePage"
            );
            return { Component: VisualisationExamplePage };
          },
        },
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
