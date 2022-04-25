export default () => ({
  environment: process.env.ENVIRONMENT,
  port: parseInt(process.env.PORT, 3001),
  api: {
    tasks: {
      endpoint: process.env.API_TASKS_ENDPOINT,
    },
  },
});
