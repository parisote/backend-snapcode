const express = require('express');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const router = require('./routes/routes');

const { setError } = require('./utils/utils');

const app = express();
app.set('port', process.env.PORT);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes/routes'));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  var allowedOrigins = ['http://localhost:4000'];
  app.use(
    cors({
      origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      methods: "GET, POST",
      credentials: true
    })
  );


app.use(express.urlencoded({limit: '500kb', extended: true}));

app.use('*', (_req, res, next) => {
  return next(setError(404,'Route not found'));
});

app.disable('x-powerd-by');

module.exports = app;