import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { FileUpload } from "./FileUpload";

const labelText = "Upload a file";
const onChange = jest.fn();

describe("FileUpload", () => {
  it("calls onChange with the right value when input changes", async () => {
    const { asFragment } = render(
      <FileUpload label={labelText} onChange={onChange} />
    );

    const file = new File([], "test.csv", {
      type: ".svg",
    });

    const input = screen.getByLabelText(labelText);

    await waitFor(() =>
      fireEvent.change(input, {
        target: { files: [file] },
      })
    );

    expect(asFragment()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledWith(file);
  });
});
