import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";

import {
  DEFAULT_DEVELOPMENT_PLAN,
  TimetableEventKey,
  getDefaultTimetableEvents,
  getFormattedDate,
} from "@lib/constants";
import { DevelopmentPlanTimetable } from "@lib/types/timetable";
import {
  resolveDevelopmentPlanCSV,
  resolveTimetableEventsCSV,
} from "@lib/utils/timetable";
import { PlanViewer } from "@lib/timetable-visualisation/PlanViewer";
import { FormContextValues } from "../../context/FormContext";
import { useFormContext } from "../../context/use-form-context";
import { Journey } from "../../routes/routes";
import { ExportPage } from "./ExportPage";

jest.mock("@lib/utils/timetable");
jest.mock("@lib/timetable-visualisation/PlanViewer");

jest.mock("react-router-dom");

jest.mock("@lib/constants", () => ({
  ...jest.requireActual("@lib/constants"),
  getFormattedDate: jest.fn(),
}));

jest.mock("../../context/use-form-context", () => ({
  useFormContext: jest.fn(),
}));

const renderPage = (contextValues?: Partial<FormContextValues>) => {
  (useFormContext as jest.Mock).mockImplementation(() => ({
    developmentPlan: DEFAULT_DEVELOPMENT_PLAN,
    loadedDevelopmentPlan: null,
    timetableEvents: getDefaultTimetableEvents(
      DEFAULT_DEVELOPMENT_PLAN.reference
    ),
    loadedTimetableEvents: null,
    statusChangeEvent: null,
    userFlow: null,
    ...contextValues,
  }));
  render(<ExportPage />);
};

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

describe("Entry and start dates", () => {
  test("Adds entry and start dates to development plan in create journey", async () => {
    (getFormattedDate as jest.Mock).mockImplementation(() => "Formatted date");

    await act(async () => {
      renderPage({ userFlow: Journey.Create });
    });

    expect(resolveDevelopmentPlanCSV).toHaveBeenCalledWith(
      expect.objectContaining({
        ...DEFAULT_DEVELOPMENT_PLAN,
        entryDate: "Formatted date",
        startDate: "Formatted date",
      }),
      null
    );
  });

  test("Adds entry and start dates to timetable updated event in create journey", async () => {
    (getFormattedDate as jest.Mock).mockImplementation(() => "Formatted date");

    await act(async () => {
      renderPage({ userFlow: Journey.Create });
    });

    const timetableUpdatedEvent = (
      resolveTimetableEventsCSV as jest.Mock
    ).mock.calls[0][0].find(
      ({ developmentPlanEvent }: DevelopmentPlanTimetable) =>
        developmentPlanEvent === TimetableEventKey.TimetableUpdated
    );
    expect(timetableUpdatedEvent.entryDate).toEqual("Formatted date");
    expect(timetableUpdatedEvent.startDate).toEqual("Formatted date");
  });

  test("Adds entry and start dates to standard events in create journey", async () => {
    (getFormattedDate as jest.Mock).mockImplementation(() => "Formatted date");

    await act(async () => {
      renderPage({ userFlow: Journey.Create });
    });

    const standardEvents = (
      resolveTimetableEventsCSV as jest.Mock
    ).mock.calls[0][0].filter(
      ({ developmentPlanEvent }: DevelopmentPlanTimetable) =>
        developmentPlanEvent !== TimetableEventKey.TimetableUpdated
    );
    expect(
      standardEvents.every(
        ({ entryDate, startDate }: DevelopmentPlanTimetable) =>
          entryDate === "Formatted date" && startDate === "Formatted date"
      )
    );
  });
});
