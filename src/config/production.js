module.exports = {
  grapevineHost: process.env.GRAPEVINE_HOST || "http://localhost:3000",
  log: true,
  mode: "production",
  publicPath: process.env.PUBLIC_PATH || "http://localhost:8001",
  sourceMapping: "source-map",
};
