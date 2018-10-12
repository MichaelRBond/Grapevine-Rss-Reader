export interface Config {
  grapevineHost: string;
  log: boolean;
  mode: string;
}

declare var config: Config;

export default config; // (process.env.CONFIG_ENV === "test" ? require("../config/test.js") : config);
