const chalk = require('chalk');
const fs = require('fs');

const getLog = () => {
    try {
        const dataBuffer = fs.readFileSync('errorLog.json')
        const dataJSON = dataBuffer.toString()
        return (JSON.parse(dataJSON));
    } catch (e) {
        return ([]);
    }
}

const writeLog = (res) => {
    return new Promise( (resolve, reject) => {
        try {
            fs.writeFileSync('errorLog.json', JSON.stringify(res));
            return resolve(true);
        } catch (e) {
            return reject (e);
        }
    });
}

const saveLog = async (log) => {
    const res = getLog();
    res.push({type: log.type, log: log.text, timestamp: new Date()});
    return writeLog(res).then( ()=> true).catch((e)=> e);
}

const log = (text) => {
    saveLog({type: 1,text:text}).then( (res) => {
        return console.log(text);
    }).catch( (error) => {
       return console.log(chalk.inverse.redBright('error'), error);
    });
}

const logSuccess = (text) => {
    saveLog({type: 2,text:text}).then( (res) => {
        return console.log(chalk.inverse.greenBright('success'), text);
    }).catch( (error) => {
        return console.log(chalk.inverse.redBright('error'), error);
    });

}

const logWarn = (text) => {
    saveLog({type: 3,text:text}).then( (res) => {
        return console.log(chalk.inverse.magentaBright('warn'), text);
    }).catch( (error) => {
        return console.log(chalk.inverse.redBright('error'), error);
    });
}

const logInfo = (text) => {
    saveLog({type: 4,text:text}).then( (res) => {
        return console.log(chalk.inverse.blueBright('info'), text);
    }).catch( (error) => {
        return console.log(chalk.inverse.redBright('error'), error);
    });
}

const logError = (text) => {
    saveLog({type: 5,text:text}).then( (res) => {
        return console.log(chalk.inverse.redBright('error'), text);
    }).catch( (error) => {
        return console.log(chalk.inverse.redBright('error'), error);
    });
}

module.exports = {
    log,
    logError,
    logInfo,
    logSuccess,
    logWarn,
};
