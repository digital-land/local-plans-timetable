import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { DateInput, DateInputProps } from "./DateInput";

interface DateInputWrapperProps extends Pick<DateInputProps, "onChange" | "withDay"> {
  initialValue: string;
}

const DateInputWrapper = ({
  initialValue,
  onChange,
  withDay
}: DateInputWrapperProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <DateInput
      label="Date"
      name="date"
      value={value}
      withDay={withDay}
      onChange={(value) => {
        setValue(value);
        onChange(value);
      }}
    />
  );
};

it("shows the right input values from the provided value", () => {
  const { asFragment } = render(
    <DateInputWrapper initialValue="2007-03" onChange={() => {}} />
  );

  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByLabelText("Month")).toHaveValue("03");
  expect(screen.getByLabelText("Year")).toHaveValue("2007");
});

it("shows input for day when withDay is true", () => {
  const { asFragment } = render(
    <DateInputWrapper initialValue="2007-03-01" onChange={() => {}} withDay />
  );

  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByLabelText("Day")).toHaveValue("01");
  expect(screen.getByLabelText("Month")).toHaveValue("03");
  expect(screen.getByLabelText("Year")).toHaveValue("2007");
});

it("calls the onChange handler with the right value when the month input changes", async () => {
  const onChange = jest.fn();
  const { asFragment } = render(
    <DateInputWrapper initialValue="2007-03" onChange={onChange} />
  );

  await userEvent.clear(screen.getByLabelText("Month"));
  await userEvent.type(screen.getByLabelText("Month"), "4");
  await userEvent.tab()

  expect(asFragment()).toMatchSnapshot();
  expect(onChange).toHaveBeenLastCalledWith("2007-04");
});

it("calls the onChange handler with the right value when the year input changes", async () => {
  const onChange = jest.fn();
  const { asFragment } = render(
    <DateInputWrapper initialValue="2007-03" onChange={onChange} />
  );

  await userEvent.clear(screen.getByLabelText("Year"));
  await userEvent.type(screen.getByLabelText("Year"), "2008");

  expect(asFragment()).toMatchSnapshot();
  expect(onChange).toHaveBeenLastCalledWith("2008-03");
});
