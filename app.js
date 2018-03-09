const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Import routes
const servicesRoutes = require('./routes/services');
const categoriesRoutes = require('./routes/categories');

//Connect to DB
mongoose.connect("mongodb://Servicios-Ya:" + 
                    process.env.MONGO_ATLAS_PW +
                    "@servicios-ya-shard-00-00-gpkhn.mongodb.net:27017,servicios-ya-shard-00-01-gpkhn.mongodb.net:27017,servicios-ya-shard-00-02-gpkhn.mongodb.net:27017/test?ssl=true&replicaSet=Servicios-Ya-shard-0&authSource=admin"
);


//Config Midleware to log with Morgan
app.use(morgan('dev'));

//Config Midleware for body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Config Midleware to CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

//Config Route wich should handle requests
app.use('/api/services', servicesRoutes);
app.use('/api/categories', categoriesRoutes);

//Errors handling
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});


module.exports = app;