import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LPAPage, TitlePage, DescriptionPage, StagePage } from "./pages";
import { FormPageHoC } from "./pages/FormPageHoc";
import { validateDescription } from "./pages/description-page/description-validation";
import { validateTimetableStage } from "./pages/stage-page/validate-stage-page";
import { validateTitle } from "./pages/title-page/validate-title-page";
import { stages } from "./pages/useSequence";
import { Page } from "./routes/Page";
import { Root } from "./routes/Root";
import { PageRoute } from "./routes/routes";

const router = createBrowserRouter(
  [
    {
      element: <Page />,
      children: [
        {
          path: PageRoute.Root,
          element: <Root />,
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
          element: FormPageHoC(
            DescriptionPage,
            {},
            validateDescription
          ),
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
