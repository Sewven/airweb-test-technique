'use strict';

const authenticationService = require('../service/authenticate');
const auntenticationCoreService = require('../../../core/authentication');

module.exports = {
    method: 'POST',
    path: '/user/authenticate',
    options: {
        pre : [
            {
                method: authenticationService.verifyCredentials,
                assign: 'user'
            }
        ],
        handler: function(request, h) {
            return h.view('authenticate', {token: auntenticationCoreService.createToken(request.pre.user)});
        },
        description: 'Authenticate user',
        auth: false
    }
};
