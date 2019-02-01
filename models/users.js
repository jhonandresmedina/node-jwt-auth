const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) {
        next();
    } else {
        bcrypt.hash(user.password, stage.saltingRounds)
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(error => {
                console.log('Error hashing password for user', user.name);
                next(error);
            });
    }
});

module.exports = mongoose.model('user', userSchema);