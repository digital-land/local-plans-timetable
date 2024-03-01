import { Outlet } from "react-router";

import { Header, Footer } from "@lib/gds-components";
import { FormProvider } from "../context/FormContext";
import { PageRoute } from "./routes";
import {ScrollToTop} from "./ScrollToTop";

export const Page = () => (
  <>
    <ScrollToTop />
    <Header homeURL={PageRoute.Base} />
    <FormProvider>
      <div className="govuk-width-container app-width-container">
        <main className="govuk-main-wrapper">
          <Outlet />
        </main>
      </div>
    </FormProvider>
    <Footer />
  </>
);
