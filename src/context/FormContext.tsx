import { ReactNode, createContext, useCallback, useState } from "react";
import {
  DEFAULT_DEVELOPMENT_PLAN,
  DEFAULT_TIMETABLE_EVENTS,
  TimetableEventKey,
} from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";

type TimetableEventEditableField = keyof Pick<
  DevelopmentPlanTimetable,
  "eventDate" | "notes"
>;

export const FormContext = createContext<{
  developmentPlan: DevelopmentPlan;
  timetableEvents: DevelopmentPlanTimetable[];
  updateTimetableEvent: (
    event: TimetableEventKey,
    key: TimetableEventEditableField,
    value: string
  ) => void;
  updateDevelopmentPlan: (key: keyof DevelopmentPlan, value: string) => void;
}>({
  developmentPlan: DEFAULT_DEVELOPMENT_PLAN,
  timetableEvents: DEFAULT_TIMETABLE_EVENTS,
  updateTimetableEvent: () => {
    throw new Error("no provider");
  },
  updateDevelopmentPlan: () => {
    throw new Error("no provider");
  },
});

export const FormProvider = (props: { children: ReactNode }) => {
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );

  const [timetableEvents, setTimetableEvents] = useState<
    DevelopmentPlanTimetable[]
  >(DEFAULT_TIMETABLE_EVENTS);

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

  return (
    <FormContext.Provider
      value={{
        developmentPlan,
        timetableEvents,
        updateTimetableEvent,
        updateDevelopmentPlan,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
