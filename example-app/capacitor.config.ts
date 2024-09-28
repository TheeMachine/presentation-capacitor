import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'pre-test',
  webDir: 'www',
  server: {
    cleartext: true,
    hostname: '127.0.0.1'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
