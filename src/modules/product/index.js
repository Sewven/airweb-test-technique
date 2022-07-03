'use strict';

exports.plugin = {
    register: (server, options) => {
        server.route([
            require('./routes/product/get-products'),
            require('./routes/product/get-product')
        ]);
    },
    pkg: require('./package.json')
};