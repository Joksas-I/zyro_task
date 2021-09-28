const fs = require('fs');
const _ = require('lodash');

const logEntry = (req, res, next) => {
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
    ip: req.ip
  }
  log.push(logData);

  fs.writeFile('./data/accesslog.json', JSON.stringify(log, null , 2), 'utf-8', (err) => {
    if (err) {
      console.log(err);S
    } else {
      console.log('The file has been saved!');
    }
  });

  next();
};

const retrieveLog = (req, res, next) => {

  const from = new Date(req.query.from);
  const to = new Date(req.query.to);
  let sortedLog = [];
  let log = [];

  try {
    const rawdata = fs.readFileSync('./data/accesslog.json', 'utf-8');
    log = JSON.parse(rawdata);
    if(_.isEmpty(req.query)) {
      res.send(log)
    } else {
      log.map(log_entry => {
        const logDate = new Date(log_entry.date);
        if (logDate.getTime() > from.getTime() && logDate.getTime() < to.getTime()) {
          sortedLog.push(log_entry);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

  if(sortedLog.length != 0 ) {
    res.send(sortedLog);
  } else {
    res.send('No log records.');
  }
}


module.exports = { logEntry, retrieveLog };
