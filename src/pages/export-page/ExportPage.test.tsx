import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";

import {
  resolveDevelopmentPlanCSV,
  resolveTimetableEventsCSV,
} from "@lib/utils/timetable";
import { PlanViewer } from "@lib/timetable-visualisation/PlanViewer";
import { FormProvider } from "../../context/FormContext";
import { ExportPage } from "./ExportPage";

jest.mock("@lib/utils/timetable");
jest.mock("@lib/timetable-visualisation/PlanViewer");

jest.mock("react-router-dom");

const renderPage = () =>
  render(
    <FormProvider>
      <ExportPage />
    </FormProvider>
  );

beforeEach(() => {
  (resolveDevelopmentPlanCSV as jest.Mock).mockImplementation(() => {});
  (resolveTimetableEventsCSV as jest.Mock).mockImplementation(() => {});
  (PlanViewer as jest.Mock).mockReturnValue(<>Plan viewer component</>);
});

afterEach(() => {
  jest.clearAllMocks();
});

test("Generates CSV files on render", async () => {
  await act(async () => {
    renderPage();
  });

  expect(resolveDevelopmentPlanCSV).toHaveBeenCalledTimes(1);
  expect(resolveTimetableEventsCSV).toHaveBeenCalledTimes(1);
});

test("Renders a PlanViewer component", async () => {
  await act(async () => {
    renderPage();
  });

  expect(screen.getByText("Plan viewer component")).toBeInTheDocument();
});
