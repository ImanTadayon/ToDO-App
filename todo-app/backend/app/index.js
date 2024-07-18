const express = require('express');
require('dotenv').config();

const UserRoutes = require('./routes/routes');

const app = express();
const cors = require('cors')



// middleware
const monitoringMiddleware = require('./middlewares/monitoring');

// // authorization
// const { authMiddleware } = require('./middlewares/auth');

//Error Handeling
const errHandler = require('./middlewares/errHandeling');



app.use(express.json());
app.use(monitoringMiddleware);
app.use(cors());



// #################    Test server    #################
app.get('/', (req, res) => {
    res.send('Server is running!');
});


// app.use(authMiddleware)
// #################    User requests    #################
app.use('/api/user', UserRoutes);



app.use(errHandler);


module.exports = app;

