const log = require('./log');
const file = require('fs').createWriteStream('logfile.log');
const ascOrder = 'asc';
const descOrder = 'desc';
let articles = require('./articles.json');
let sortedArticles;

module.exports.readAll = function readAll(req, res, payload, cb) {
    sortedArticles = articles;
    console.log(payload.sortField);
    switch(payload.sortField){
        case 'id':
            sortOrder(payload, (a, b)=>{
                return a.id - b.id;
            })
            break;
        case 'title':
            sortOrder(payload, (a, b)=>{
                a.title.localeCompare(b.title);
            })            
    }
   
   
    log.log(file, '/api/articles/readall', payload);
    cb(null, sortedArticles);
}

function sortOrder(payload, func){
    sortedArticles.sort(func);
    if(payload.sortOrder === ascOrder){
        sortedArticles.reverse();
    }
}