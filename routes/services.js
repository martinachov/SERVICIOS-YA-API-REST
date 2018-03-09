//Middleware for Services
const express = require('express');
const router = express.Router();

//Handling incoming GET request to /services
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /services'
    });
});

//Handling POST request to /services
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST request to /services'
    });
});

//Handling GET request to /services with id
router.get('/:serviceId', (req, res, next) => {
    id = req.params.serviceId;
    res.status(200).json({
        message: 'Handling GET request to /services with id: ' + id
    });
});

//Handling UPDATE request to /services with id
router.patch('/:serviceId', (req, res, next) => {
    id = req.params.serviceId;
    res.status(200).json({
        message: 'Handling UPDATE request to /services with id: ' + id
    });
});

//Handling DELETE request to /services with id
router.delete('/:serviceId', (req, res, next) => {
    id = req.params.serviceId;
    res.status(200).json({
        message: 'Handling DELETE request to /services with id: ' + id
    });
});

module.exports = router;