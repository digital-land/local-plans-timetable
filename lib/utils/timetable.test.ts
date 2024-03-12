import { v4 as uuidv4 } from "uuid";

import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
import {
  camelCaseToKebabCase,
  getStageProgress,
  kebabCaseToCamelCase,
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
      "development-plan,development-plan-event,end-date,entry-date,event-date,name,notes,organisation,reference,start-date\r\n" +
      "development-plan,public-consultation-start,,2023-01-01T00:00:00.000Z,2023-01-01,name,,organisation,1,2023-01-01T00:00:00.000Z\r\n" +
      "development-plan,examination-hearing-start,,2023-01-01T00:00:00.000Z,2023-01-02,name,,organisation,2,2023-01-01T00:00:00.000Z",
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
      "development-plan,development-plan-event,end-date,entry-date,event-date,name,notes,organisation,reference,start-date\r\n" +
      "development-plan,public-consultation-start,,2023-01-01T00:00:00.000Z,2023-01-01,name,,organisation,1,2023-01-01T00:00:00.000Z\r\n" +
      "development-plan,examination-hearing-start,,2023-01-01T00:00:00.000Z,2023-01-02,name,,organisation,2,2023-01-01T00:00:00.000Z",
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
      "development-plan,development-plan-event,end-date,entry-date,event-date,name,notes,organisation,reference,start-date\r\n" +
      "development-plan,public-consultation-start,,2023-01-01T00:00:00.000Z,2023-01-01,name,,organisation,1,2023-01-01T00:00:00.000Z\r\n" +
      `development-plan,examination-hearing-start,${currentDate},2023-01-01T00:00:00.000Z,2023-01-03,name,,organisation,2,2023-01-01T00:00:00.000Z\r\n` +
      `development-plan,examination-hearing-start,,${currentDate},2023-01-02,name,,organisation,3,${currentDate}`,
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
      "development-plan,development-plan-event,end-date,entry-date,event-date,name,notes,organisation,reference,start-date\r\n" +
      "development-plan,public-consultation-start,2023-01-01,2022-12-20T00:00:00.000Z,2023-01-03,name,,organisation,1,2022-12-20T00:00:00.000Z\r\n" +
      "development-plan,public-consultation-start,,2023-01-01T00:00:00.000Z,2023-01-01,name,,organisation,2,2023-01-01T00:00:00.000Z\r\n" +
      `development-plan,examination-hearing-start,${currentDate},2023-01-01T00:00:00.000Z,2023-01-03,name,,organisation,3,2023-01-01T00:00:00.000Z\r\n` +
      `development-plan,examination-hearing-start,,${currentDate},2023-01-02,name,,organisation,4,${currentDate}`,
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
      "description,development-plan-geography,development-plan-type,documentation-url,end-date,entry-date,name,organisations,period-end-date,period-start-date,reference,start-date\r\n" +
      "description,geography,type,url,,2023-01-01T00:00:00.000Z,name,organisations,2023-01-02,2023-01-01,1,2023-01-01T00:00:00.000Z",
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
      "description,development-plan-geography,development-plan-type,documentation-url,end-date,entry-date,name,organisations,period-end-date,period-start-date,reference,start-date\r\n" +
      "description,geography,type,url,,2023-01-01T00:00:00.000Z,name,organisations,2023-01-02,2023-01-01,1,2023-01-01T00:00:00.000Z",
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
      "description,development-plan-geography,development-plan-type,documentation-url,end-date,entry-date,name,organisations,period-end-date,period-start-date,reference,start-date\r\n" +
      `description,geography,type,url,${currentDate},2023-01-01T00:00:00.000Z,name,organisations,2023-01-02,2023-01-01,1,2023-01-01T00:00:00.000Z\r\n` +
      `description,geography,type,url,,${currentDate},name,new organisations,2023-01-02,2023-01-01,1,${currentDate}`,
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
      "description,development-plan-geography,development-plan-type,documentation-url,end-date,entry-date,name,organisations,period-end-date,period-start-date,reference,start-date\r\n" +
      "description,geography,type,url,2023-02-03,2023-01-01T00:00:00.000Z,name,old organisations,2023-01-02,2023-01-01,1,2023-01-01T00:00:00.000Z\r\n" +
      `description,geography,type,url,${currentDate},2023-02-03T00:00:00.000Z,name,organisations,2023-01-02,2023-01-01,2,2023-02-03T00:00:00.000Z\r\n` +
      `description,geography,type,url,,${currentDate},name,new organisations,2023-01-02,2023-01-01,2,${currentDate}`,
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
  // Start date only - With day
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-01-02",
    expectedProgress: "FINISHED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-02-07",
    expectedProgress: "FINISHED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-03-02",
    expectedProgress: "NOT STARTED",
  },
  // Start date only - Without day
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-01",
    expectedProgress: "FINISHED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-02",
    expectedProgress: "FINISHED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-03",
    expectedProgress: "NOT STARTED",
  },
  // Start and end events
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2023-12",
    endDate: "2024-01",
    expectedProgress: "FINISHED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-03",
    endDate: "2024-04",
    expectedProgress: "NOT STARTED",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-01",
    endDate: "2024-03",
    expectedProgress: "IN PROGRESS",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-02",
    endDate: "2024-03",
    expectedProgress: "IN PROGRESS",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-01",
    endDate: "2024-02",
    expectedProgress: "IN PROGRESS",
  },
  {
    lastUpdatedDate: "2024-02-07T09:03:53.514Z",
    startDate: "2024-02",
    endDate: "2024-02",
    expectedProgress: "IN PROGRESS",
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

describe("camelCaseToKebabCase", () => {
  test("returns kebab-case string", () => {
    const input = "camelCaseString";
    const expectedResult = "camel-case-string";

    expect(camelCaseToKebabCase(input)).toBe(expectedResult);
  });
});

describe("kebabCaseToCamelCase", () => {
  test("returns camelCase string", () => {
    const input = "kebab-case-string";
    const expectedResult = "kebabCaseString";

    expect(kebabCaseToCamelCase(input)).toBe(expectedResult);
  });
});
