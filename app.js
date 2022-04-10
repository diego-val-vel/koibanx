const express = require('express')
const app = express()
// const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const basicAuth = require('./_helpers/basic-auth');
const errorHandler = require('./_helpers/error-handler');
const NODE_ENV = process.env.NODE_ENV || 'develop'; // || 'production';

// Environments vars.
dotenv.config({ path: `.env.${NODE_ENV}` });
const config = require('config');

// App.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

// Mongoose.
mongoose.Promise = Promise;
mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });

// Use basic HTTP auth to secure the api.
app.use(basicAuth);

// Api routes.
require('./utils/initializer').init();
app.use('/api', require('./routes/stores'));

// Global error handler.
app.use(errorHandler);

// Start the server.
app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = app;
