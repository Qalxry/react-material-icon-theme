export type LogLevel = 'info' | 'error' | 'debug';

export interface Logger {
  info(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

class SimpleLogger implements Logger {
  constructor(private level: LogLevel = 'info') {}

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = { debug: 0, info: 1, error: 2 };
    return levels[level] >= levels[this.level];
  }
}

export const logger = new SimpleLogger();

export const createLoggingObserver = (level: LogLevel = 'info') => {
  return new SimpleLogger(level);
};
