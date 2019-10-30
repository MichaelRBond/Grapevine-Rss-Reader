import { Grapevine } from "components/Grapevine";
import config from "config";
import { GrapevineClient } from "grapevine-rss-client-javascript";
import * as React from "react";
import * as ReactDOM from "react-dom";

declare var document: any;

const grapevine = new GrapevineClient(config.grapevineHost);

ReactDOM.render(
  <Grapevine grapevine={grapevine} />,
  document.getElementById("root"),
);
