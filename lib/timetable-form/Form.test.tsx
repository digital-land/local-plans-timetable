import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { stageNames } from "../constants";
import {
  formStateToDevelopmentPlanTimetables,
  devPlanToCSVString,
} from "../utils/timetable";
import { Form } from "./Form";

jest.mock("../utils/timetable");

describe("all activity users", () => {
  beforeEach(() => {
    (formStateToDevelopmentPlanTimetables as jest.Mock).mockImplementation(
      () => {}
    );
    (devPlanToCSVString as jest.Mock).mockImplementation(() => {});
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

    expect(formStateToDevelopmentPlanTimetables).toHaveBeenCalledTimes(1);
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

    expect(formStateToDevelopmentPlanTimetables).toHaveBeenCalledTimes(7);
    expect(devPlanToCSVString).toHaveBeenCalledTimes(7);
  });
});
