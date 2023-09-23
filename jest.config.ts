import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  workerThreads: true,
  modulePathIgnorePatterns: ['./dist'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;
