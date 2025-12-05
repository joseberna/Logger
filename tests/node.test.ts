import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import logger, { Logger, NodeLogger } from '../src/index'; // Importing Node implementation
import chalk from 'chalk';

describe('Logger (Node)', () => {
  let consoleSpy: any;

  beforeEach(() => {
    // Spy on console methods
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
    };
    // Reset config
    logger.setConfig({ debugMode: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be an instance of NodeLogger', () => {
    expect(logger).toBeInstanceOf(NodeLogger);
  });

  it('should log info messages', () => {
    logger.info('Test info message');
    expect(consoleSpy.log).toHaveBeenCalled();
    const args = consoleSpy.log.mock.calls[0];
    // Check if args contain the message
    expect(args.join(' ')).toContain('Test info message');
    expect(args.join(' ')).toContain('[INFO]');
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(consoleSpy.error).toHaveBeenCalled();
    const args = consoleSpy.error.mock.calls[0];
    expect(args.join(' ')).toContain('Test error message');
    expect(args.join(' ')).toContain('[ERROR]');
  });

  it('should log warn messages', () => {
    logger.warn('Test warn message');
    expect(consoleSpy.warn).toHaveBeenCalled();
    const args = consoleSpy.warn.mock.calls[0];
    expect(args.join(' ')).toContain('Test warn message');
    expect(args.join(' ')).toContain('[WARN]');
  });

  it('should log success messages', () => {
    logger.success('Test success message');
    expect(consoleSpy.log).toHaveBeenCalled();
    const args = consoleSpy.log.mock.calls[0];
    expect(args.join(' ')).toContain('Test success message');
    expect(args.join(' ')).toContain('[SUCCESS]');
  });

  it('should log debug messages when debugMode is true', () => {
    const localLogger = new Logger({ debugMode: true });
    localLogger.debug('Test debug message');
    expect(consoleSpy.debug).toHaveBeenCalled();
    const args = consoleSpy.debug.mock.calls[0];
    expect(args.join(' ')).toContain('Test debug message');
    expect(args.join(' ')).toContain('[DEBUG]');
  });

  it('should NOT log debug messages when debugMode is false', () => {
    const localLogger = new Logger({ debugMode: false });
    localLogger.debug('Hidden debug message');
    expect(consoleSpy.debug).not.toHaveBeenCalled();
  });

  it('should include service context in logs', () => {
    logger.info('Message with context', { service: 'AuthService', method: 'login' });
    const args = consoleSpy.log.mock.calls[0];
    expect(args.join(' ')).toContain('[AuthService::login]');
  });

  it('should use default system context if not provided', () => {
    logger.info('Message without context');
    const args = consoleSpy.log.mock.calls[0];
    expect(args.join(' ')).toContain('[System]');
  });
});
