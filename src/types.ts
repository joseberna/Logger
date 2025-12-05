export interface LoggerContext {
  service?: string;
  method?: string;
  planId?: string;
  txHash?: string;
  [key: string]: any; // Allow extra properties
}

export interface LoggerConfig {
  debugMode?: boolean;
  serviceColors?: Record<string, string>; // Hex codes or color names
}

export type LogLevel = 'INFO' | 'ERROR' | 'WARN' | 'DEBUG' | 'SUCCESS';
