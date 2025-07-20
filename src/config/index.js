import defaultConfig from './default.js';

const config = {
  ...defaultConfig,
  codebasePath: process.env.CODEBASE_PATH || defaultConfig.codebasePath,
};

export default config;
