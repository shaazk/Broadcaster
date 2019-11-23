/* eslint-disable max-len */
const returnMessage = (res, status, message, token = undefined, data = undefined) => res.status(status).send({
  status, message, token, data,
});

export default returnMessage;
