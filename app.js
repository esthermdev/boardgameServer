const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const boardgameRouter = require('./routes/boardgameRouter');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/boardgames', boardgameRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
