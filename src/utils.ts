import { LoggerContext, LogLevel, LoggerConfig } from './types';

export function getColorForService(service: string, customColors: Record<string, string> = {}): string {
  // Check custom overrides first
  if (customColors && customColors[service]) {
    return customColors[service];
  }

  // Default hardcoded map (based on user request)
  switch (service) {
    case 'TreasuryService': return '#FFFF00'; // Yellow
    case 'DCAService': return '#00FFFF'; // Cyan
    case 'System': return '#008000'; // Green
    case 'Frontend': return '#FF00FF'; // Magenta
    case 'Database': return '#0000FF'; // Blue
    case 'API': return '#5F5FFF'; // BlueBright (approx)
    case 'BlockchainService': return '#FFA500'; // Orange
    case 'DEXService': return '#FF69B4'; // HotPink
    case 'Queue': return '#9370DB'; // MediumPurple
    case 'Redis': return '#FF5555'; // RedBright (approx)
    default: return stringToColor(service);
  }
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}
