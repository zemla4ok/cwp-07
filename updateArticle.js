const log = require('./log');
const file = require('fs').createWriteStream('logfile.json');
const validator = require('./validator.js')
let articles = require('./articles.json');
const err = {code: 400, message: 'Invalid request'};
let comm = [];

module.exports.updateArticle = function updateArticle(req, res, payload, cb) {
    if (validator.isValidId(payload) && validator.isValidArticle(payload)) {
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].id === payload.id) {
                articles[i].title = payload.title;
                articles[i].text = payload.text;
                articles[i].date = payload.date;
                articles[i].author = payload.author;
                cb(null, payload, 'application/json');
                return;
            }
        }
    }
    else {
        cb(err);
        return;
    }
}