export const APP_NAME = 'APP_NAME';
export const APP_VERSION = 'APP_VERSION';
export const APP_PORT = 'APP_PORT';
export const NODE_ENV = 'NODE_ENV';

export type AppConfiguration = {
  name: string;
  version: string;
  port: number;
  env: string;
};
