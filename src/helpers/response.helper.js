const returnMessage = (res, status, message,
  data = undefined, token = undefined) => res.status(status).send({
  status, message, data, token,
});

export default returnMessage;
