import {
  DEFAULT_DEVELOPMENT_PLAN,
  DEFAULT_TIMETABLE_EVENTS,
  TimetableEventKey,
} from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useState,
} from "react";

type TimetableEventEditableField = keyof Pick<
  DevelopmentPlanTimetable,
  "eventDate" | "notes"
>;

const contextDefaultFunction = () => {
  throw new Error("no provider");
};

export const FormContext = createContext<{
  developmentPlan: DevelopmentPlan;
  timetableEvents: DevelopmentPlanTimetable[];
  loadedDevelopmentPlan: DevelopmentPlan[] | null;
  loadedTimetableEvents: DevelopmentPlanTimetable[] | null;
  userFlow: string | null;
  updateTimetableEvent: (
    event: TimetableEventKey,
    key: TimetableEventEditableField,
    value: string
  ) => void;
  updateDevelopmentPlan: (key: keyof DevelopmentPlan, value: string) => void;
  setDevelopmentPlan: Dispatch<React.SetStateAction<DevelopmentPlan>>;
  setLoadedDevelopmentPlan: Dispatch<
    React.SetStateAction<DevelopmentPlan[] | null>
  >;
  setTimetableEvents: Dispatch<
    React.SetStateAction<DevelopmentPlanTimetable[]>
  >;
  setLoadedTimetableEvents: Dispatch<
    React.SetStateAction<DevelopmentPlanTimetable[] | null>
  >;
  setUserFlow: Dispatch<React.SetStateAction<string | null>>;
}>({
  developmentPlan: DEFAULT_DEVELOPMENT_PLAN,
  timetableEvents: DEFAULT_TIMETABLE_EVENTS,
  loadedDevelopmentPlan: null,
  loadedTimetableEvents: null,
  userFlow: null,
  updateTimetableEvent: contextDefaultFunction,
  updateDevelopmentPlan: contextDefaultFunction,
  setDevelopmentPlan: contextDefaultFunction,
  setLoadedDevelopmentPlan: contextDefaultFunction,
  setTimetableEvents: contextDefaultFunction,
  setLoadedTimetableEvents: contextDefaultFunction,
  setUserFlow: contextDefaultFunction,
});

export const FormProvider = (props: { children: ReactNode }) => {
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );

  const [loadedDevelopmentPlan, setLoadedDevelopmentPlan] = useState<
    DevelopmentPlan[] | null
  >(null);

  const [timetableEvents, setTimetableEvents] = useState<
    DevelopmentPlanTimetable[]
  >(DEFAULT_TIMETABLE_EVENTS);

  const [loadedTimetableEvents, setLoadedTimetableEvents] = useState<
    DevelopmentPlanTimetable[] | null
  >(null);

  const [userFlow, setUserFlow] = useState<string | null>(null);

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
        userFlow,
        setUserFlow,
        updateTimetableEvent,
        updateDevelopmentPlan,
        loadedDevelopmentPlan,
        loadedTimetableEvents,
        setLoadedDevelopmentPlan,
        setLoadedTimetableEvents,
        setDevelopmentPlan,
        setTimetableEvents,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
