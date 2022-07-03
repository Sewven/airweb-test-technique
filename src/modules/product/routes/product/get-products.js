'use strict';
const productsService = require('../../service/products');
const userService = require('../../../user/service/authenticate');

module.exports = {
    method: 'GET',
    path: '/products',
    options: {
        pre: [
            {
                method: userService.isAuthenticated,
                assign: 'authenticate'
            },
            {
                method: productsService.getProducts,
                assign: 'products'
            }
        ],
        handler: function (request, reply) {

            let productsListHtml = '';

            if (request.pre.products?.length) {
                request.pre.products.forEach( product => {
                    productsListHtml += '<div class="product">';
                    productsListHtml += '<div class="product-image"><img src="' + product.thumbnail_url + '"/></div>';
                    productsListHtml += '<div class="product-content"><h3>' + product.label + '</h3><p class="product-price">' + (product.price/100).toFixed(2) +'€</p><p class="product-description">' + product.description + '</p></div>';
                    productsListHtml += '<a href="/product/' + product.id + '">Voir produit</a>';
                    productsListHtml += '</div>';
                })
            }
            const context = {products: productsListHtml}
            return reply.view('products', context);
        },
        auth: false,
        description: 'Get all products'
    }
};
