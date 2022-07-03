'use strict';
const path = require('path');

// TEST DB FILE
const Sqlite3 = require("sqlite3");
const db = new Sqlite3.Database(path.resolve(__dirname, '../../../../DATABASE.sqlite'), err => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to database");
});

async function getProducts(request) {
    let query = 'SELECT * FROM products';
    // @todo if user is authenticated change sql query + add JOIN categories to query
    if (request.user) {
        query += ' WHERE visible_authenticated = 1';
    } else {
        query += ' WHERE visible_public = 1';
    }

    return new Promise(function(resolve,reject){
        db.all(query, [], (err, results) => {
            if (err) {
                throw err;
            }
            resolve(results);
        });
    });
}

async function getProduct(request) {
    let query = 'SELECT * FROM products';

    // @todo check if user is authenticated to check
    if (request.user) {
        query += '  WHERE id = ? AND visible_authenticated = 1';
    } else {
        query += '  WHERE id = ? AND visible_public = 1';
    }

    return new Promise(function(resolve,reject){
        db.get(query,
            [request.params.product_id],
            (err, result) => {
                if (err) {
                    resolve(null);
                }
                resolve(result);
            });
    });
}

module.exports = {
    getProducts,
    getProduct
}