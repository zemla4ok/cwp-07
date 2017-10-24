const log = require('./log');
const file = require('fs').createWriteStream('logfile.log');
const ascOrder = 'asc';
const descOrder = 'desc';
let articles = require('./articles.json');
let sortedArticles;

module.exports.readAll = function readAll(req, res, payload, cb) {
    sortedArticles = articles.slice();
    console.log(payload.sortField);
    switch(payload.sortField){
        case 'id':
            sortOrd(payload, (a, b)=>{
                return a.id - b.id;
            })
            break;
        case 'title':
            sortOrd(payload, (a, b)=>{
                a.title.localeCompare(b.title);
            })  
            break;
        case 'text':
            sortOrd(payload, (a, b)=>{
                a.text.localeCompare(b.text);
            })    
            break;
        case 'date':
            sortOrd(payload, (a, b)=>{
                a.date.localeCompare(b.date);
            })    
            break;
        case 'author':
            sortOrd(payload, (a, b)=>{
                a.author.localeCompare(b.author);
            })    
            break;
    }
   
   
    log.log(file, '/api/articles/readall', payload);
    cb(null, sortedArticles);
}

function sortOrd(payload, func){
    sortedArticles.sort(func);
    if(payload.sortOrder === ascOrder){
        sortedArticles.reverse();
    }
}