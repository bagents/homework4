const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');

const user = require('./database/models/user');

const ErrorHandler = require('./middleware/errorHandler');

const app = Express();
app.use(BodyParser.json());

app.get('', (request, response) => {
  response.send('Hello');
});

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
