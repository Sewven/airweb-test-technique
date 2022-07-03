'use strict';

let config = {};

config.app = {
    host: '0.0.0.0',
    port: 4040
};

config.routes = {
    prefix: "api",
    cors: {
        origin: ['*'],
        headers: ['Accept', 'Authorization', 'Content-Type', 'Origin'],
        additionalHeaders: ['x-context', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'x-developer-structure', 'x-app-ref', 'x-app-version']
    }
};

config.jwt = {
    key: 'AIRWEB;TEST;TECHNIQUE'
};
module.exports = config;