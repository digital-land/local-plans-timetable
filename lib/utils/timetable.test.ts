import { v4 as uuidv4 } from "uuid";

import { DevelopmentPlanTimetable } from "../types/timetable";
import { resolveTimetableEventsCSV } from "./timetable";
import { getFormattedDate } from "../constants";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("resolveTimetableEventsCSV", () => {
  test("returns the correct CSV if there are no loaded events", () => {
    const timetableEvents: DevelopmentPlanTimetable[] = [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "examination-hearing-start",
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
    ];

    const result = resolveTimetableEventsCSV(timetableEvents, null);

    expect(result).toBe(
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\n" +
        "1,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01,2023-01-01,\n" +
        "2,name,development-plan,examination-hearing-start,2023-01-02,,organisation,2023-01-01,2023-01-01,"
    );
  });

  test("returns the correct CSV string if there are no changes", () => {
    const timetableEvents: DevelopmentPlanTimetable[] = [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "examination-hearing-start",
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
    ];
    const loadedTimetableEvents: DevelopmentPlanTimetable[] = [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "examination-hearing-start",
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
    ];

    const result = resolveTimetableEventsCSV(
      timetableEvents,
      loadedTimetableEvents
    );

    expect(result).toBe(
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\n" +
        "1,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01,2023-01-01,\n" +
        "2,name,development-plan,examination-hearing-start,2023-01-02,,organisation,2023-01-01,2023-01-01,"
    );
  });

  test("returns the correct CSV string if there are changes", () => {
    (uuidv4 as unknown as jest.SpyInstance).mockImplementation(() => "3");
    const timetableEvents: DevelopmentPlanTimetable[] = [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "examination-hearing-start",
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
    ];
    const loadedTimetableEvents: DevelopmentPlanTimetable[] = [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "examination-hearing-start",
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
    ];

    const result = resolveTimetableEventsCSV(
      timetableEvents,
      loadedTimetableEvents
    );

    const currentDate = getFormattedDate();
    expect(result).toBe(
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\n" +
        "1,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01,2023-01-01,\n" +
        `2,name,development-plan,examination-hearing-start,2023-01-03,,organisation,2023-01-01,2023-01-01,${currentDate}\n` +
        `3,name,development-plan,examination-hearing-start,2023-01-02,,organisation,${currentDate},${currentDate},`
    );
  });

  test("returns the correct CSV string if there are changes and previously invalidated rows", () => {
    (uuidv4 as unknown as jest.SpyInstance).mockImplementation(() => "4");
    const timetableEvents: DevelopmentPlanTimetable[] = [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2022-12-20",
        startDate: "2022-12-20",
        endDate: "2023-01-01",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
      {
        reference: "3",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "examination-hearing-start",
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
    ];
    const loadedTimetableEvents: DevelopmentPlanTimetable[] = [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2022-12-20",
        startDate: "2022-12-20",
        endDate: "2023-01-01",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "public-consultation-start",
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
      {
        reference: "3",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: "examination-hearing-start",
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01",
        startDate: "2023-01-01",
        endDate: "",
      },
    ];

    const result = resolveTimetableEventsCSV(
      timetableEvents,
      loadedTimetableEvents
    );

    const currentDate = getFormattedDate();
    expect(result).toBe(
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\n" +
        "1,name,development-plan,public-consultation-start,2023-01-03,,organisation,2022-12-20,2022-12-20,2023-01-01\n" +
        "2,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01,2023-01-01,\n" +
        `3,name,development-plan,examination-hearing-start,2023-01-03,,organisation,2023-01-01,2023-01-01,${currentDate}\n` +
        `4,name,development-plan,examination-hearing-start,2023-01-02,,organisation,${currentDate},${currentDate},`
    );
  });
});
