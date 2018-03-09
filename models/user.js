//-------------------------USERS MODEL-----------------------------//
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User Schema
var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: 'Email required',
        unique: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: 'Password required'
    }
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, res) => {
    User.findById(id, res);
}

module.exports.getUserByEmail = (email, res) => {
    User.findOne({email:email}, res);
}

module.exports.createUser = (user, res) => {
    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(user.password, salt, (err, hash)=> {
            if(err) throw err;
            user.password = hash;
            user.save(res);
        });
    });
}

module.exports.comparePassword = (pass, hash, res) => {
    bcrypt.compare(pass, hash, (err, isMatch)=> {
        if(err) throw err;
        res(null, isMatch);
    });
}