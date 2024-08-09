const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

const boardgameRouter = require('../routes/boardgameRouter');
const scoresRouter = require('../routes/scoresRouter')
const userRouter = require('../routes/users');

const app = express();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200
}

const port = process.env.PORT || 8000;

// Middleware
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Routes
app.use('/api/boardgames', boardgameRouter);
app.use('/api/scores', scoresRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});