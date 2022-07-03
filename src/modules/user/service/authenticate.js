'use strict';
const md5 = require('md5');
const Boom = require('@hapi/boom');

// TEST DB FILE
const Sqlite3 = require("sqlite3");
const path = require("path");
const db = new Sqlite3.Database(path.resolve(__dirname, '../../../../DATABASE.sqlite'));

/**
 * Verify credentials from request (login)
 * @param request
 */
async function verifyCredentials(request) {
    const password = request.payload.password;
    try {
        if (password && request.payload.email) {

            return new Promise(function(resolve,reject) {
                db.get(
                    'SELECT * FROM users WHERE email = ?',
                    [request.payload.email],
                    (err, user) => {
                        if (err) {
                            throw err;
                        }
                        if (user) {
                            if (md5(user.id+password) === user.password_hash) {
                                request.user = user;
                                resolve(user);
                            } else {
                                resolve(Boom.forbidden('Incorrect Password'));
                            }
                        } else {
                            resolve(Boom.unauthorized('User doesnt exist'));
                        }
                    }
                )
            });
        }
        return Boom.badData('email or password are missing');
    } catch (error) {
        return (Boom.unauthorized('Error while authenticating'));
    }
}

/**
 * Check user is authenticated
 * @param request
 */
async function isAuthenticated(request) {
    //@todo check if user is authenticated
    return true;
}

module.exports = {
    verifyCredentials,
    isAuthenticated
};