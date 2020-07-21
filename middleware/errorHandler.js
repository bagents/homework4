const StatusCodes = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
module.exports = (error, request, response, next) => {
  switch (error.name) {
    case 'RecordNotFound':
      response.sendStatus(StatusCodes.NOT_FOUND);
      break;
    case 'ValidationError':
      response.sendStatus(StatusCodes.BAD_REQUEST);
      break;
    default:
      response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      break;
  }
};
