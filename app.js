const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '.env' });


mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology : true}, { useFindAndModify: false})
.then(() => console.log('Connected to MongoDB'))
.catch('error', (err) => {
  console.log("Couldn't connect to MongoDB", err.message);
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('We have a server running on PORT: ' + PORT);
  });
  
