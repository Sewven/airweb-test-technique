'use strict';

const config = require('../../src/config/test');
const jwt = require('jsonwebtoken');

module.exports = {
    validateJwtToken: async function(decoded, request) {
        const user = new Promise(function(resolve,reject) {
            this.db.get(
                'SELECT * FROM users WHERE email = ?',
                [decoded.id],
                (err, user) => {
                    if (err) {
                        resolve(false);
                    }
                    if (user) {
                            resolve(user);
                    } else {
                        resolve(false);
                    }
                }
            )
        });

         if (user) {
             request.user = user;
             return { isValid: true };
         } else {
             return { isValid: false };
         }
    },
    createToken(user) {
        return jwt.sign(
            {
                id: user.id,
                username: user.email
            },
            config.jwt.key,
            {
                algorithm: 'HS256',
                expiresIn: "1d"
            }
        );
    }
};
