const log = require('./log');
const file = require('fs').createWriteStream('logfile.json');
const validator = require('./validator.js');
let articles = require('./articles.json');
const err = {code: 401, message: 'Invalid Article'};

module.exports.createArticle = function createArticle(req, res, payload, cb) {
    console.log(payload);
    if (validator.isValidArticle(payload)) {
        articles.push(payload);
        console.log("sada");
        //log.log(file, '/api/articles/create', payload);
        cb(null, payload, 'application/json');
        return;
    }
    else{
        console.log("asdasdasdasda");
        cb(err);
        return;
    }
}