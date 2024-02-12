import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { stages } from "../constants";
import {
  objectArrayToCSVString,
  resolveTimetableEventsCSV,
} from "../utils/timetable";
import { Form } from "./Form";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";
import { fetchLPAs } from "../api";

jest.mock("../utils/timetable");
jest.mock("../api/");
jest.mock("../timetable-visualisation/PlanViewer");

describe("all activity users", () => {
  beforeEach(() => {
    (objectArrayToCSVString as jest.Mock).mockImplementation(() => {});
    (resolveTimetableEventsCSV as jest.Mock).mockImplementation(() => {});
    (fetchLPAs as jest.Mock).mockResolvedValue({ entities: [] });
    (PlanViewer as jest.Mock).mockReturnValue(<></>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders the main page", () => {
    render(<Form />);
    expect(screen.getByTestId("form-title")).toBeInTheDocument();
  });

  test("Generates CSV file on render", () => {
    render(<Form />);

    expect(objectArrayToCSVString).toHaveBeenCalledTimes(1);
    expect(resolveTimetableEventsCSV).toHaveBeenCalledTimes(1);
  });

  test("Updates the CSV when the state changes", async () => {
    render(<Form />);

    await userEvent.type(
      screen.getByTestId(`${stages[1].key}-date-month`),
      "12"
    );
    await userEvent.type(
      screen.getByTestId(`${stages[1].key}-date-year`),
      "2026"
    );

    expect(resolveTimetableEventsCSV).toHaveBeenCalledTimes(7);
  });

  test("renders a PlanPreview component", () => {
    render(<Form />);

    expect(PlanViewer).toHaveBeenCalledTimes(1);
  });
});
