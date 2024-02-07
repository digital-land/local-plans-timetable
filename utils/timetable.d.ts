import { DevelopmentPlan, DevelopmentPlanTimetable } from "../types/timetable";
declare const objectArrayToCSVString: (objArr: {
    [key: string]: unknown;
}[]) => string;
declare const CSVStringToDevPlan: (csvString: string) => DevelopmentPlan;
declare const CSVStringToDevPlanTimetable: (csvString: string) => DevelopmentPlanTimetable[];
declare const loadCSV: (filepath: string) => Promise<string>;
declare const dateToDefaultLocalDateString: (date: Date) => string;
export { dateToDefaultLocalDateString, objectArrayToCSVString, loadCSV, CSVStringToDevPlan, CSVStringToDevPlanTimetable, };
