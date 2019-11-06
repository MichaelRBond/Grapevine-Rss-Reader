import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { GrapevineClient } from "grapevine-rss-client-javascript";
import * as React from "react";
import { AddFeed } from "./modals/AddFeed";
import { AddGroup } from "./modals/AddGroup";

interface Props {
  grapevine: GrapevineClient;
}

interface State {
  modalAddFeedIsOpen: boolean;
  modalAddGroupIsOpen: boolean;
}

export class ReaderHeader extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      modalAddFeedIsOpen: false,
      modalAddGroupIsOpen: false,
    };

    this.showModalAddFeed = this.showModalAddFeed.bind(this);
    this.hideModalAddFeed = this.hideModalAddFeed.bind(this);
    this.showModalAddGroup = this.showModalAddGroup.bind(this);
    this.hideModalAddGroup = this.hideModalAddGroup.bind(this);
  }

  public render() {

    return (
      <div id="reader-header">
        <div style={{display: "flex", margin: "auto"}}>
          <img src={require("../assets/grapes.png")} style={{width: "50px", paddingRight: "1em"}}/>
          <strong>Grapevine RSS</strong>
        </div>
        <Popover
          content={<Menu>
            <MenuItem text="Add Feed" onClick={this.showModalAddFeed} />
            <MenuItem text="Add Group" onClick={this.showModalAddGroup} />
          </Menu>}
          position="right-top"
          className="grapevine-menu"
        >
            <Button icon="menu" />
        </Popover>

        <AddFeed
          isOpen={this.state.modalAddFeedIsOpen}
          close={this.hideModalAddFeed}
          grapevine={this.props.grapevine}
        />

        <AddGroup
          isOpen={this.state.modalAddGroupIsOpen}
          close={this.hideModalAddGroup}
          grapevine={this.props.grapevine}
        />

      </div>
    );
  }

  private showModalAddFeed(): void {
    return this.setState({modalAddFeedIsOpen: true});
  }

  private hideModalAddFeed(): void {
    return this.setState({modalAddFeedIsOpen: false});
  }

  private showModalAddGroup(): void {
    return this.setState({modalAddGroupIsOpen: true});
  }

  private hideModalAddGroup(): void {
    return this.setState({modalAddGroupIsOpen: false});
  }
}
