import { useCallback, useEffect, useState } from "react";
import csvToJson from "csvtojson";
import { dateToDefaultLocalDateString, loadCSV } from "../utils/timetable";
import { DevelopmentPlan } from "../types/timetable";

import "govuk-frontend/dist/govuk/govuk-frontend.min.css";

const DEFAULT_TIMETABLE_DATA: DevelopmentPlan = {
  reference: "",
  name: "",
  description: "",
  developmentPlanType: "",
  periodStartDate: new Date(),
  periodEndDate: new Date(),
  developmentPlanGeography: "",
  documentationUrl: "",
  adoptedDate: new Date(),
  organisations: [],
  entryDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  timetableEvents: [],
};

type VisualisationProps = {
  stagesFilepath: string;
  headersFilepath: string;
};

export const Visualisation = (props: VisualisationProps) => {
  const { stagesFilepath, headersFilepath } = props;
  const [timetableData, setTimetableData] = useState<DevelopmentPlan>(
    DEFAULT_TIMETABLE_DATA
  );
  const loadData = useCallback(async () => {
    const stagesData = await loadCSV(stagesFilepath);
    const events = await csvToJson().fromString(stagesData);

    const headersData = await loadCSV(headersFilepath);
    const headers = await csvToJson().fromString(headersData);

    const loadedData: DevelopmentPlan = {
      ...DEFAULT_TIMETABLE_DATA,
      ...headers[0],
      timetableEvents: events,
    };

    setTimetableData(loadedData);
  }, [headersFilepath, stagesFilepath]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <div>
        <h1 className="govuk-heading-xl" data-testid="form-title">
          {timetableData.name}
        </h1>
        <p className="govuk-body-l">{timetableData.description}</p>
      </div>
      <div className="govuk-body">
        <p>
          {`Adopted ${dateToDefaultLocalDateString(timetableData.adoptedDate)}`}
        </p>
        <p>
          {`Period Start: ${dateToDefaultLocalDateString(
            timetableData.periodStartDate
          )}`}
        </p>
        <p>
          {`Period End: ${dateToDefaultLocalDateString(
            timetableData.periodEndDate
          )}`}
        </p>
        <p>{`Plan Type: ${timetableData.developmentPlanType}`}</p>
        <p>{`Plan Geography: ${timetableData.developmentPlanGeography}`}</p>
        <p>{`Organisations: ${timetableData.organisations}`}</p>
        <p>
          {`Entry Date ${dateToDefaultLocalDateString(
            timetableData.entryDate
          )}`}
        </p>
        <p>
          {`Start Date: ${dateToDefaultLocalDateString(
            timetableData.startDate
          )}`}
        </p>
        <p>
          {`End Date: ${dateToDefaultLocalDateString(timetableData.endDate)}`}
        </p>
        {timetableData.documentationUrl && (
          <a href={timetableData.documentationUrl}>Documentation</a>
        )}
      </div>
      <hr />
      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--m">
          Development Plan Timetable
        </caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Event
            </th>
            <th scope="col" className="govuk-table__header">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {timetableData.timetableEvents.map((timetableEvent) => (
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {timetableEvent.developmentPlanEvent}
              </th>
              <td className="govuk-table__cell">{timetableEvent.eventDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
