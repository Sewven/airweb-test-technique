'use strict';

exports.plugin = {
    register: (server, options) => {
        server.route([
            require('./routes/authenticate'),
            require('./routes/login')
        ]);
    },
    pkg: require('./package.json')
};