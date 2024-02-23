import * as Joi from "joi";

const maxDate = new Date(2099, 11);
const minDate = new Date(2000, 0);

export const developmentPlanSchema = Joi.object({
  name: Joi.string().max(100,).messages({
    "string.max": `Title must be less must be less than or equal to 100 characters long`,
    "string.empty": "Title is not allowed to be empty"
  }),
  description: Joi.string().allow("").max(400).messages({
    "string.max": `Description must be less must be less than or equal to 400 characters long`,
    "string.empty": `Description is not allowed to be empty`,
  }),
});

export const developmentPlanEventSchema = Joi.object({
  reference: Joi.string(),
  name: Joi.string().allow(""),
  developmentPlan: Joi.string().allow(""),
  developmentPlanEvent: Joi.string(),
  eventDate: Joi.date()
    .iso()
    .min(minDate)
    .max(maxDate)
    .messages({
      "date.format": `Date must be a real date`,
      "date.min": `Date must be after ${minDate.toISOString().split("T")[0]}`,
      "date.max": `Date must be before ${maxDate.toISOString().split("T")[0]}`,
    }),
  notes: Joi.string().allow(""),
  organisation: Joi.string().allow(""),
  entryDate: Joi.string().allow(""),
  startDate: Joi.string().allow(""),
  endDate: Joi.string().allow(""),
});
