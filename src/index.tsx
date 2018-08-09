import * as React from "react";
import * as ReactDOM from "react-dom";

declare var document: any; // FIXME: Can this be typed better

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById("root"),
);
