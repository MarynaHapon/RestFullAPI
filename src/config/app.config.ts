export default () => ({
  environment: process.env.NODE_ENV || 'development',
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  },
  database: {
    uri: `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  },
  api: {
    key: process.env.API_KEY,
  }
});
