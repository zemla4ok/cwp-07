const fs = require('fs');

module.exports.siteCSS = (req, res, payload, cb)=>{
    fs.readFile('./data/site.css', (err, data)=>{
        if(!err)
            cb(null, data, 'text/css');
        else
            console.error(err);
    })
}