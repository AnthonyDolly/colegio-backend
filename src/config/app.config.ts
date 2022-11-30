export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
});
