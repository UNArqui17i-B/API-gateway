'use strict';

const users = {
    userMicroService: {
        port: process.env.USER_PORT || 4000,
        host: process.env.USER_HOST || 'localhost'
    },
    authMicroService: {
        port: process.env.AUTH_PORT || 4005,
        host: process.env.AUTH_HOST || 'localhost'
    },
    notificationMicroService: {
        port: process.env.NOTIFICATION_PORT || 4010,
        host: process.env.NOTIFICATION_HOST || 'localhost'
    }
};

const files = {
    updateMicroService: {
        port: process.env.UPDATE_PORT || 4020,
        host: process.env.UPDATE_HOST || 'localhost'
    },
    deleteMicroService: {
        port: process.env.DELETE_PORT || 4030,
        host: process.env.DELETE_HOST || 'localhost'
    },
    uploadMicroService: {
        port: process.env.UPLOAD_PORT || 4015,
        host: process.env.UPLOAD_HOST || 'localhost'
    },
    accessMicroService: {
        port: process.env.ACCESS_PORT || 4025,
        host: process.env.ACCESS_HOST || 'localhost'
    }
};

module.exports = {users, files};
