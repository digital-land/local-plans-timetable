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
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

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
  // errors: ValidationErrorItem[];
  // validate: <T>(schema: ObjectSchema<T>, value: T) => void;
  // onContinue: () => void;
  // onBack: () => void;
}>({
  developmentPlan: DEFAULT_DEVELOPMENT_PLAN,
  timetableEvents: DEFAULT_TIMETABLE_EVENTS,
  updateTimetableEvent: () => {
    throw new Error("no provider");
  },
  updateDevelopmentPlan: () => {
    throw new Error("no provider");
  },
  // errors: [],
  // validate: () => {
  //   throw new Error("no provider");
  // },
  // onContinue: () => {
  //   throw new Error("no provider");
  // },
  // onBack: () => {
  //   throw new Error("no provider");
  // },
});

export const FormProvider = (props: { children: ReactNode }) => {
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan>(
    DEFAULT_DEVELOPMENT_PLAN
  );

  const [timetableEvents, setTimetableEvents] = useState<
    DevelopmentPlanTimetable[]
  >(DEFAULT_TIMETABLE_EVENTS);

  // const [errors, setErrors] = useState<ValidationErrorItem[]>([]);

  // const { errors, validateDevelopmentPlanEventDates } = useValidation();

  const updateTimetableEvent = useCallback(
    (
      event: TimetableEventKey,
      key: TimetableEventEditableField,
      value: string
    ) => {
      // const eventToUpdate = timetableEvents.find(
      //   (e) => e.developmentPlanEvent === event
      // );

      //   if (!eventToUpdate) return console.error("event not found")

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

  // function validate<T>(schema: ObjectSchema<T>, value: T) {
  //   const validationResult = schema.validate(value);

  //   if (validationResult.error) {
  //     setErrors(validationResult.error.details);
  //   } else {
  //     navigate(formPages[currentPageIndex + 1]);
  //   }
  // }

  // const onContinue = useCallback(()=>{
  //   validate()

  // },[])
  // const onBack = useCallback(()=>{},[])

  return (
    <FormContext.Provider
      value={{
        developmentPlan,
        timetableEvents,
        updateTimetableEvent,
        updateDevelopmentPlan,
        // errors,
        // validate,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => useContext(FormContext);

// const useValidation
