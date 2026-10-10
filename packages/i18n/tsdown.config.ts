import { defineNeutralConfig } from '@cms/tsdown';

export default defineNeutralConfig({
  entry: ['src/index.ts', 'src/locales.ts', 'src/react.ts', 'src/standalone.ts', 'src/email.ts', 'src/site.ts'],
});
