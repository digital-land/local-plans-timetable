import { DevelopmentPlan } from "../types/timetable";
declare const devPlanToCSVString: (timeTables: DevelopmentPlan) => string;
declare const loadCSV: (filepath: string) => Promise<string>;
declare const dateToDefaultLocalDateString: (date: Date) => string;
export { devPlanToCSVString, loadCSV, dateToDefaultLocalDateString, };
