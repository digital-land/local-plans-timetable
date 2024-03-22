import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { DateInput } from "@lib/gds-components";
import { TimetableEventKey } from "@lib/constants";
import { StagePage } from "./StagePage";

jest.mock("@lib/gds-components");
jest.mock("../stage-schema", () => ({ notesCharacterLimit: 100 }));

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
          startEventKey={TimetableEventKey.PlanSubmittedForExamination}
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
          startEventKey={TimetableEventKey.ExaminationHearingStart}
          endEventKey={TimetableEventKey.ExaminationHearingEnd}
        />
      );
    });
    expect(DateInput).toHaveBeenCalledTimes(2);
  });
});
