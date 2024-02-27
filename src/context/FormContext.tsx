import { ReactNode, createContext, useCallback, useState } from "react";
import {
  DEFAULT_DEVELOPMENT_PLAN,
  DEFAULT_TIMETABLE_EVENTS,
  TimetableEventKey,
  developmentPlanTimetableEvents,
} from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { fromCSVString } from "@lib/utils/timetable";

type TimetableEventEditableField = keyof Pick<
  DevelopmentPlanTimetable,
  "eventDate" | "notes"
>;

const reader = new FileReader();

export const FormContext = createContext<{
  developmentPlan: DevelopmentPlan;
  timetableEvents: DevelopmentPlanTimetable[];
  updateTimetableEvent: (
    event: TimetableEventKey,
    key: TimetableEventEditableField,
    value: string
  ) => void;
  updateDevelopmentPlan: (key: keyof DevelopmentPlan, value: string) => void;
  handleDevelopmentPlanUpload: (file: File) => void;
  handleTimetableUpload: (file: File) => void;
}>({
  developmentPlan: DEFAULT_DEVELOPMENT_PLAN,
  timetableEvents: DEFAULT_TIMETABLE_EVENTS,
  updateTimetableEvent: () => {
    throw new Error("no provider");
  },
  updateDevelopmentPlan: () => {
    throw new Error("no provider");
  },
  handleDevelopmentPlanUpload: () => {
    throw new Error("no provider");
  },
  handleTimetableUpload: () => {
    throw new Error("no provider");
  },
});

export const FormProvider = (props: { children: ReactNode }) => {
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadedDevelopmentPlan, setLoadedDevelopmentPlan] = useState<
    DevelopmentPlan[] | null
  >(null);

  const [timetableEvents, setTimetableEvents] = useState<
    DevelopmentPlanTimetable[]
  >(DEFAULT_TIMETABLE_EVENTS);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadedTimetableEvents, setLoadedTimetableEvents] = useState<
    DevelopmentPlanTimetable[] | null
  >(null);

  const updateTimetableEvent = useCallback(
    (
      event: TimetableEventKey,
      key: TimetableEventEditableField,
      value: string
    ) => {
      setTimetableEvents((prev) =>
        prev.map((e) =>
          e.developmentPlanEvent === event ? { ...e, [key]: value } : e
        )
      );
    },
    []
  );

  const updateDevelopmentPlan = useCallback(
    (key: keyof DevelopmentPlan, value: string) => {
      setDevelopmentPlan((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleDevelopmentPlanUpload = useCallback((file: File) => {
    reader.onload = (event) => {
      const csvString = event.target?.result?.toString();

      if (csvString) {
        const developmentPlan = fromCSVString<DevelopmentPlan>(csvString);
        setLoadedDevelopmentPlan(developmentPlan);
        // This assumes the last row is the current row
        setDevelopmentPlan(developmentPlan.slice(-1)[0]);
      }
    };

    reader.readAsText(file);
  }, []);

  const handleTimetableUpload = useCallback((file: File) => {
    reader.onload = (event) => {
      const csvString = event.target?.result?.toString();

      if (csvString) {
        const loadedEvents = fromCSVString<DevelopmentPlanTimetable>(csvString);
        setLoadedTimetableEvents(loadedEvents);
        setTimetableEvents(
          loadedEvents
            // This assumes any row with an end date is invalid
            .filter((event) => !event.endDate)
            .sort(
              (a, b) =>
                developmentPlanTimetableEvents.findIndex(
                  (s) => s.key === a.developmentPlanEvent
                ) -
                developmentPlanTimetableEvents.findIndex(
                  (s) => s.key === b.developmentPlanEvent
                )
            )
        );
      }
    };

    reader.readAsText(file);
  }, []);

  return (
    <FormContext.Provider
      value={{
        developmentPlan,
        timetableEvents,
        updateTimetableEvent,
        updateDevelopmentPlan,
        handleDevelopmentPlanUpload,
        handleTimetableUpload,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
