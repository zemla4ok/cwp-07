const fs = require('fs');

module.exports.appJS = (req, res, payload, cb)=>{
    fs.readFile('./data/app.js', (err, data)=>{
        if(!err)
            cb(null, data, 'text/html');
        else
            console.error(err);
    })
}

module.exports.formJS = (req, res, payload, cb)=>{
    fs.readFile('./data/form.js', (err, data)=>{
        if(!err)
            cb(null, data, 'text/html');
        else  
            console.error(err);
    })
}