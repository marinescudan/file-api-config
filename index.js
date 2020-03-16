/** Import config
 * Node-config organizes hierarchical configurations for your app deployments.
 * https://www.npmjs.com/package/config
 * */
const config = require('config');


/**
 * Import mongoose
 * MongoDB object modeling designed to work in an asynchronous environment.
 * https://mongoosejs.com
 * https://github.com/Automattic/mongoose
 * */
const mongoose = require("mongoose");

/** Import morgan
 * Morgan HTTP request logger middleware for node.js.
 * https://www.npmjs.com/package/morgan
 * */
const morgan = require('morgan');


/** Import joi
 * Object schema description language and validator for JavaScript objects.
 * https://www.npmjs.com/package/joi
 * */
const Joi =  require('joi');


/** Import express
 * Fast, unopinionated, minimalist web framework for node.
 * https://www.npmjs.com/package/express
 * */
const express = require('express');


/** Import helmet
 * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!.
 * https://www.npmjs.com/package/helmet
 * */
const helmet = require('helmet');

/**
 * Startup - debug module
 * Set DEBUG variable with
 * >set DEBUG="app:debugStart, app:debugAPI, app:debugDB, app:debugConfig"
 * in Windows Terminal.
 * */
const debug = require('debug')('app:debugStart');
const debugConfig = require('debug')('app:debugConfig');
const debugAPI = require('debug')('app:debugAPI');
const debugDB = require('debug')('app:debugDB');


/* Import routes */
const itemRoute = require('./routes/item');
const indexRoute = require('./routes/index');

/* Import middleware */
const authenticator = require("./middleware/authenticator");
const _reqmodler = require("./middleware/_reqmodler");

/* Instanciate express app */
const app = express();


/* Templating Engine */
app.set('view engine', 'pug');
app.set('views', './views');

/** Inject middleware
 * */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(helmet());
app.use(authenticator);
app.use(_reqmodler);

/* Inject pages */
app.use('/view/home', indexRoute);

const {types} = require("./models/index");
for (let name in types) {
  /* Inject view model routes */
  app.use(types[name].viewRoute, itemRoute);
  /* Inject api model routes */
  app.use(types[name].apiRoute, itemRoute);
}

// Inject Morgan in development environment
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

/* Print Configuration */
debugConfig('Application Name: ' + config.get('name'));
debugConfig('Mail Server: ' + config.get('mail.host'));

/** Change NODE_ENV with comand in Windows Terminal: set app_password=1234 */
debugConfig('Mail Password: ' + config.get('mail.password'));

// DB work...
debugDB('Connected to the database...');

// Connect to the database
mongoose.connect("mongodb://localhost/o_o")
  .then(() => { console.log("Connected to MongoDB o_o ..."); })
  .catch(err => console.error("Could not connect to MongoBD", err));


// Set procces.env.port value
const port = process.env.PORT || 4000;
app.listen(port, () => { debug(`Listen to port ${port}`); });
