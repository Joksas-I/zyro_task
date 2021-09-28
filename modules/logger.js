const fs = require('fs');

const saveLog = (ip) => {

    let log = [];
    try {
        const rawdata = fs.readFileSync('./data/accesslog.json', 'utf-8');
        log = JSON.parse(rawdata);
    } catch (err) {
        console.log(err);
    }
    const newDate = new Date().toISOString().slice(0, 10);
    const logData = {
        date: newDate,
        ip: ip
    }
    log.push(logData);
    fs.writeFile('./data/accesslog.json', JSON.stringify(log, null , 2), 'utf-8', (err) => {
        if (err) {
          console.log(err);S
        } else {
          console.log('The file has been saved!');
        }
      });
};

const retrieveLog = (params) => {
  const fromTo = params.split(':');
  const from = new Date(fromTo[0]);
  const to = new Date(fromTo[1]);
  let sortedLog = [];
  let log = [];

  try {
    const rawdata = fs.readFileSync('./data/accesslog.json', 'utf-8');
    log = JSON.parse(rawdata);
  } catch (err) {
    console.log(err);
  }

  log.map(log_entry => {
    const logDate = new Date(log_entry.date);
    if (logDate.getTime() > from.getTime() && logDate.getTime() < to.getTime()) {
      sortedLog.push(log_entry);
    }
  });
  if(sortedLog.length != 0 ) {
    return sortedLog;
  } else {
    return 'No log records.'
  }
}

module.exports = { saveLog, retrieveLog };
