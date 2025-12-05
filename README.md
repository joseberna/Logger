# @moscotoce/logger

A professional, cross-platform logger for Node.js and Browser environments. It supports service-based context, colors, and log levels.

## Features

- **Cross-Platform**: Works in Node.js (using `chalk`) and Browsers (using `console` styling).
- **Context-Aware**: Easily attach service names and method names to logs.
- **Color-Coded**: distinct colors for different services and log levels.
- **TypeScript Support**: First-class type definitions included.
- **Configurable**: Enable/disable debug mode, override colors.

## Installation

```bash
npm install @moscotoce/logger
# or
yarn add @moscotoce/logger
```

## Usage

### Basic Usage

```typescript
import logger from '@moscotoce/logger';

// Simple log
logger.info('Server started');

// Log with Context
logger.info('Processing transaction', { 
  service: 'PaymentService', 
  method: 'processCharge', 
  txHash: '0x123...' 
});

// Error log
logger.error('Database connection failed', { service: 'Database' });

// Success log
logger.success('Deployment successful');
```

### Log Levels

- `info`: General informational messages.
- `error`: Error messages.
- `warn`: Warning messages.
- `success`: Success messages.
- `debug`: Debug messages (only visible if `debugMode` is true or `NODE_ENV` is not production).

### Configuration

You can configure the logger instance:

```typescript
import logger from '@moscotoce/logger';

// Enable debug mode explicitly
logger.setConfig({ debugMode: true });

// Override service colors
logger.setConfig({
  serviceColors: {
    'MyCustomService': '#FF0000'
  }
});
```

### Extending / Multiple Instances

You can import the `Logger` class to create separate instances.

```typescript
import { Logger } from '@moscotoce/logger';

const myLogger = new Logger({
  debugMode: true
});
```

## Browser Support

When bundled for the browser (e.g., via Vite, Webpack), the package automatically swaps the implementation to use browser `console` methods with CSS styling, avoiding any Node.js dependencies like `chalk`.
