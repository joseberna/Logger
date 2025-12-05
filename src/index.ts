import chalk from 'chalk';
import { BaseLogger } from './BaseLogger';
import { LoggerConfig, LoggerContext, LogLevel } from './types';

export * from './types';

export class NodeLogger extends BaseLogger {
  constructor(config: LoggerConfig = {}) {
    super({
      debugMode: process.env.NODE_ENV !== 'production',
      ...config
    });
  }

  protected print(level: LogLevel, msg: string, context?: LoggerContext) {
    const { timestamp, contextStr, serviceColor } = this.formatMessage(level, msg, context);

    const levelLabel = `[${level}]`;
    const timeStr = chalk.gray(timestamp);
    let levelStr = '';
    let msgStr = msg;

    switch (level) {
      case 'INFO':
        levelStr = chalk.blue.bold(levelLabel);
        break;
      case 'ERROR':
        levelStr = chalk.red.bold(levelLabel);
        msgStr = chalk.red(msg);
        break;
      case 'WARN':
        levelStr = chalk.yellow.bold(levelLabel);
        msgStr = chalk.yellow(msg);
        break;
      case 'DEBUG':
        levelStr = chalk.magenta.bold(levelLabel);
        msgStr = chalk.magenta(msg);
        break;
      case 'SUCCESS':
        levelStr = chalk.green.bold(levelLabel);
        msgStr = chalk.green(msg);
        break;
    }

    const ctxFn = chalk.hex(serviceColor).bold;
    
    // eslint-disable-next-line no-console
    const logFn = level === 'ERROR' ? console.error : 
                  level === 'WARN' ? console.warn : 
                  level === 'DEBUG' ? console.debug : console.log;

    logFn(timeStr, levelStr, ctxFn(contextStr), msgStr);
  }
}

const logger = new NodeLogger();
export { NodeLogger as Logger };
export default logger;
