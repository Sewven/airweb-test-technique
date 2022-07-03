'use strict';

const authenticationService = require('../service/authenticate');
const auntenticationCoreService = require('../../../core/authentication');

module.exports = {
    method: 'Get',
    path: '/login',
    options: {
        pre : [
        ],
        handler: function(request, h) {
            return h.view('login');
        },
        description: 'Authenticate user',
        auth: false
    }
};
