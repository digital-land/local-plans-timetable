import { Outlet } from "react-router";

import { Header, Footer } from "@lib/gds-components";
import { Routes } from "./routes";

export const Page = () => (
  <>
    <Header homeURL={Routes.Base} />
    <Outlet />
    <Footer />
  </>
);
