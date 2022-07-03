'use strict';
const Boom = require('@hapi/boom');

async function doGetCart(cartId, token) {
    return new Promise(function(resolve,reject) {
        this.db.get(
            'SELECT * FROM carts WHERE id = ? AND token = ?',
            [cartId, token],
            (err, cart) => {
                if (err) {
                    throw err
                } else {
                    if (cart) {
                        resolve(cart);
                    } else {
                        resolve(Boom.notFound('cart not found'));
                    }
                }
            }
        );
    });
}

async function getCartFromIdAndToken(req) {
    if (req.params.cart_id && req.params.token) {
        return await doGetCart(req.params.cart_id, req.params.token);
    } else {
        return Boom.badData('parameters are missing');
    }
}

module.exports = {
    getCartFromIdAndToken
};