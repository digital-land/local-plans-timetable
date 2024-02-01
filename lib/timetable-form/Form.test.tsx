import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";
import { stageNames } from "../constants";
import {
  formStateToDevelopmentPlanTimetables,
  devPlanToCSVString,
} from "../utils/timetable";

jest.mock("../utils/timetable");

describe("all activity users", () => {
  beforeEach(() => {
    (formStateToDevelopmentPlanTimetables as jest.Mock).mockImplementation(
      () => {},
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

  test("Updates the CSV when the state changes", () => {
    render(<Form />);

    const dateInput = screen.getByTestId(
      `${stageNames[1].replace(/ /gi, "-")}-input`,
    );

    fireEvent.change(dateInput, { target: { value: "2026-12" } });

    expect(dateInput).toHaveValue("2026-12");

    expect(formStateToDevelopmentPlanTimetables).toHaveBeenCalledTimes(2);
    expect(devPlanToCSVString).toHaveBeenCalledTimes(2);
  });
});
