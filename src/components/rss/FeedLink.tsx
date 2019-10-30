import { Button, IconName, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { DeleteFeedConfirmation } from "components/modals/DeleteFeedConfirmation";
import { GrapevineClient, RssFeed, RssGroupResponse } from "grapevine-rss-client-javascript";
import { RssFeedIdentifiers } from "models/rss";
import * as React from "react";
import { AddFeedToGroup } from "../modals/AddFeedToGroup";

interface Props {
  feed: RssFeed;
  grapevine: GrapevineClient;
  groups: RssGroupResponse[];
  onClickCallback: (id: number) => void;
  updateFeedList: () => void;
}

interface State {
  modalAddToGroupIsOpen: boolean;
  modalDeleteConfirmIsOpen: boolean;
  modalEditFeedIsOpen: boolean;
}

export class FeedLink extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      modalAddToGroupIsOpen: false,
      modalDeleteConfirmIsOpen: false,
      modalEditFeedIsOpen: false,
    };

    this.showModalAddToGroup = this.showModalAddToGroup.bind(this);
    this.hideModalAddToGroup = this.hideModalAddToGroup.bind(this);
    this.showModalEditFeed = this.showModalEditFeed.bind(this);
    this.hideModalEditFeed = this.hideModalEditFeed.bind(this);
    this.showModalDeleteFeedConfirm = this.showModalDeleteFeedConfirm.bind(this);
    this.hideModalDeleteFeedConfim = this.hideModalDeleteFeedConfim.bind(this);
  }

  public render() {
    const feedId = this.props.feed.id;

    return (
      <div style={{display: "block"}}>
        <Button
          icon={this.determineFeedIcon(feedId)}
          minimal={true}
          text={this.props.feed.title}
          onClick={(e: any) => this.props.onClickCallback(feedId)}
        />
        {feedId >= 0 &&
          <div className="feed-menu-container">
            <Popover
              content={
                <Menu>
                  <MenuItem text="Add to Group" onClick={this.showModalAddToGroup} />
                  <MenuItem text="Delete Feed" onClick={this.showModalDeleteFeedConfirm} />
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

            <DeleteFeedConfirmation
              close={this.hideModalDeleteFeedConfim}
              feed={this.props.feed}
              grapevine={this.props.grapevine}
              isOpen={this.state.modalDeleteConfirmIsOpen}
            />
          </div>
        }
      </div>
    );
  }

  private determineFeedIcon(feedId: number): IconName {
    switch (feedId) {
      case RssFeedIdentifiers.ALL_STARRED:
        return "star-empty";
      case RssFeedIdentifiers.ALL_UNREAD:
        return "document";
      default:
        return "feed";
    }
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

  private showModalDeleteFeedConfirm(): void {
    return this.setState({modalDeleteConfirmIsOpen: true});
  }

  private hideModalDeleteFeedConfim(): void {
    this.props.updateFeedList();
    return this.setState({modalDeleteConfirmIsOpen: false});
  }
}
