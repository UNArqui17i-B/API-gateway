'use strict';

const request = require('request-promise');
const express = require('express');
const status = require('http-status');
const auth = require('../auth');

module.exports = function (userServices, fileServices) {
    const updateMicroService = `http://${fileServices.updateMicroService.host}:${fileServices.updateMicroService.port}/update`;
    const deleteMicroService = `http://${fileServices.deleteMicroService.host}:${fileServices.deleteMicroService.port}/delete`;
    const uploadMicroService = `http://${fileServices.uploadMicroService.host}:${fileServices.uploadMicroService.port}/upload`;
    const authMicroService = `http://${userServices.authMicroService.host}:${userServices.authMicroService.port}/authentication`;
    const accessMicroService = `http://${userServices.accessMicroService.host}:${userServices.accessMicroService.port}/fileAccess`;

    const router = express.Router();

    // Delete the file
    router.delete('/delete/:id', function (req, res) {
        auth(req.headers.authorization, authMicroService, (error) => {
            if (!error && !error.error) {
                request.delete(`${deleteMicroService}/delete/${req.params.id}`)
                    .then((body) => res.status(status.OK).send(body))
                    .catch((err) => res.status(status.BAD_REQUEST).send(err));
            } else {
                res.status(status.BAD_REQUEST).send(error);
            }
        });
    });

    // Update the file's metadata
    router.put('/update/:id', function (req, res) {
        auth(req.headers.authorization, authMicroService, (error) => {
            if (!error && !error.error) {
                const file = req.body;

                let updatePromises = [];
                if (file.share) {
                    updatePromises.push(request({
                        method: 'PUT',
                        url: `${updateMicroService}/share/${req.params.id}`,
                        json: file.share
                    }));
                }

                if (file.date) {
                    updatePromises.push(
                        request.put(`${updateMicroService}/date/${req.params.id}/${file.date}`)
                    );
                }

                Promise.all(updatePromises)
                    .then((body) => res.status(status.OK).send(body))
                    .catch((err) => res.status(status.BAD_REQUEST).send(err));
            } else {
                res.status(status.BAD_REQUEST).send(error);
            }
        });
    });

    // Creates an uploads the file
    router.post('/upload/:email', function (req, res) {
        auth(req.headers.authorization, authMicroService, (error) => {
            if (!error && !error.error) {
                request({
                    method: 'POST',
                    url: `${uploadMicroService}/upload/${req.params.email}`,
                    json: req.body
                })
                    .then((body) => res.status(status.OK).send(body))
                    .catch((err) => res.status(status.BAD_REQUEST).send(err));
            } else {
                res.status(status.BAD_REQUEST).send(error);
            }
        });
    });

    return router;
};
