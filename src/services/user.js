'use strict';

const request = require('request-promise');
const express = require('express');
const status = require('http-status');
const auth = require('../auth');

module.exports = function (userServices) {
    const userMicroService = `http://${userServices.userMicroService.host}:${userServices.userMicroService.port}/users`;
    const authMicroService = `http://${userServices.authMicroService.host}:${userServices.authMicroService.port}/authentication`;
    const notificationMicroService = `http://${userServices.notificationMicroService.host}:${userServices.notificationMicroService.port}/notification`;

    const router = express.Router();

    // Create a user
    router.post('/', function (req, res) {
        const user = req.body;
        request({method: 'POST', url: userMicroService, json: user})
            .then((created) => request({
                method: 'POST',
                url: `${notificationMicroService}/confirmation`,
                json: {
                    Conf_url: `http://blinkbox.com/confirm/${created.id}`,
                    Email: user.email
                }
            }))
            .then((body) => res.status(status.CREATED).send(body))
            .catch((err) => res.status(status.BAD_REQUEST).send(err));
    });

    // Search a user
    router.get('/:id', function (req, res) {
        request.get(`${userMicroService}/${req.params.id}`)
            .then((body) => res.status(status.OK).send(body))
            .catch((err) => res.status(status.BAD_REQUEST).send(err));
    });

    // Update a user
    router.put('/:id', function (req, res) {
        auth(req.headers.authorization, authMicroService, (error) => {
            if (!error && !error.error) {
                request({
                    method: 'PUT',
                    url: `${userMicroService}/${req.params.id}`,
                    json: req.body
                })
                    .then((body) => res.status(status.OK).send(body))
                    .catch((err) => res.status(status.BAD_REQUEST).send(err));
            } else {
                res.status(status.BAD_REQUEST).send(error);
            }
        });
    });

    // Delete a user
    router.delete('/:id', function (req, res) {
        auth(req.headers.authorization, authMicroService, (error) => {
            if (!error && !error.error) {
                request.delete(`${userMicroService}/${req.params.id}`)
                    .then((body) => res.status(status.OK).send(body))
                    .catch((err) => res.status(status.BAD_REQUEST).send(err));
            } else {
                res.status(status.BAD_REQUEST).send(error);
            }
        });

    });

    // Check valid user
    router.post('/login', function (req, res) {
        request({
            method: 'POST',
            url: `${authMicroService}/login`,
            json: req.body
        })
            .then((body) => res.status(status.OK).send(body))
            .catch((err) => res.status(status.BAD_REQUEST).send(err));
    });

    // Verifies user by email
    router.put('/email/:id', function (req, res) {
        request({
            method: 'PUT',
            url: `${authMicroService}/email/${req.params.id}`
        })
            .then((body) => res.status(status.OK).send(body))
            .catch((err) => res.status(status.BAD_REQUEST).send(err));
    });

    // Check valid token
    router.post('/validate', function (req, res) {
        request({
            method: 'POST',
            url: `${authMicroService}/validate`,
            json: req.body
        })
            .then((body) => res.status(status.OK).send(body))
            .catch((err) => res.status(status.BAD_REQUEST).send(err));
    });

    return router;
};
