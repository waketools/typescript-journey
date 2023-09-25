/* eslint-disable prefer-arrow-callback */
import { SSTConfig } from 'sst';
import { NextjsSite, Table, use } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'sst-app-test',
      region: 'ap-southeast-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {});

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
