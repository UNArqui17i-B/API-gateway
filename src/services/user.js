'use strict';

const request = require('request-promise');
const express = require('express');
const status = require('http-status');

module.exports = function (userServices) {
    const userMicroService = `${userServices.userMicroService.host}:${userServices.userMicroService.port}/users`;
    const authMicroService = `${userServices.authMicroService.host}:${userServices.authMicroService.port}/authentication`;
    //const notificationMicroService = `${userServices.notificationMicroService.host}:${userServices.notificationMicroService.port}/notification`;

    const router = express.Router();

    // Create a user
    router.post('/', function (req, res) {
        request({method: 'POST', url: userMicroService, json: req.body})
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
    router.put('/:id/:rev', function (req, res) {
        request({
            method: 'PUT',
            url: `${userMicroService}/${req.params.id}/${req.params.rev}`,
            json: req.body
        })
            .then((body) => res.status(status.OK).send(body))
            .catch((err) => res.status(status.BAD_REQUEST).send(err));
    });

    // Delete a user
    router.delete('/:id/:rev', function (req, res) {
        request.delete(`${userMicroService}/${req.params.id}/${req.params.rev}`)
            .then((body) => res.status(status.OK).send(body))
            .catch((err) => res.status(status.BAD_REQUEST).send(err));
    });

    return router;
};
