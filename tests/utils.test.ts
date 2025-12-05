import { describe, it, expect } from 'vitest';
import { getColorForService } from '../src/utils';

describe('Utils: getColorForService', () => {
  it('should return hardcoded colors for known services', () => {
    expect(getColorForService('Database')).toBe('#0000FF');
    expect(getColorForService('Queue')).toBe('#9370DB');
  });

  it('should return consistent hex codes for unknown services', () => {
    const color1 = getColorForService('UnknownService1');
    const color2 = getColorForService('UnknownService1');
    const color3 = getColorForService('UnknownService2');
    
    expect(color1).toBe(color2); // Deterministic
    expect(color1).toMatch(/^#[0-9a-f]{6}$/i); // Valid hex
    expect(color1).not.toBe(color3); // Probably different for different strings
  });

  it('should respect custom color overrides', () => {
    const custom = { 'MyService': '#123456' };
    expect(getColorForService('MyService', custom)).toBe('#123456');
  });
});
