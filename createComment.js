const log = require('./log.js');
const file = require('fs').createWriteStream('logfile.json');
const validator = require('./validator.js');
let articles = require('./articles.json');
const err400 = { code: 400, message: 'Invalid request' };
const err401 = {code: 401, message: 'Invalid comment'};

module.exports.createComment = function createComment(req, res, payload, cb) {
    let ind = articles.findIndex(i => i.id == payload.articleId);
    if (ind != -1) {
        payload.id = Date.now();
        if(validator.isValidComment(payload)) {
            articles[ind].comments.push(payload);
            //log.log(file, '/api/comments/create', payload);
            cb(null, articles, 'application/json');
            return;
        }
        else{
            cb(err401, 'application/json');
            return;
        }
    }
    else {
        cb(err400);
        return;
    }
}