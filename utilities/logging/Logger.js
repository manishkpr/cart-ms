/* eslint-disable import/no-dynamic-require */
const AppContext = process.env.APP_CONTEXT;

// Libraries
const Winston = require('winston');
const Fs = require('fs');
const Path = require('path');

// Configuration
const Config = require(`../../config/${AppContext}`);

// create directory for logs if it doesn't exist
const logDir = Config.App.LOG_DIR;
if (!Fs.existsSync(logDir)) {
  Fs.mkdirSync(logDir);
}

if (Config.App.APP_ENV === 'production' || Config.App.APP_ENV === 'pre_production') {
  Winston.remove(Winston.transports.Console);
  Winston.add(Winston.transports.File, {
    prettyPrint: false,
    level: 'info',
    silent: false,
    colorize: false,
    timestamp: true,
    filename: Path.join(logDir, Config.App.LOG_FILE),
    maxsize: 5242880, // 5 Mb
    maxFiles: 10, // using 10 rotating files
    json: true,
  });
} else if (Config.App.APP_ENV === 'nightly') {
  Winston.remove(Winston.transports.Console);
  Winston.add(Winston.transports.File, {
    json: true,
    timestamp: true,
    filename: Path.join(logDir, Config.App.LOG_FILE),
    maxsize: 5242880,
    maxFiles: 10,
    level: 'info',
  });
} else if (Config.App.APP_ENV === 'local' || Config.App.APP_ENV === 'unit_test' || Config.App.APP_ENV === 'integration_test') {
  // comment this line to enable Winston console output
  Winston.remove(Winston.transports.Console);

  Winston.add(Winston.transports.File, {
    json: true,
    timestamp: true,
    filename: Path.join(logDir, Config.App.LOG_FILE),
    maxsize: 5242880,
    maxFiles: 10,
    level: 'info',
  });
}

module.exports = Winston;
