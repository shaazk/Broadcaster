import Joi from '@hapi/joi';
import returnMessage from '../helpers/response.helper';

const schema = {
  createIncident: Joi.object({
    createdOn: Joi.date().required(),
    createdBy: Joi.number()
      .min(16)
      .required(),
    title: Joi.string()
      .min(3)
      .required(),
    type: Joi.string()
      .min(7)
      .required(),
    location: Joi.string()
      .min(3)
      .required(),
    images: Joi.array().required(),
    videos: Joi.array().required(),
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
    return returnMessage(res, 500, 'Internal server error');
  }
  return 0;
};

export default validateIncident;
