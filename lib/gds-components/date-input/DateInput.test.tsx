import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { DateInput, DateInputProps } from "./DateInput";

interface DateInputWrapperProps extends Pick<DateInputProps, "onChange"> {
  initialValue: string;
}

const DateInputWrapper = ({
  initialValue,
  onChange,
}: DateInputWrapperProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <DateInput
      label="Date"
      name="date"
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange(value);
      }}
    />
  );
};

it("shows the right input values from the provided value", () => {
  const { asFragment } = render(
    <DateInputWrapper initialValue="3-2007" onChange={() => {}} />
  );

  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByLabelText("Month")).toHaveValue("3");
  expect(screen.getByLabelText("Year")).toHaveValue("2007");
});

it("calls the onChange handler with the right value when the month input changes", async () => {
  const onChange = jest.fn();
  const { asFragment } = render(
    <DateInputWrapper initialValue="3-2007" onChange={onChange} />
  );

  await userEvent.clear(screen.getByLabelText("Month"));
  await userEvent.type(screen.getByLabelText("Month"), "4");

  expect(asFragment()).toMatchSnapshot();
  expect(onChange).toHaveBeenLastCalledWith("4-2007");
});

it("calls the onChange handler with the right value when the year input changes", async () => {
  const onChange = jest.fn();
  const { asFragment } = render(
    <DateInputWrapper initialValue="3-2007" onChange={onChange} />
  );

  await userEvent.clear(screen.getByLabelText("Year"));
  await userEvent.type(screen.getByLabelText("Year"), "2008");

  expect(asFragment()).toMatchSnapshot();
  expect(onChange).toHaveBeenLastCalledWith("3-2008");
});
