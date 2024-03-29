import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";

import { v4 as uuidv4 } from "uuid";

import {
  DEFAULT_DEVELOPMENT_PLAN,
  StatusChangeEvent,
  TimetableEventKey,
  getDefaultTimetableEvent,
  getDefaultTimetableEvents,
  isStatusChangeEventKey,
} from "@lib/constants";
import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import { Journey } from "src/routes/routes";

type TimetableEventEditableField = keyof Pick<
  DevelopmentPlanTimetable,
  "eventDate" | "notes"
>;

const contextDefaultFunction = () => {
  throw new Error("no provider");
};

export interface FormContextValues {
  developmentPlan: DevelopmentPlan;
  timetableEvents: DevelopmentPlanTimetable[];
  loadedDevelopmentPlan: DevelopmentPlan[] | null;
  loadedTimetableEvents: DevelopmentPlanTimetable[] | null;
  userFlow: Journey | null;
  updateTimetableEvent: (
    event: TimetableEventKey,
    key: TimetableEventEditableField,
    value: string
  ) => void;
  updateDevelopmentPlan: (key: keyof DevelopmentPlan, value: string) => void;
  setDevelopmentPlan: Dispatch<SetStateAction<DevelopmentPlan>>;
  setLoadedDevelopmentPlan: Dispatch<SetStateAction<DevelopmentPlan[] | null>>;
  setTimetableEvents: Dispatch<SetStateAction<DevelopmentPlanTimetable[]>>;
  setLoadedTimetableEvents: (events: DevelopmentPlanTimetable[] | null) => void;
  setUserFlow: Dispatch<React.SetStateAction<Journey | null>>;
  statusChangeEvent: StatusChangeEvent | null;
  statusHasChanged: boolean | null;
  setStatusHasChanged: (statusHasChanged: boolean | null) => void;
  updateStatusChangeEvent: (
    key: keyof DevelopmentPlanTimetable,
    value: string
  ) => void;
  shouldUpdateDates: boolean | null;
  setShouldUpdateDates: Dispatch<SetStateAction<boolean | null>>;
}

export const FormContext = createContext<FormContextValues>({
  developmentPlan: DEFAULT_DEVELOPMENT_PLAN,
  timetableEvents: getDefaultTimetableEvents(""),
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
  statusHasChanged: null,
  setStatusHasChanged: contextDefaultFunction,
  statusChangeEvent: null,
  updateStatusChangeEvent: contextDefaultFunction,
  shouldUpdateDates: null,
  setShouldUpdateDates: contextDefaultFunction,
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
  >(getDefaultTimetableEvents(developmentPlan.reference));

  const [loadedTimetableEvents, setLoadedTimetableEvents] = useState<
    DevelopmentPlanTimetable[] | null
  >(null);

  const [userFlow, setUserFlow] = useState<Journey | null>(null);

  const [statusHasChanged, setStatusHasChanged] = useState<boolean | null>(
    null
  );

  const [statusChangeEvent, setStatusChangeEvent] =
    useState<StatusChangeEvent | null>(null);

  const [shouldUpdateDates, setShouldUpdateDates] = useState<boolean | null>(
    null
  );

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

  const updateStatusChangeEvent = useCallback(
    (key: keyof DevelopmentPlanTimetable, value: string) => {
      if (!statusChangeEvent) {
        throw new Error("status change event not found");
      }

      const updatedEvent = { ...statusChangeEvent, [key]: value };

      setStatusChangeEvent(updatedEvent);
    },
    [statusChangeEvent]
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

  const setLoadedEvents = useCallback(
    (events: DevelopmentPlanTimetable[] | null) => {
      setLoadedTimetableEvents(events);

      const currentStatusChangeEvent = events?.find(
        ({ developmentPlanEvent, endDate }) =>
          isStatusChangeEventKey(developmentPlanEvent) && !endDate
      );

      if (currentStatusChangeEvent) {
        setStatusHasChanged(true);
        setStatusChangeEvent(currentStatusChangeEvent as StatusChangeEvent);
      }
    },
    []
  );

  const setStatusChanged = useCallback(
    (statusChanged: boolean | null) => {
      setStatusHasChanged(statusChanged);
      if (statusChanged) {
        setStatusChangeEvent({
          ...getDefaultTimetableEvent(),
          developmentPlan: developmentPlan.reference,
          reference: uuidv4(),
        });
      } else {
        setStatusChangeEvent(null);
      }
    },
    [developmentPlan]
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
        setLoadedTimetableEvents: setLoadedEvents,
        setDevelopmentPlan,
        setTimetableEvents,
        statusHasChanged,
        setStatusHasChanged: setStatusChanged,
        statusChangeEvent,
        updateStatusChangeEvent,
        shouldUpdateDates,
        setShouldUpdateDates,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
