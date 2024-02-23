import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { StagePage } from "./StagePage";
import { DateInput } from "../../../gds-components";

jest.mock("../../../gds-components");

describe("StagePage", () => {
  beforeEach(() => {
    (DateInput as jest.Mock).mockImplementation(() => <></>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Displays one DateInput component when Stage has only start event", async () => {
    await act(async () => {
      render(
        <StagePage
          title={""}
          description={undefined}
          startEvent="timetable-published"
        />
      );
    });

    expect(DateInput).toHaveBeenCalledTimes(1);
  });

  test("Displays 2 DateInput components when Stage has start and end event", async () => {
    await act(async () => {
      render(
        <StagePage
          title={""}
          description={undefined}
          startEvent={"examination-hearing-start"}
          endEvent={"examination-hearing-end"}
        />
      );
    });
    expect(DateInput).toHaveBeenCalledTimes(2);
  });
});
