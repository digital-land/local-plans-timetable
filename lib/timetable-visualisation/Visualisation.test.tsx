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

const stagesFilePath = "/stages";
const headersFilepath = "/header";

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
          stagesFilepath={stagesFilePath}
          headersFilepath={headersFilepath}
        />
      );
    });

    expect(screen.getByTestId("visualisation")).toBeInTheDocument();
  });

  it("calls loadCSV and csvToJson twice on mount", async () => {
    await act(async () => {
      render(
        <Visualisation
          stagesFilepath={stagesFilePath}
          headersFilepath={headersFilepath}
        />
      );
    });

    expect(loadCSV).toHaveBeenCalledTimes(2);
    expect(loadCSV).toHaveBeenNthCalledWith(1, stagesFilePath);
    expect(loadCSV).toHaveBeenNthCalledWith(2, headersFilepath);

    expect(csvToJson).toHaveBeenCalledTimes(2);
  });

  it("renders a PlanViewer component", async () => {
    await act(async () => {
      render(
        <Visualisation
          stagesFilepath={stagesFilePath}
          headersFilepath={headersFilepath}
        />
      );
    });

    expect(screen.getByText("Plan viewer component")).toBeInTheDocument();
  });
});
