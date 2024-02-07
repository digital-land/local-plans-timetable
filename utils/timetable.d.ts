declare const objectArrayToCSVString: (objArr: {
    [key: string]: unknown;
}[]) => string;
declare const loadCSV: (filepath: string) => Promise<string>;
declare const dateToDefaultLocalDateString: (date: Date) => string;
export { objectArrayToCSVString, loadCSV, dateToDefaultLocalDateString };
