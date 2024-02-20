import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextArea } from "./TextArea";

it("returns the plain text value", async () => {
  const onChange = jest.fn();
  const { asFragment } = render(
    <TextArea label="input" onChange={onChange} value="" />
  );

  await userEvent.type(screen.getByTestId("input-text-area"), "a");

  expect(asFragment()).toMatchSnapshot();
  expect(onChange).toHaveBeenCalledWith("a");
});
