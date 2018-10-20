import { Grapevine } from "components/Grapevine";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { GrapevineClient } from "./external-clients/grapevine";
import { HttpClient } from "./utils/http";

declare var document: any;

const httpClient = new HttpClient();
const grapevine = new GrapevineClient(httpClient);

ReactDOM.render(
  <Grapevine grapevine={grapevine} />,
  document.getElementById("root"),
);
