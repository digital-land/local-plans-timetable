import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
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
    (PlanViewer as jest.Mock).mockReturnValue(<></>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    render(
      <Visualisation
        stagesFilepath={stagesFilePath}
        headersFilepath={headersFilepath}
      />
    );
    expect(screen.getByTestId("visualisation")).toBeInTheDocument();
  });

  it("calls loadCSV and csvToJson twice on mount", async () => {
    render(
      <Visualisation
        stagesFilepath={stagesFilePath}
        headersFilepath={headersFilepath}
      />
    );
    await waitFor(() => {
      expect(loadCSV).toHaveBeenCalledTimes(2);
      expect(loadCSV).toHaveBeenNthCalledWith(1, stagesFilePath);
      expect(loadCSV).toHaveBeenNthCalledWith(2, headersFilepath);

      expect(csvToJson).toHaveBeenCalledTimes(2);
    });
  });
  it("renders a PlanPreview component", () => {
    render(
      <Visualisation
        stagesFilepath={stagesFilePath}
        headersFilepath={headersFilepath}
      />
    );
    expect(PlanViewer).toHaveBeenCalledTimes(1);
  });
});
