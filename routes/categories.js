//Middleware for Category Services
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');

//Handling GET request to /categories
router.get('/', (req, res, next) => {
    Category.find()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
});

//Handling POST request to /categories
router.post('/', (req, res, next) => {

    const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description
    });

    category.save()
            .then((result) => {
                console.log(result);
                res.status(201).json({
                    message: 'Handling POST request to /categories',
                    category: category
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
});

//Handling GET request to /categories with id
router.get('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId;
    Category.findById(id)
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No valid ID"
                });
            }
        })
        .catch(err => {
           res.status(500).json({
               error: err
           }); 
        });
});

//Handling UPDATE request to /categories with id
router.patch('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Category.update({_id: id}, {$set: updateOps})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
});

//Handling DELETE request to /categories with id
router.delete('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId;
    Category.remove({_id: id})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
});

module.exports = router;