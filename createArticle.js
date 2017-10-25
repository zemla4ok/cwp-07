const log = require('./log');
const file = require('fs').createWriteStream('logfile.json');
const validator = require('./validator.js');
let articles = require('./articles.json');
const err = {code: 401, message: 'Invalid Article'};

module.exports.createArticle = function createArticle(req, res, payload, cb) {
    payload.id = Date.now();
    if (validator.isValidArticle(payload)) {
        articles.push(payload);
        log.log(file, '/api/articles/create', payload);
        cb(null, payload);
        return;
    }
    else{
        cb(err);
        return;
    }
}