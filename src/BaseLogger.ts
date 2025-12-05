import { LoggerConfig, LoggerContext, LogLevel } from './types';
import { getColorForService } from './utils';

export abstract class BaseLogger {
  protected config: LoggerConfig;

  constructor(config: LoggerConfig = {}) {
    this.config = {
      // Default to true if not specified, implementation can override default based on env
      // But usually we set this logic in the concrete class or passed in.
      // We will let the concrete class handle default debugMode if needed, or set it here.
      debugMode: false, 
      ...config,
    };
  }

  public setConfig(config: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config };
  }

  protected formatMessage(level: LogLevel, msg: string, context?: LoggerContext) {
    const timestamp = new Date().toLocaleTimeString();
    const service = context?.service || 'System';
    const method = context?.method ? `::${context.method}` : '';
    const serviceColor = getColorForService(service, this.config.serviceColors);
    const contextStr = `[${service}${method}]`;

    return { timestamp, contextStr, serviceColor, service, method };
  }

  protected abstract print(level: LogLevel, msg: string, context?: LoggerContext): void;

  info(msg: string, context?: LoggerContext) {
    this.print('INFO', msg, context);
  }

  error(msg: string, context?: LoggerContext) {
    this.print('ERROR', msg, context);
  }

  warn(msg: string, context?: LoggerContext) {
    this.print('WARN', msg, context);
  }

  debug(msg: string, context?: LoggerContext) {
    if (this.config.debugMode) {
      this.print('DEBUG', msg, context);
    }
  }

  success(msg: string, context?: LoggerContext) {
    this.print('SUCCESS', msg, context);
  }
}
