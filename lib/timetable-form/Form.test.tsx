import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { stageNames } from "../constants";
import { devPlanToCSVString } from "../utils/timetable";
import { Form } from "./Form";
import { PlanViewer } from "../timetable-visualisation/PlanViewer";

jest.mock("../utils/timetable");
jest.mock("../timetable-visualisation/PlanViewer");

describe("all activity users", () => {
  beforeEach(() => {
    (devPlanToCSVString as jest.Mock).mockImplementation(() => {});
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

    expect(devPlanToCSVString).toHaveBeenCalledTimes(1);
  });

  test("Updates the CSV when the state changes", async () => {
    render(<Form />);

    await userEvent.type(
      screen.getByTestId(`${stageNames[1].replace(/ /gi, "-")}-date-month`),
      "12"
    );
    await userEvent.type(
      screen.getByTestId(`${stageNames[1].replace(/ /gi, "-")}-date-year`),
      "2026"
    );

    expect(devPlanToCSVString).toHaveBeenCalledTimes(7);
  });

  test("renders a PlanPreview component", () => {
    render(<Form />);

    expect(PlanViewer).toHaveBeenCalledTimes(1);
  });
});
