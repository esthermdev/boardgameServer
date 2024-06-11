const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const passport = require('passport');
require('dotenv').config();

const boardgameRouter = require('../routes/boardgameRouter');
const userRouter = require('../routes/users');

const app = express();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200
}

const port = process.env.PORT || 8000;
const httpsPort = 8443;

// Middleware
app.use(cors(corsOptions));
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Routes
app.use('/api/boardgames', boardgameRouter);
app.use('/api/users', userRouter);


// HTTP server to redirect to HTTPS
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url });
    res.end();
});

httpServer.listen(port, () => {
    console.log(`HTTP Server is running on port ${port}`);
});

// HTTPS server
const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8');
const certificate = fs.readFileSync(path.join(__dirname, 'certificate.crt'), 'utf-8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server is running on port ${httpsPort}`);
});
