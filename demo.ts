
import logger from './src/index';

console.log('\n--- LOGGER DEMO ---\n');

logger.info('System initialization started');

logger.debug('This is a debug message - visibility depends on config', { service: 'ConfigLoader' });

logger.info('Connected to database', { 
  service: 'Database', 
  method: 'connect', 
  host: 'localhost:5432' 
});

logger.warn('Response time is high', { 
  service: 'API', 
  method: 'GET /users', 
  latency: '500ms' 
});

logger.error('Payment processing failed', { 
  service: 'TreasuryService', 
  planId: 'premium_v1',
  error: 'Insufficient funds' 
});

logger.success('Deployment completed successfully', { 
  service: 'CI/CD', 
  buildId: '#1234' 
});

// Test unknown service auto-color
logger.info('Custom service doing something', { service: 'MyNewService' });
logger.info('Another service', { service: 'Reporting' });

console.log('\n--- END DEMO ---\n');
