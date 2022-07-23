import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testMatch: [ "**/*.spec.ts" ]
};

export default config;
