import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { fetchLPAs } from "../../api";
import { Form } from "../Form";

jest.mock("../autocomplete/Autocomplete");
jest.mock("../../api/");

describe("LPAPage", () => {
  beforeEach(() => {
    (fetchLPAs as jest.Mock).mockResolvedValue({ entities: [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Calls fetchLPAs on mount", async () => {
    await act(async () => {
      render(<Form />);
    });
    expect(fetchLPAs).toHaveBeenCalledTimes(1);
  });
});
