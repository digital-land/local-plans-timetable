import {
  DevelopmentPlan,
  DevelopmentPlanTimetable,
} from "@lib/types/timetable";
import Joi, { ValidationErrorItem } from "joi";
import { publishLDSEventKey } from "./PublishLDSPage";
import { eventDateSchema } from "../event-date-schema";

const schema = Joi.object({
  eventDate: eventDateSchema,
});

export const validatePublishLDSEvent = (
  _developmentPlan: DevelopmentPlan,
  developmentPlanEvents: DevelopmentPlanTimetable[]
) => {
  const publishLDSEvent = developmentPlanEvents.find(
    (e) => e.developmentPlanEvent === publishLDSEventKey
  );

  if (!publishLDSEvent) {
    throw new Error("publish LDS event not found");
  }

  const errors: ValidationErrorItem[] = [];

  const validationResult = schema.validate({
    eventDate: publishLDSEvent.eventDate,
  });

  if (validationResult.error) {
    errors.push(
      ...validationResult.error.details.map((error) => ({
        ...error,
        path: [publishLDSEventKey, ...error.path],
      }))
    );
  }
  return errors;
};
