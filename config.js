module.exports = {
  secret: process.env.CONFIG || '1234',
  testEnv: process.env.TEST_ENV || 'false',
};
