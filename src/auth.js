'use strict';

const request = require('request-promise');

module.exports = (authorization, authMicroService, callback) => {
    if (authorization) {
        const token = authorization.substring(7);
        request({
            method: 'POST',
            url: `${authMicroService}/validate`,
            json: {token}
        })
            .then(callback)
            .catch(callback);
    } else {
        callback({
            error: 'token undefined'
        });
    }
};