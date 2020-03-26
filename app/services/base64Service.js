const fs = require('fs');

module.exports = ( file ) => {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}