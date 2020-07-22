const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const Router = require('./middleware/crudService');
const ErrorHandler = require('./middleware/errorHandler');
const DbService = require('./database/dbService');
const user = require('./database/models/user');

const myModel = { model: user };
const port = 8080;

app.use(BodyParser.json());
app.use(Router(new DbService(myModel)));
app.use(ErrorHandler);

(async () => {
  await Mongoose.connect('mongodb+srv://admin:admin@node.k4qvn.mongodb.net/mongodb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  http.listen(port, () => {
    console.log(`listening on *:${port}`);
  });
})();
