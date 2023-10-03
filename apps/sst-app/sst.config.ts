/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { SSTConfig } from 'sst';
import { commonConfig } from '@ts-journey/common';
// import { ApiStack } from './stacks/ApiStack';
import { ViteApp } from './stacks/ViteApp';

export default {
  config(_input) {
    return {
      name: commonConfig.PROJECT_NAME,
      region: 'ap-southeast-1',
      stage: 'dev',
    };
  },
  stacks(app) {
    app.stack(ViteApp);
    // app.stack(ApiStack);
    // app.stack(AuthStack).stack(NextApp);
  },
} satisfies SSTConfig;
