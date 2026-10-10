import { defineConfig, mergeConfig, type UserConfig, type UserConfigExport } from 'tsdown';

export type TsdownOptions = Partial<UserConfig>;

/**
 * Base tsdown preset for workspace packages
 */
export function defineBaseConfig(options: TsdownOptions = {}): UserConfigExport {
  const baseConfig: UserConfig = {
    entry: ['src/index.ts'],
    format: ['esm'],
    clean: true,
    sourcemap: true,
    dts: true,
  };

  return defineConfig(mergeConfig(baseConfig, options));
}

/**
 * Preset for browser-targeted packages (React components, UI, icons)
 */
export function defineBrowserConfig(options: TsdownOptions = {}): UserConfigExport {
  return defineBaseConfig({
    platform: 'browser',
    ...options,
  });
}

/**
 * Preset for neutral / platform-agnostic packages (isomorphic libraries, presets)
 */
export function defineNeutralConfig(options: TsdownOptions = {}): UserConfigExport {
  return defineBaseConfig({
    platform: 'neutral',
    ...options,
  });
}

/**
 * Preset for Node.js-targeted packages
 */
export function defineNodeConfig(options: TsdownOptions = {}): UserConfigExport {
  return defineBaseConfig({
    platform: 'node',
    ...options,
  });
}

export { defineConfig, mergeConfig, type UserConfig, type UserConfigExport };
