'use strict';

const request = require('request');
const adminService = 'http://localhost:3000/';
const eventService = 'http://localhost:3001/';

var getAdminServerOptions = function(endpoint, res) {
    return getServerOptions(adminService, endpoint, res);
};

var getEventServerOptions = function(endpoint, req) {
    return getServerOptions(eventService, endpoint, req);
};

var getServerOptions = function(service, endpoint, req) {
    return {
        uri: service + endpoint,
        body: JSON.stringify(req.body),
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
        },

    };
};

exports.login = function(req, res){
    console.log(req.session.id);
    request(getAdminServerOptions('login', req), function (error, response) {
        if (response.statusCode !== 200) {
            res.json(JSON.parse(response.body));
        } else {
            req.session.adminLoggedIn = true;
            res.json(JSON.parse(response.body));
        }
    });
};

exports.logout = function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.send('log out success');
            }
        });
    }
};

exports.createEvent = function(req, res) {
    request(getEventServerOptions("add-event", req), function(err, response) {
        res.json(JSON.parse(response.body));
    });
};

exports.editQuestion = function(req, res) {
    request(getEventServerOptions("update-question", req), function(err, response) {
        res.json(JSON.parse(response.body));
    });
};

exports.deleteQuestion = function(req, res) {
    request(getEventServerOptions("delete-question", req), function(err, response) {
        res.json(JSON.parse(response.body));
    });
};

exports.toggleGoodQuestion = function(req, res) {
    request(getEventServerOptions("toggle-good-question", req), function(err, response) {
        res.json(JSON.parse(response.body));
    });
};

exports.join = function(req, res) {
    request(getEventServerOptions("join", req), function(err, response) {
        if (response.statusCode !== 200) {
            res.json(JSON.parse(response.body));
        } else {
            req.session.urlId = JSON.parse(response.body).urlId;
            res.json(JSON.parse(response.body));
        }
    });
};

exports.addQuestion = function(req, res) {
    request(getEventServerOptions("add-question", req), function(err, response) {
        res.json(JSON.parse(response.body));
    });
};

exports.like = function (req, res) {
    req.body.sessionId = req.session.id;
    request(getEventServerOptions("like", req), function(err, response) {
        res.json(JSON.parse(response.body));
    });
};

exports.getEvents = function(req,res) {
    request(getEventServerOptions("get-events", req), function(err, response) {
        res.json(JSON.parse(response.body));
    });
};