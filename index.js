require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users')
const connectionUri = process.env.MONGO_LOCAL_CONN_URL;
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(connectionUri, { useNewUrlParser: true })
    .then(console.log('Connected to the db'))
    .catch(() => {
        console.log('Error connecting to the db');
    });

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use('/api/v1', userRoutes);

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
