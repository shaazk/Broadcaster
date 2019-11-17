/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import { incidents } from '../db/data';
import { Incident } from '../model/incident.model';
// Validation

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
    status: Joi.string()
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
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }
    const userIncident = new Incident(
      incidents.length + 1,
      req.body.createdOn,
      req.user.userId,
      req.body.title,
      req.body.type,
      req.body.location,
      req.body.status,
      req.body.images,
      req.body.videos,
      req.body.comment,
    );
    incidents.push(userIncident);
    return res.status(201).send({
      status: 201,
      data: {
        id: userIncident.incidentId,
        message: `Created ${userIncident.type} record`,
      },
    });
  },
  updateComment: (req, res) => {
    if (req.user.role === 'citizen') {
      const index = incidents.findIndex((item) => item.incidentId.toString() === req.params.incidentId);
      if (index > -1) {
        if (incidents[index].status != 'pending') {
          return res.status(404).json({
            status: 404,
            data: {
              message: 'You are not allowed to update this incident',
            },
          });
        }

        incidents[index].comment = req.body.comment;
        return res.status(200).json({
          status: 200,
          data: {
            message: 'Updated red-flag record’s comment',
          },
        });
      }
      return res.status(404).json({
        status: 404,
        data: {
          message: 'Incident not found',
        },
      });
    }
    return res.status(401).json({
      status: 401,
      data: {
        message: 'Unauthorised access',
      },
    });
  },
  updateLocation: (req, res) => {
    if (req.user.role === 'citizen') {
      const index = incidents.findIndex((item) => item.incidentId.toString() === req.params.incidentId);
      if (index > -1) {
        if (incidents[index].status != 'pending') {
          return res.status(404).json({
            status: 404,
            data: {
              message: 'You are not allowed to update this incident',
            },
          });
        }

        incidents[index].location = req.body.location;
        return res.status(200).json({
          status: 200,
          data: {
            message: 'Updated red-flag record’s location',
          },
        });
      }
      return res.status(404).json({
        status: 404,
        data: {
          message: 'Incident not found',
        },
      });
    }
    return res.status(401).json({
      status: 401,
      data: {
        message: 'Unauthorised access',
      },
    });
  },
  getAllRedflags: (req, res) => {
    const redflags = incidents.filter((user) => user.type === 'redflag');
    return res.status(200).send({
      status: 200,
      data: redflags,
    });
  },
  getSpecificRedflag: (req, res) => {
    const redflag = incidents.find((item) => item.incidentId.toString() === req.params.incidentId);
    if (!redflag || redflag.type !== 'redflag') {
      return res.status(404).send({
        success: false,
        message: 'The red-flag does not exist, check your ID',
      });
    }
    return res.status(200).send({
      success: true,
      details: redflag,
    });
  },
  deleteRedflag: (req, res) => {
    const deleteRedFlag = incidents.findIndex((item) => item.incidentId.toString() === req.params.incidentId);
    if (deleteRedFlag > -1) {
      if (incidents[deleteRedFlag].status != 'pending') {
        return res.status(404).json({
          status: 404,
          data: {
            message: 'You are not allowed to update this incident',
          },
        });
      }

      incidents.splice(deleteRedFlag, 1);
      return res.status(200).send({
        status: 200,
        data: {
          message: 'Red-flag successfully deleted',
        }
      });
    }
    return 0;
  },

};
