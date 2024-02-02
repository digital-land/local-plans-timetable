import { DevelopmentPlanTimetable, FormData } from "../types/timetable";
declare const formStateToDevelopmentPlanTimetables: (state: FormData) => DevelopmentPlanTimetable[];
declare const devPlanToCSVString: (timeTables: DevelopmentPlanTimetable[]) => string;
export { formStateToDevelopmentPlanTimetables, devPlanToCSVString };
