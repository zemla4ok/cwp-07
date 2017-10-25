const log = require('./log');
const file = require('fs').createWriteStream('logfile.json');
const ascOrder = 'asc';
const descOrder = 'desc';
let articles = require('./articles.json');
let sortedArticles = {};
let err = {error:'400', errorText: 'Invalid request'};

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
                let myDateA = a.date.split('-');
                let myDateB = b.date.split('-');
                let dateA = new Date(parseInt(myDateA[2]), parseInt(myDateA[1]), parseInt(myDateA[0]));
                let dateB = new Date(parseInt(myDateB[2]), parseInt(myDateB[1]), parseInt(myDateB[0])); 
                return dateA - dateB;
            })    
            break;
        case 'author':
            sortOrd(payload, (a, b)=>{
                a.author.localeCompare(b.author);
            })    
            break;
        default:
            cb(err);
            return;
    }
    //comments
    if(payload.includeDeps === false){
        sortedArticles = sortedArticles.map((element) => {
            let obj = Object.assign({}, element);
            delete obj.comments;
            return obj;   
        });
    }
    //pages block
    let articlesResponse = {items : sortedArticles, meta : { page : 1, pages: 0, count: articles.length, limit: 10}};
    if(payload.page !== undefined){
        articlesResponse.meta.page = payload.page;
    }
    if(payload.limit !== undefined){
        articlesResponse.meta.limit = payload.limit;
    }
    articlesResponse.meta.pages = parseInt(articlesResponse.meta.count / articlesResponse.meta.limit);
    //******************************* 
    log.log(file, '/api/articles/readall', payload);
    cb(null, articlesResponse);
}

function checkOfPayload(payloads){
    let payload = payloads;
    if(payload === undefined){
        payload = {
            sortField: 'date',
            sortOrder: 'desc',
            page: 1,
            limit: 10,
            includeDeps: false
        }
    }
    else{
        if(payload.sortField === undefined)
            payload.sortField = 'date';
        if(payload.sortOrder === undefined)
            payload.sortOrder = 'desc';
        if(payload.includeDeps === undefined)
            payload.includeDeps = false;
    }
    return payload;
}

function sortOrd(payload, func){
    sortedArticles.sort(func);
    if(payload.sortOrder === ascOrder){
        sortedArticles.reverse();
    }
}

 // 20-11 15^40