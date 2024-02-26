import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { StagePage } from "./StagePage";
import { DateInput } from "@lib/gds-components";

jest.mock("@lib/gds-components");

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
          startEventKey="timetable-published"
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
          startEventKey={"examination-hearing-start"}
          endEventKey={"examination-hearing-end"}
        />
      );
    });
    expect(DateInput).toHaveBeenCalledTimes(2);
  });
});
