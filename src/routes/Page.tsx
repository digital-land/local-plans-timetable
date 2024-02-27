import { Outlet } from "react-router";

import { Header, Footer } from "@lib/gds-components";
import { PageRoute } from "./routes";
import { FormProvider } from "../context/FormContext";

export const Page = () => (
  <>
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
