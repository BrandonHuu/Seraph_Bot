const fse = require('fs-extra');
const iterators = require('../iterators.json');
const moment = require('moment');
const util = require('util');
const EOL = require('os').EOL
iterators.RunCount++;
fse.outputFileSync(`${__dirname}/../iterators.json`,JSON.stringify(iterators));
const Log = message =>{
    fse.appendFileSync(`${__dirname}/../Logs/${iterators.RunCount}.log`,`[ ${moment().local().format('llll')} ] ${util.inspect(message)}`+EOL,{recursive:true});
    console.log(message);
}

module.exports = {
    Log
}

process.on('uncaughtException', function(err) {
    Log(util.inspect(err))
})