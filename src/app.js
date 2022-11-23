const express = require('express');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const userRouter = require('./routes/user');
const pingRouter = require('./routes/ping');
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const trendingReouter = require('./routes/trending')
const chalk = require('chalk')
const log = require('loglevel')
const prefix = require('loglevel-plugin-prefix');
const rateLimit = require("express-rate-limit")

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

const app = express();
app.use(cors())
app.set('port', process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 999999999,
    message: "Exceeded 100 request in 12 hours",
    standardHEaders: true,
    legacyHeaders: false,
  })
)

/*
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
var allowedOrigins = ['http://localhost:4000'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET, POST",
    credentials: true
  })
);
app.use(express.urlencoded({ limit: '500kb', extended: true }));/*
*/

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//routes
app.use("/api/ping", pingRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/trending", trendingReouter);

app.use('*', (_req, res) => {
  res.status(404).send('Route not found');
});

//LOG//
prefix.reg(log);
log.enableAll();

prefix.apply(log, {
  format(level, name, timestamp) {
    return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
  },
});

prefix.apply(log.getLogger('critical'), {
  format(level, name, timestamp) {
    return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
  },
});
//LOG//

app.disable('x-powerd-by');

module.exports = app;