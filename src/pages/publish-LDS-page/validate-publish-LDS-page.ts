import Joi, { ValidationErrorItem } from "joi";

import { TimetableEventKey } from "@lib/constants";
import { startDateSchema } from "../event-schema";
import { ValidateFormParams } from "../FormPageHoc";

const schema = Joi.object({
  eventDate: startDateSchema,
});

export const validatePublishLDSEvent = ({
  timetableEvents,
}: ValidateFormParams<Record<string, never>>) => {
  const publishLDSEvent = timetableEvents.find(
    (e) =>
      e.developmentPlanEvent ===
      TimetableEventKey.LocalDevelopmentSchemePublished
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
        path: [
          TimetableEventKey.LocalDevelopmentSchemePublished,
          ...error.path,
        ],
      }))
    );
  }
  return errors;
};
