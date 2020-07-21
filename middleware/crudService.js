const { Router } = require('@awaitjs/express');
const StatusCode = require('http-status-codes');

module.exports = (dbService) => {
  const router = Router();

  router.getAsync('', async (request, response) => {
    response.json(await dbService.findMany(request.query));
  });

  router.postAsync('/test', async (request, response) => {
    await dbService.create(request.body);
    response.sendStatus(StatusCode.CREATED);
  });

  return router;
};
