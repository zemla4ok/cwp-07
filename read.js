const log = require('./log');
const file = require('fs').createWriteStream('logfile.json');
let articles = require('./articles.json');
const err = {code: 400, message: 'Invalid request'}

module.exports.read = function readAll(req, res, payload, cb) {
    let article = articles.find(i => i.id == payload.id);
    if (article != undefined) {
        //log.log(file, '/api/articles/read', payload);
        cb(null, article, 'application/json');
        return;
    }
    else {
        cb(err);
        return;
    }
}