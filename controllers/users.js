const bcrypt = require('bcrypt');

const { generateToken } = require('../utils');

const User = require('../models/users');

const add = (request, response) => {
    const { name, password } = request.body;
    const user = new User({ name, password });
    const result = {};

    user.save((err, user) => {
        if (!err) {
            result.status = 201;
            result.result = user;
        } else {
            result.status = 500;
            result.error = err;
        }
        response.status(result.status).send(result);
    });
};

const getAll = (req, res) => {
    User.find({}, (err, users) => {
        if (!err) {
            res.send(users);
        } else {
            response.status(500);
        }
    });
};

const login = (req, res) => {
    const { name, password } = req.body;

    User.findOne({ name }, (err, user) => {
        let result = {};
        let status = 200;

        if (!err && user) {
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        result.token = generateToken({ user: user.name });
                        result.status = status;
                        result.result = user;
                    } else {
                        status = 401;
                        result.status = status;
                        result.error = 'Authentication error';
                    }
                    res.status(status).send(result);
                }).catch(err => {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                });
        } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
};

module.exports = { add, login, getAll };