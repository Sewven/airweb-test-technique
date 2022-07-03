'use strict';

exports.plugin = {
    register: (server, options) => {
        server.route([
            require('./routes/get'),
           // require('./routes/patch'),
           // require('./routes/post'),
           // require('./routes/clear')
        ]);
    },
    pkg: require('./package.json')
};