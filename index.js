const chalk = require('chalk');

const log = (text) => {
    return console.log('log', text);
}

const logSuccess = (text) => {
    return console.log(chalk.inverse.greenBright('success'), text);
}

const logWarn = (text) => {
    return console.log(chalk.inverse.magentaBright('warn'), text);
}

const logInfo = (text) => {
    return console.log(chalk.inverse.blueBright('info'), text);
}

const logError = (text) => {
    return console.log(chalk.inverse.redBright('error'), text);
}

module.exports = {
    log,
    logError,
    logInfo,
    logSuccess,
    logWarn,
};