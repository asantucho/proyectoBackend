import winston from 'winston';

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

winston.addColors({
  debug: 'green',
  http: 'blue',
  info: 'cyan',
  warning: 'yellow',
  error: 'red',
  fatal: 'magenta',
});

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
  }),
];

export const developmentLogger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports,
  level: 'debug',
});

export const productionLogger = winston.createLogger({
  levels,
  transports: [
    ...transports,
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
  level: 'info',
});
