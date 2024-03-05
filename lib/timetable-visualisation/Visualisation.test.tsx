import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import csvToJson from "csvtojson";
import { loadCSV } from "../utils/timetable";
import { PlanViewer } from "./PlanViewer";
import { Visualisation } from "./Visualisation";

jest.mock("../utils/timetable");
jest.mock("../timetable-visualisation/PlanViewer");
jest.mock("csvtojson", () => ({ default: jest.fn() }));

const developmentPlanFilepath = "/development-plan";
const timetableEventsFilepath = "/timetable";

describe("Visualisation", () => {
  beforeEach(() => {
    (loadCSV as jest.Mock).mockResolvedValue("");
    (PlanViewer as jest.Mock).mockReturnValue(<>Plan viewer component</>);
    (csvToJson as jest.Mock).mockImplementation(() => ({
      fromString: jest.fn(() => new Promise((resolve) => resolve([]))),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", async () => {
    await act(async () => {
      render(
        <Visualisation
          timetableEventsFilepath={timetableEventsFilepath}
          developmentPlanFilepath={developmentPlanFilepath}
        />
      );
    });

    expect(screen.getByTestId("visualisation")).toBeInTheDocument();
  });

  it("calls loadCSV and csvToJson twice on mount", async () => {
    await act(async () => {
      render(
        <Visualisation
          timetableEventsFilepath={timetableEventsFilepath}
          developmentPlanFilepath={developmentPlanFilepath}
        />
      );
    });

    expect(loadCSV).toHaveBeenCalledTimes(2);
    expect(loadCSV).toHaveBeenNthCalledWith(1, timetableEventsFilepath);
    expect(loadCSV).toHaveBeenNthCalledWith(2, developmentPlanFilepath);

    expect(csvToJson).toHaveBeenCalledTimes(2);
  });

  it("renders a PlanViewer component", async () => {
    await act(async () => {
      render(
        <Visualisation
          timetableEventsFilepath={timetableEventsFilepath}
          developmentPlanFilepath={developmentPlanFilepath}
        />
      );
    });

    expect(screen.getByText("Plan viewer component")).toBeInTheDocument();
  });

  it("filters the timetable events", async () => {
    (csvToJson as jest.Mock).mockImplementation(() => ({
      fromString: jest.fn(
        () =>
          new Promise((resolve) =>
            resolve([
              {
                reference: "39b7f5e2-beba-43d7-b20d-d9ca3b710f80",
                name: "",
                developmentPlan: "dorcester-new-local-plan",
                developmentPlanEvent: "timetable-updated",
                eventDate: "2024-02",
                notes: "",
                organisation: "",
                entryDate: "2024-02-02T15:46:14.144Z",
                startDate: "2024-02-02T15:46:14.144Z",
                endDate: "2024-03-02T15:46:14.144Z",
              },
              {
                reference: "7336edfb-8db3-4bbc-806f-4a0895cdeea6",
                name: "",
                developmentPlan: "dorcester-new-local-plan",
                developmentPlanEvent: "local-development-scheme-published",
                eventDate: "2024-07",
                notes: "",
                organisation: "",
                entryDate: "2024-02-02T15:46:14.144Z",
                startDate: "2024-02-02T15:46:14.144Z",
                endDate: "",
              },
              {
                reference: "d30c1520-adc1-45e4-8898-b2c7aaa83db8",
                name: "",
                developmentPlan: "dorcester-new-local-plan",
                developmentPlanEvent: "timetable-updated",
                eventDate: "2024-03",
                notes: "",
                organisation: "",
                entryDate: "2024-03-02T15:46:14.144Z",
                startDate: "2024-03-02T15:46:14.144Z",
                endDate: "",
              },
            ])
          )
      ),
    }));

    await act(async () => {
      render(
        <Visualisation
          timetableEventsFilepath={timetableEventsFilepath}
          developmentPlanFilepath={developmentPlanFilepath}
        />
      );
    });

    expect((PlanViewer as jest.Mock).mock.calls[1][0].timetableEvents).toEqual([
      {
        reference: "7336edfb-8db3-4bbc-806f-4a0895cdeea6",
        name: "",
        developmentPlan: "dorcester-new-local-plan",
        developmentPlanEvent: "local-development-scheme-published",
        eventDate: "2024-07",
        notes: "",
        organisation: "",
        entryDate: "2024-02-02T15:46:14.144Z",
        startDate: "2024-02-02T15:46:14.144Z",
        endDate: "",
      },
      {
        reference: "d30c1520-adc1-45e4-8898-b2c7aaa83db8",
        name: "",
        developmentPlan: "dorcester-new-local-plan",
        developmentPlanEvent: "timetable-updated",
        eventDate: "2024-03",
        notes: "",
        organisation: "",
        entryDate: "2024-03-02T15:46:14.144Z",
        startDate: "2024-03-02T15:46:14.144Z",
        endDate: "",
      },
    ]);
  });
});
