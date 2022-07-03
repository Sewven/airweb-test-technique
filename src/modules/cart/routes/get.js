'use strict';
const cartService = require('../service/cart');
const Boom = require('@hapi/boom');

module.exports = {
    method: 'GET',
    path: '/cart/{cart_id}/{token}',
    config: {
        pre: [
            {
                method: cartService.getCartFromIdAndToken,
                assign: 'cart'
            }
        ],
        handler: async function (request, h) {
            if (!request.pre.cart) {
                return Boom.badData('Cart ' + request.params.cart_id + ' is not found');
            }
            return request.pre.cart;
        },
        auth: false,
        description: 'Get cart for given id and token'
    }
};
