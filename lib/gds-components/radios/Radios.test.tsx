import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RadioOption, Radios } from "./Radios";

const options: RadioOption[] = [
  { label: "Yes", value: "y" },
  { label: "No", value: "n" },
];
const onChange = jest.fn();

describe("Radios", () => {
  it("calls onChange", async () => {
    const { asFragment } = render(
      <Radios label="radio" onChange={onChange} options={options} />
    );

    await userEvent.click(screen.getByLabelText(options[0].label));

    expect(asFragment()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledWith(options[0].value);
  });
  
  it("displays 1 radio input for each option", async () => {
    const onChange = jest.fn();
    const { asFragment } = render(
      <Radios label="radio" onChange={onChange} options={options} />
    );

    const inputs = screen.queryAllByRole("radio-input");

    expect(asFragment()).toMatchSnapshot();
    expect(inputs.length).toEqual(options.length);
  });
});
