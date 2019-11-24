/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
import Joi from '@hapi/joi';
import returnMessage from '../helpers/response.helper';
import { incidents } from '../db/data';
import { Incident } from '../model/incident.model';

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

export const incidentController = {
  createIncident: async (req, res) => {
    try {
      await schema.createIncident.validateAsync(req.body);
    } catch (error) {
      return returnMessage(res, 400, error.details[0].message);
    }
    const userIncident = new Incident(
      incidents.length + 1,
      req.body.createdOn,
      req.user.userId,
      req.body.title,
      req.body.type,
      req.body.location,
      req.body.images,
      req.body.videos,
      req.body.comment,
    );
    incidents.push(userIncident);
    return returnMessage(res, 201, {
      id: userIncident.incidentId,
      message: `Created ${userIncident.type} record`,
    });
  },

  updateComment: (req, res) => {
    if (req.user.role === 'citizen') {
      const index = incidents.findIndex((item) => item.incidentId.toString() === req.params.incidentId);
      if (index > -1) {
        if (incidents[index].status != 'pending') {
          return returnMessage(res, 404, {
            message: 'You are not allowed to update this incident',
          });
        }

        incidents[index].comment = req.body.comment;
        return returnMessage(res, 200, {
          message: 'Updated red-flag record’s comment',
        });
      }
      return returnMessage(res, 404, {
        message: 'Incident not found',
      });
    }
    return returnMessage(res, 401, {
      message: 'Unauthorised access',
    });
  },
  updateLocation: (req, res) => {
    if (req.user.role === 'citizen') {
      const index = incidents.findIndex((item) => item.incidentId.toString() === req.params.incidentId);
      if (index > -1) {
        if (incidents[index].status != 'pending') {
          return returnMessage(res, 404, {
            message: 'You are not allowed to update this incident',
          });
        }

        incidents[index].location = req.body.location;
        return returnMessage(res, 200, {
          message: 'Updated red-flag record’s location',
        });
      }
      return returnMessage(res, 404, {
        message: 'Incident not found',
      });
    }
    return returnMessage(res, 401, {
      message: 'Unauthorised access',
    });
  },
  deleteIncident: (req, res) => {
    const deleteRedFlag = incidents.findIndex((item) => item.incidentId.toString() === req.params.incidentId);
    if (deleteRedFlag > -1) {
      if (incidents[deleteRedFlag].status != 'pending') {
        return returnMessage(res, 404, {
          message: 'You are not allowed to update this incident',
        });
      }

      incidents.splice(deleteRedFlag, 1);
      return returnMessage(res, 200, {
        message: 'Red-flag successfully deleted',
      });
    }
    return 0;
  },

};
