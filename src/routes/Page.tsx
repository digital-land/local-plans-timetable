import { Outlet } from "react-router";

import { Header, Footer } from "@lib/gds-components";
import { PageRoute } from "./routes";
import { FormProvider } from "../pages/FormContext";

export const Page = () => (
  <>
    <Header homeURL={PageRoute.Base} />
    <FormProvider>
      <Outlet />
    </FormProvider>
    <Footer />
  </>
);
