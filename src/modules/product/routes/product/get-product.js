'use strict';
const productsService = require('../../service/products');
const userService = require("../../../user/service/authenticate");

module.exports = {
    method: 'GET',
    path: '/product/{product_id}',
    options: {
        pre: [
            {
                method: userService.isAuthenticated,
                assign: 'authenticate'
            },
            {
                method: productsService.getProduct,
                assign: 'product'
            }
        ],
        handler: function (request, reply) {
            let productHtml = '';

            if (request.pre.product) {
                const product = request.pre.product;
                productHtml += '<div class="product">';
                productHtml += '<div class="product-image"><img src="' + product.thumbnail_url + '"/></div>';
                productHtml += '<div class="product-content"><h3>' + product.label + '</h3><p class="product-price">' + (product.price/100).toFixed(2) +'€</p><p class="product-description">' + product.description + '</p></div>';
                productHtml += '</div>';

                const context = {productName: product.label, product: productHtml}
                return reply.view('product', context);
            }

            return reply.view('product', {productName: 'Product not found'});

        },
        auth: false,
        description: 'Get product by id'
    }
};
