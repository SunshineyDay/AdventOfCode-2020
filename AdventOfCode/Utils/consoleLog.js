const util = require('util');

const consoleLog = (data) => {
    console.log(util.inspect(data, false, null, true));
}

exports.consoleLog = consoleLog;