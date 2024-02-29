import Joi, { ValidationErrorItem } from "joi";
import { publishLDSEventKey } from "./PublishLDSPage";
import { eventDateSchema } from "../event-schema";
import { ValidateFormParams } from "../FormPageHoc";

const schema = Joi.object({
  eventDate: eventDateSchema,
});

export const validatePublishLDSEvent = ({
  timetableEvents,
}: ValidateFormParams<Record<string, never>>) => {
  const publishLDSEvent = timetableEvents.find(
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
