import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import * as React from "react";

export class ReaderHeader extends React.Component<{}, {}> {

  public render() {

    return (
      <div id="reader-header">
        <strong>Grapevine RSS</strong>
        <Popover
          content={<Menu>
            <MenuItem text="Add Feed" />
          </Menu>}
          position="right-top"
          className="grapevine-menu"
        >
            <Button icon="menu" />
        </Popover>
      </div>
    );
  }
}
