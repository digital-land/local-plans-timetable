import Joi from "joi";

const maxDate = new Date(2099, 11);
const minDate = new Date(2000, 0);

export const startDateSchema = Joi.date()
  .iso()
  .allow("")
  .min(minDate)
  .max(maxDate)
  .messages({
    "date.format": `Date must be a real date`,
    "date.min": `Date must be after ${minDate.toISOString().split("T")[0]}`,
    "date.max": `Date must be before ${maxDate.toISOString().split("T")[0]}`,
  });

export const endDateSchema = Joi.date()
  .iso()
  .allow("")
  .min(Joi.ref("startDate"))
  .max(maxDate)
  .messages({
    "date.format": `Date must be a real date`,
    "date.min": `The end date must be the same as or after the start date`,
    "date.max": `Date must be before ${maxDate.toISOString().split("T")[0]}`,
  });

export const stageSchema = Joi.object({
  startDate: startDateSchema,
  endDate: endDateSchema,
  notes: Joi.string().allow("").max(100).messages({
    "string.max": `Notes must be less than or equal to 100 characters long`,
  }),
});
