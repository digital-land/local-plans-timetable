import { v4 as uuidv4 } from "uuid";

import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
import {
  getStageProgress,
  resolveDevelopmentPlanCSV,
  resolveTimetableEventsCSV,
} from "./timetable";
import { TimetableEventKey, getFormattedDate } from "../constants";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

const currentDate = getFormattedDate();

interface EventsTestCase {
  name: string;
  currentData: DevelopmentPlanTimetable[];
  loadedData: DevelopmentPlanTimetable[] | null;
  expectedCSV: string;
}

const eventsTestCases: EventsTestCase[] = [
  {
    name: "no loaded events",
    currentData: [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.ExaminationHearingStart,
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    loadedData: null,
    expectedCSV:
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\r\n" +
      "1,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,\r\n" +
      "2,name,development-plan,examination-hearing-start,2023-01-02,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,",
  },
  {
    name: "loaded events with no changes",
    currentData: [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.ExaminationHearingStart,
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    loadedData: [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.ExaminationHearingStart,
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    expectedCSV:
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\r\n" +
      "1,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,\r\n" +
      "2,name,development-plan,examination-hearing-start,2023-01-02,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,",
  },
  {
    name: "loaded events with changes",
    currentData: [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.ExaminationHearingStart,
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    loadedData: [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.ExaminationHearingStart,
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    expectedCSV:
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\r\n" +
      "1,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,\r\n" +
      `2,name,development-plan,examination-hearing-start,2023-01-03,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,${currentDate}\r\n` +
      `3,name,development-plan,examination-hearing-start,2023-01-02,,organisation,${currentDate},${currentDate},`,
  },
  {
    name: "loaded events with changes and previously invalidated row",
    currentData: [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2022-12-20T00:00:00.000Z",
        startDate: "2022-12-20T00:00:00.000Z",
        endDate: "2023-01-01",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
      {
        reference: "3",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.ExaminationHearingStart,
        eventDate: "2023-01-02",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    loadedData: [
      {
        reference: "1",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2022-12-20T00:00:00.000Z",
        startDate: "2022-12-20T00:00:00.000Z",
        endDate: "2023-01-01",
      },
      {
        reference: "2",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.PublicConsultationStart,
        eventDate: "2023-01-01",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
      {
        reference: "3",
        name: "name",
        developmentPlan: "development-plan",
        developmentPlanEvent: TimetableEventKey.ExaminationHearingStart,
        eventDate: "2023-01-03",
        notes: "",
        organisation: "organisation",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    expectedCSV:
      "reference,name,developmentPlan,developmentPlanEvent,eventDate,notes,organisation,entryDate,startDate,endDate\r\n" +
      "1,name,development-plan,public-consultation-start,2023-01-03,,organisation,2022-12-20T00:00:00.000Z,2022-12-20T00:00:00.000Z,2023-01-01\r\n" +
      "2,name,development-plan,public-consultation-start,2023-01-01,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,\r\n" +
      `3,name,development-plan,examination-hearing-start,2023-01-03,,organisation,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,${currentDate}\r\n` +
      `4,name,development-plan,examination-hearing-start,2023-01-02,,organisation,${currentDate},${currentDate},`,
  },
];

interface PlanTestCase {
  name: string;
  currentData: DevelopmentPlan;
  loadedData: DevelopmentPlan[] | null;
  expectedCSV: string;
}

const planTestCases: PlanTestCase[] = [
  {
    name: "no loaded plan",
    currentData: {
      reference: "1",
      name: "name",
      description: "description",
      developmentPlanType: "type",
      periodStartDate: "2023-01-01",
      periodEndDate: "2023-01-02",
      developmentPlanGeography: "geography",
      documentationUrl: "url",
      organisations: "organisations",
      entryDate: "2023-01-01T00:00:00.000Z",
      startDate: "2023-01-01T00:00:00.000Z",
      endDate: "",
    },
    loadedData: null,
    expectedCSV:
      "reference,name,description,developmentPlanType,periodStartDate,periodEndDate,developmentPlanGeography,documentationUrl,organisations,entryDate,startDate,endDate\r\n" +
      "1,name,description,type,2023-01-01,2023-01-02,geography,url,organisations,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,",
  },
  {
    name: "loaded plan with no changes",
    currentData: {
      reference: "1",
      name: "name",
      description: "description",
      developmentPlanType: "type",
      periodStartDate: "2023-01-01",
      periodEndDate: "2023-01-02",
      developmentPlanGeography: "geography",
      documentationUrl: "url",
      organisations: "organisations",
      entryDate: "2023-01-01T00:00:00.000Z",
      startDate: "2023-01-01T00:00:00.000Z",
      endDate: "",
    },
    loadedData: [
      {
        reference: "1",
        name: "name",
        description: "description",
        developmentPlanType: "type",
        periodStartDate: "2023-01-01",
        periodEndDate: "2023-01-02",
        developmentPlanGeography: "geography",
        documentationUrl: "url",
        organisations: "organisations",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    expectedCSV:
      "reference,name,description,developmentPlanType,periodStartDate,periodEndDate,developmentPlanGeography,documentationUrl,organisations,entryDate,startDate,endDate\r\n" +
      "1,name,description,type,2023-01-01,2023-01-02,geography,url,organisations,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,",
  },
  {
    name: "loaded plan with changes",
    currentData: {
      reference: "1",
      name: "name",
      description: "description",
      developmentPlanType: "type",
      periodStartDate: "2023-01-01",
      periodEndDate: "2023-01-02",
      developmentPlanGeography: "geography",
      documentationUrl: "url",
      organisations: "new organisations",
      entryDate: "2023-01-01T00:00:00.000Z",
      startDate: "2023-01-01T00:00:00.000Z",
      endDate: "",
    },
    loadedData: [
      {
        reference: "1",
        name: "name",
        description: "description",
        developmentPlanType: "type",
        periodStartDate: "2023-01-01",
        periodEndDate: "2023-01-02",
        developmentPlanGeography: "geography",
        documentationUrl: "url",
        organisations: "organisations",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "",
      },
    ],
    expectedCSV:
      "reference,name,description,developmentPlanType,periodStartDate,periodEndDate,developmentPlanGeography,documentationUrl,organisations,entryDate,startDate,endDate\r\n" +
      `1,name,description,type,2023-01-01,2023-01-02,geography,url,organisations,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,${currentDate}\r\n` +
      `1,name,description,type,2023-01-01,2023-01-02,geography,url,new organisations,${currentDate},${currentDate},`,
  },
  {
    name: "loaded plan with changes and previously invalidated row",
    currentData: {
      reference: "2",
      name: "name",
      description: "description",
      developmentPlanType: "type",
      periodStartDate: "2023-01-01",
      periodEndDate: "2023-01-02",
      developmentPlanGeography: "geography",
      documentationUrl: "url",
      organisations: "new organisations",
      entryDate: "2023-01-01T00:00:00.000Z",
      startDate: "2023-01-01T00:00:00.000Z",
      endDate: "",
    },
    loadedData: [
      {
        reference: "1",
        name: "name",
        description: "description",
        developmentPlanType: "type",
        periodStartDate: "2023-01-01",
        periodEndDate: "2023-01-02",
        developmentPlanGeography: "geography",
        documentationUrl: "url",
        organisations: "old organisations",
        entryDate: "2023-01-01T00:00:00.000Z",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "2023-02-03",
      },
      {
        reference: "2",
        name: "name",
        description: "description",
        developmentPlanType: "type",
        periodStartDate: "2023-01-01",
        periodEndDate: "2023-01-02",
        developmentPlanGeography: "geography",
        documentationUrl: "url",
        organisations: "organisations",
        entryDate: "2023-02-03T00:00:00.000Z",
        startDate: "2023-02-03T00:00:00.000Z",
        endDate: "",
      },
    ],
    expectedCSV:
      "reference,name,description,developmentPlanType,periodStartDate,periodEndDate,developmentPlanGeography,documentationUrl,organisations,entryDate,startDate,endDate\r\n" +
      "1,name,description,type,2023-01-01,2023-01-02,geography,url,old organisations,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z,2023-02-03\r\n" +
      `2,name,description,type,2023-01-01,2023-01-02,geography,url,organisations,2023-02-03T00:00:00.000Z,2023-02-03T00:00:00.000Z,${currentDate}\r\n` +
      `2,name,description,type,2023-01-01,2023-01-02,geography,url,new organisations,${currentDate},${currentDate},`,
  },
];

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date(currentDate));
});

describe("resolveTimetableEventsCSV", () => {
  test.each(eventsTestCases)("returns the correct CSV - $name", (testCase) => {
    (uuidv4 as unknown as jest.SpyInstance).mockImplementation(
      () => `${(testCase.loadedData?.length ?? 0) + 1}`
    );

    const csv = resolveTimetableEventsCSV(
      testCase.currentData,
      testCase.loadedData
    );

    expect(csv).toBe(testCase.expectedCSV);
  });
});

describe("resolveDevelopmentPlanCSV", () => {
  test.each(planTestCases)("returns the correct CSV - $name", (testCase) => {
    (uuidv4 as unknown as jest.SpyInstance).mockImplementation(
      () => `${(testCase.loadedData?.length ?? 0) + 1}`
    );
    const csv = resolveDevelopmentPlanCSV(
      testCase.currentData,
      testCase.loadedData
    );

    expect(csv).toBe(testCase.expectedCSV);
  });
});

interface StageProgressTestCase {
  lastUpdatedDate: string;
  startDate: string;
  endDate?: string;
  expectedProgress: string;
}

const stageProgressTestCases: StageProgressTestCase[] = [
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-03-02",
    expectedProgress: "NOT STARTED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-03",
    expectedProgress: "NOT STARTED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-01-02",
    expectedProgress: "FINISHED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-01",
    expectedProgress: "FINISHED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-03",
    endDate: "2024-06",
    expectedProgress: "NOT STARTED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-01",
    endDate: "2024-06",
    expectedProgress: "IN PROGRESS",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2023-11",
    endDate: "2024-01",
    expectedProgress: "FINISHED",
  },
];

describe("getStageProgress", () => {
  test.each(stageProgressTestCases)(
    "returns the correct progress status ($expectedProgress)",
    ({ lastUpdatedDate, startDate, endDate, expectedProgress }) => {
      const progress = getStageProgress(lastUpdatedDate, startDate, endDate);

      expect(progress).toBe(expectedProgress);
    }
  );
});
