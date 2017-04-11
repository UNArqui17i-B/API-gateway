'use strict';

const users = {
    user_ms: {
        port: process.env.USER_PORT || 4000,
        host: process.env.USER_HOST || 'localhost'
    },
    auth_ms: {
        port: process.env.AUTH_PORT || 4005,
        host: process.env.AUTH_HOST || 'localhost'
    },
    notification_ms: {
        port: process.env.NOTIFICATION_PORT || 4010,
        host: process.env.NOTIFICATION_HOST || 'localhost'
    }
};

const files = {
    update_ms: {
        port: process.env.UPDATE_PORT || 4020,
        host: process.env.UPDATE_HOST || 'localhost'
    },
    delete_ms: {
        port: process.env.DELETE_PORT || 4030,
        host: process.env.DELETE_HOST || 'localhost'
    },
    upload_ms: {
        port: process.env.UPLOAD_PORT || 4015,
        host: process.env.UPLOAD_HOST || 'localhost'
    }
};

module.exports = {users, files};
