const log = require('./log.js');
const file = require('fs').createWriteStream('logfile.json');
let articles = require('./articles.json');
const err = {code: 400, message: 'Invalid request'}

module.exports.deleteComment = function deleteComment(req, res, payload, cb) {
    let index, indexOfComment;
    if ((index = articles.findIndex(i => i.id == payload.articleId)) != -1 &&
        (indexOfComment = articles[index].comments.findIndex(i => i.id == payload.id)) != -1) {
        articles[index].comments.splice(indexOfComment, 1);
        //log.log(file, '/api/comments/delete', payload);
        cb(null, articles, 'application/json');
        return;
    }
    else {
        cb(err);
        return;
    }
}