import { Grapevine } from "components/Grapevine";
import * as React from "react";
import * as ReactDOM from "react-dom";

declare var document: any; // FIXME: Can this be typed better

ReactDOM.render(
  <Grapevine />,
  document.getElementById("root"),
);
