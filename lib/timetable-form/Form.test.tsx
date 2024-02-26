import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { developmentPlanTimetableEvents } from "../constants";
import {
  resolveDevelopmentPlanCSV,
  resolveTimetableEventsCSV,
} from "../utils/timetable";
import { Form } from "./Form";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";
import { fetchLPAs } from "../../src/api";

jest.mock("../utils/timetable");
jest.mock("../../src/api/");
jest.mock("../timetable-visualisation/PlanViewer");
jest.mock("../validation");

// This is mocked to avoid the warnings about componentWillMount and componentWillReceiveProps from the accessible-autocomplete component
jest.mock("./autocomplete/Autocomplete");

describe("Form", () => {
  beforeEach(() => {
    (resolveDevelopmentPlanCSV as jest.Mock).mockImplementation(() => {});
    (resolveTimetableEventsCSV as jest.Mock).mockImplementation(() => {});
    (fetchLPAs as jest.Mock).mockResolvedValue({ entities: [] });
    (PlanViewer as jest.Mock).mockReturnValue(<>Plan viewer component</>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays title", async () => {
    await act(async () => {
      render(<Form />);
    });
    expect(screen.getByTestId("form-title")).toBeInTheDocument();
  });

  test("Generates CSV file on render", async () => {
    await act(async () => {
      render(<Form />);
    });

    expect(resolveDevelopmentPlanCSV).toHaveBeenCalledTimes(1);
    expect(resolveTimetableEventsCSV).toHaveBeenCalledTimes(1);
  });

  test("Updates the CSV when the state changes", async () => {
    await act(async () => {
      render(<Form />);
    });

    expect(resolveTimetableEventsCSV).toHaveBeenCalledTimes(1);

    await userEvent.type(
      screen.getByTestId(`${developmentPlanTimetableEvents[1].key}-date-month`),
      "11"
    );

    expect(resolveTimetableEventsCSV).toHaveBeenCalledTimes(3);

    await userEvent.type(
      screen.getByTestId(`${developmentPlanTimetableEvents[1].key}-date-year`),
      "2026"
    );

    expect(resolveTimetableEventsCSV).toHaveBeenCalledTimes(7);
  });

  test("renders a PlanViewer component", async () => {
    await act(async () => {
      render(<Form />);
    });

    expect(screen.getByText("Plan viewer component")).toBeInTheDocument();
  });
});
