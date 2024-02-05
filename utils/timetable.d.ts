import { DevelopmentPlanTimetable, FormData } from "../types/timetable";
declare const formStateToDevelopmentPlanTimetables: (state: FormData) => DevelopmentPlanTimetable[];
declare const devPlanToCSVString: (timeTables: DevelopmentPlanTimetable[]) => string;
declare const loadCSV: (filepath: string) => Promise<string>;
declare const dateToDefaultLocalDateString: (date: Date) => string;
export { formStateToDevelopmentPlanTimetables, devPlanToCSVString, loadCSV, dateToDefaultLocalDateString, };
