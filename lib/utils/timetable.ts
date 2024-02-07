const objectArrayToCSVString = (
  objArr: { [key: string]: unknown }[],
): string => {
  const headLine = Object.keys(objArr[0]).join(",");

  const CSVRows = objArr.reduce(
    (array, timetableItem) => [
      ...array,
      Object.values(timetableItem).join(","),
    ],
    [headLine],
  );

  return CSVRows.join("\n");
};

const loadCSV = async (filepath: string) =>
  await fetch(filepath).then((res) => res.text());

const dateToDefaultLocalDateString = (date: Date) =>
  new Date(date).toLocaleDateString("en-uk", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

export { objectArrayToCSVString, loadCSV, dateToDefaultLocalDateString };
