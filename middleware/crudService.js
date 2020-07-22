const { Router } = require('@awaitjs/express');
const StatusCode = require('http-status-codes');
const Path = require('path');

module.exports = (dbService) => {
  const router = Router();

  router.getAsync('', async (request, response) => {
    const data = await dbService.findMany(request.query);
    response.sendFile(`${__dirname}/index.html`);
  });

  router.postAsync('/test', async (request, response) => {
    await dbService.create(request.body);
    response.sendStatus(StatusCode.CREATED);
  });

  return router;
};
