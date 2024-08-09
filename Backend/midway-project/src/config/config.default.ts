import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

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
  upload: {
    mode: 'file',
    fileSize: '10mb',
    whitelist: ['.jpg', '.jpeg', '.png'],
    tmpdir: join(__dirname, '../../uploads/tmp'),
    cleanTimeout: 5 * 60 * 1000,
    base64: false,
  },
} as MidwayConfig;
