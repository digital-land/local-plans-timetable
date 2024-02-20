import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { loadCSV } from "../utils/timetable";
import { Visualisation } from "./Visualisation";
import csvToJson from "csvtojson";
import { PlanViewer } from "./PlanViewer";

jest.mock("../utils/timetable");
jest.mock("../timetable-visualisation/PlanViewer");
jest.mock("csvtojson", () => ({
  default: jest.fn(() => ({
    fromString: jest.fn(() => new Promise((resolve) => resolve([]))),
  })),
}));

const developmentPlanFilepath = "/development-plan";
const timetableEventsFilepath = "/development-plan-timetable";

describe("Visualisation", () => {
  beforeEach(() => {
    (loadCSV as jest.Mock).mockResolvedValue("");
    (PlanViewer as jest.Mock).mockReturnValue(<>Plan viewer component</>);
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
});
