const MODE = process.env.NODE_ENV;

export default (): object => ({
  mode: MODE,
  port: +process.env.PORT
});