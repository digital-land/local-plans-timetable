import * as Joi from "joi";

export const developmentPlanEventSchema = Joi.object({
  reference: Joi.string(),
  name: Joi.string().allow(""),
  developmentPlan: Joi.string().allow(""),
  developmentPlanEvent: Joi.string(),
  eventDate: Joi.date().iso().min(new Date(2000, 0)).max(new Date(2100, 0)).allow(""),
  notes: Joi.string().allow(""),
  organisation: Joi.string().allow(""),
  entryDate: Joi.string().allow(""),
  startDate: Joi.string().allow(""),
  endDate: Joi.string().allow(""),
});
