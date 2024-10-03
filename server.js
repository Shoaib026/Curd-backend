const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configure CORS to accept requests from your React frontend running on localhost:3000
app.use(cors({
    origin: 'http://localhost:5173',  // Adjust the port if your frontend runs on a different port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Define allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],  // Define allowed headers
    credentials: true  // Optional if you're using cookies or sessions
}));

// Set secret key for JWT
app.set('secretKey', "I am a developer");

// Linking the Routers
const studroute = require('./Routers/Student');
app.use('/student', studroute);

// Middleware to validate JWT token
function validateUser(req, res, next) {
    const secretKey = req.app.get('secretKey');
    console.log('Secret Key:', secretKey); // Log the secret key to verify it is retrieved

    jwt.verify(req.headers['x-access-token'], secretKey, function(err, decoded) {
        if (err) {
            return res.json({ 'Status': "authenticate", message: err.message });
        } else {
            req.body.id = decoded.id;
            next();
        }
    });
}

// Add the userRouter
const userRouter = require('../node-react/Routers/userRouter');
app.use('/user', userRouter);

// Handle root endpoint
app.get("/", (req, res) => {
    res.send("hello node.js");
});

// Start the server
app.listen(4562, () => {
    console.log("localhost: is on port 4562");
});
