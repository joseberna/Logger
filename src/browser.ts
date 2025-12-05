import { BaseLogger } from './BaseLogger';
import { LoggerConfig, LoggerContext, LogLevel } from './types';

export * from './types';

export class BrowserLogger extends BaseLogger {
  constructor(config: LoggerConfig = {}) {
    // In browser, process.env might not exist or be replaced.
    // Default debugMode to true in dev environments if detectable, or just false.
    // Usually bundlers replace process.env.NODE_ENV.
    let isDev = false;
    try {
      // @ts-ignore
      isDev = process.env.NODE_ENV !== 'production';
    } catch (e) {
      // ignore
    }

    super({
      debugMode: isDev,
      ...config
    });
  }

  protected print(level: LogLevel, msg: string, context?: LoggerContext) {
    const { timestamp, contextStr, serviceColor } = this.formatMessage(level, msg, context);
    const levelLabel = `[${level}]`;

    let levelStyle = '';
    let contextStyle = `color: ${serviceColor}; font-weight: bold;`;
    let msgStyle = 'color: inherit;';
    let timestampStyle = 'color: gray;';

    switch (level) {
      case 'INFO':
        levelStyle = 'color: #3498db; font-weight: bold;'; // Blue
        break;
      case 'ERROR':
        levelStyle = 'color: #e74c3c; font-weight: bold;'; // Red
        msgStyle = 'color: #e74c3c;';
        break;
      case 'WARN':
        levelStyle = 'color: #f1c40f; font-weight: bold;'; // Yellow
        msgStyle = 'color: #f1c40f;';
        break;
      case 'DEBUG':
        levelStyle = 'color: #9b59b6; font-weight: bold;'; // Magenta
        msgStyle = 'color: #9b59b6;';
        break;
      case 'SUCCESS':
        levelStyle = 'color: #2ecc71; font-weight: bold;'; // Green
        msgStyle = 'color: #2ecc71;';
        break;
    }

    const formattedLog = `%c${timestamp} %c${levelLabel} %c${contextStr} %c${msg}`;
    const args = [formattedLog, timestampStyle, levelStyle, contextStyle, msgStyle];

    const logFn = level === 'ERROR' ? console.error : 
                  level === 'WARN' ? console.warn : 
                  level === 'DEBUG' ? console.debug : console.log;

    logFn(...args);
  }
}

const logger = new BrowserLogger();
export { BrowserLogger as Logger };
export default logger;
