# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-05

### Added
- **Cross-Platform Support**: Core logger logic implemented for both Node.js (via `chalk`) and Browser (via console styling).
- **Service Context**: Ability to log with `service`, `method`, and other metadata context.
- **Log Levels**: Support for `INFO`, `ERROR`, `WARN`, `DEBUG`, `SUCCESS`.
- **Custom Colors**: Default color mapping for services and ability to override via config.
- **Tree-Shakable**: ESM and CJS builds provided via tsup.
- **Tests**: Comprehensive unit tests covering Node environment and utilities.
- **Types**: Full TypeScript definitions included.
