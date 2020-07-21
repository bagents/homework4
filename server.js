const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const Router = require('./middleware/crudService');

const DbService = require('./database/dbService');

const user = require('./database/models/user');

const ErrorHandler = require('./middleware/errorHandler');

const app = Express();
app.use(BodyParser.json());

const myModel = { model: user };

app.use(Router(new DbService(myModel)));

app.use(ErrorHandler);

(async () => {
  await Mongoose.connect('mongodb+srv://admin:admin@node.k4qvn.mongodb.net/mongodb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8080);
})();
