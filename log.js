module.exports.log=function log(file, url, data) {
    const currentDate = new Date();
    let info ={
        date: currentDate,
        url: url,
        req: data
    };
    file.write(JSON.stringify(info));
}