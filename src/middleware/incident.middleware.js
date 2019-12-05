import Joi from '@hapi/joi';
import returnMessage from '../helpers/response.helper';

const schema = {
  createIncident: Joi.object({
    title: Joi.string()
      .min(3)
      .required(),
    type: Joi.string()
      .min(7)
      .required(),
    location: Joi.string()
      .min(3)
      .required(),
    images: Joi.required(),
    videos: Joi.required(),
    comment: Joi.string()
      .min(3)
      .required(),
  }),
};

const validateIncident = async (req, res, next) => {
  try {
    await schema.createIncident.validateAsync(req.body);
    next();
  } catch (error) {
    return returnMessage(res, 400, error.details[0].message);
  }
  return 0;
};

export default validateIncident;
