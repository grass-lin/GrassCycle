import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1722911042905_4804',
  koa: {
    port: 7001,
    hostname: '0.0.0.0',
  },
  cors: {
    origin: '*',
    allowMethod: 'GET,DELETE,POST,PUT',
  },
} as MidwayConfig;
