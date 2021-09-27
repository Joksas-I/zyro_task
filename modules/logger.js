const fs = require('fs');

const saveLog = (ip) => {

    let logs = [];
    try {
        const rawdata = fs.readFileSync('./data/accesslog.json', 'utf-8');
        logs = JSON.parse(rawdata);
    } catch (err) {
        console.log(err);
    }

    const logData = {
        date: new Date(),
        ip: ip
    }
    logs.push(logData);
    fs.writeFile('./data/accesslog.json', JSON.stringify(logs, null , 2), 'utf-8', (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('The file has been saved!');
        }
      });
};

module.exports = { saveLog };
