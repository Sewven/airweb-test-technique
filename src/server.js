'use strict';

const config = require('./config/test');
const AuthenticationHelper = require('./core/authentication');
const path = require('path');
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');

const Sqlite3 = require("sqlite3");
const db = new Sqlite3.Database(path.resolve(__dirname, '../DATABASE.sqlite'));

let server;
module.exports = server = new Hapi.Server({
    host: config.app.host,
    port: config.app.port,
    routes: {
        validate: { failAction: (request, h, err) => { throw err; }},
        cors: config.routes.cors
    }
});

let plugins = [
    require('./modules/user/index.js'),
    require('./modules/product/index.js'),
    require('./modules/cart/index.js'),
];

const init = async () => {

    await server.bind({ db : db});

    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt', {
        key: config.jwt.key,
        validate: AuthenticationHelper.validateJwtToken,
        verifyOptions: {algorithms: ['HS256']},
        tokenType: "Bearer"
    });
    server.auth.default('jwt');


    await server.register(Vision);
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: path.resolve(__dirname, '../views'),
        partialsPath: path.resolve(__dirname, '../views/partials'),
    });

    // Test init
    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, reply) => {
            return reply.view('index');
        },
        options: {
            auth: false
        },
    });

    await Promise.all(plugins.map(plugin => {
        return new Promise(async resolve => {
            await server.register(plugin);
            resolve();
        });
    }));

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();