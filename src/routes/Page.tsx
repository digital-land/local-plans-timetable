import { Outlet } from "react-router";

import { Header, Footer, PhaseBanner } from "@lib/gds-components";
import { FormProvider } from "../context/FormContext";
import { PageRoute } from "./routes";
import { ScrollToTop } from "./ScrollToTop";

export const Page = () => (
  <>
    <ScrollToTop />
    <Header homeURL={PageRoute.Base} />
    <FormProvider>
      <div className="govuk-width-container app-width-container">
        <PhaseBanner/>
        <main className="govuk-main-wrapper govuk-!-padding-top-0">
          <Outlet />
        </main>
      </div>
    </FormProvider>
    <Footer />
  </>
);
