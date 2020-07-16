const { Router } = require('@awaitjs/express');

module.exports = (dbService) => {
  const router = Router();

  router.getAsync('', async (request, response) => {
    response.json(await dbService.findMany(request.query));
  });

  return router;
};
