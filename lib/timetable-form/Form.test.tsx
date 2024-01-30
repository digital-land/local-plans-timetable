import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Form } from "./Form";

test("Renders the main page", () => {
  render(<Form />);
  expect(screen.getByText("Form Title")).toBeInTheDocument();
});
