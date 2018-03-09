//-------------------------CATEGORY MODEL-----------------------------//
'use strict';

const mongoose = require('mongoose');

//Category Schema
const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Name required',
        unique: true
    },
    description: {
        type: String,
        required: 'Description required'
    }
});

module.exports = mongoose.model('Category', categorySchema);