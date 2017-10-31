const fs = require('fs');

module.exports.getIndexHtml = (req, res, payload, cb)=>{
    fs.readFile('./data/index.html', (err, data)=>{
        if(!err)
            cb(null, data, 'text/html');
        else
            console.error(err);
    })
}