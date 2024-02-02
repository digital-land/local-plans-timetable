import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextInput } from "./TextInput";

it("returns the plain text value", async () => {
  const onChange = jest.fn();
  const { asFragment } = render(
    <TextInput label="input" onChange={onChange} value="" />
  );

  await userEvent.type(screen.getByLabelText("input"), "a");

  expect(asFragment()).toMatchSnapshot();
  expect(onChange).toHaveBeenCalledWith("a");
});
