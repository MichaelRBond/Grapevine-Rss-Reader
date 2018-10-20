import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { GrapevineClient, RssFeed, RssGroupResponse } from "external-clients/grapevine";
import * as React from "react";
import { AddFeedToGroup } from "../modals/AddFeedToGroup";

interface Props {
  feed: RssFeed;
  grapevine: GrapevineClient;
  groups: RssGroupResponse[];
  onClickCallback: (id: number) => void;
}

interface State {
  modalAddToGroupIsOpen: boolean;
  modalEditFeedIsOpen: boolean;
}

export class FeedLink extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      modalAddToGroupIsOpen: false,
      modalEditFeedIsOpen: false,
    };

    this.showModalAddToGroup = this.showModalAddToGroup.bind(this);
    this.hideModalAddToGroup = this.hideModalAddToGroup.bind(this);
    this.showModalEditFeed = this.showModalEditFeed.bind(this);
    this.hideModalEditFeed = this.hideModalEditFeed.bind(this);
  }

  public render() {
    return (
      <div style={{display: "block"}}>
        <Button
          icon="document"
          minimal={true}
          text={this.props.feed.title}
          onClick={(e) => this.props.onClickCallback(this.props.feed.id)}
        />
        <Popover
          content={
            <Menu>
              <MenuItem text="Add to Group" onClick={this.showModalAddToGroup} />
            </Menu>}
          >
          <Button icon="more" minimal={true} />
        </Popover>

        <AddFeedToGroup
          close={this.hideModalAddToGroup}
          feed={this.props.feed}
          grapevine={this.props.grapevine}
          groups={this.props.groups}
          isOpen={this.state.modalAddToGroupIsOpen}
        />
      </div>
    );
  }

  private showModalEditFeed(): void {
    return this.setState({modalEditFeedIsOpen: true});
  }

  private hideModalEditFeed(): void {
    return this.setState({modalEditFeedIsOpen: false});
  }

  private showModalAddToGroup(): void {
    return this.setState({modalAddToGroupIsOpen: true});
  }

  private hideModalAddToGroup(): void {
    return this.setState({modalAddToGroupIsOpen: false});
  }
}
