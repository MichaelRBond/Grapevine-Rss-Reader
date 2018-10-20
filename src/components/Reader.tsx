import { GrapevineClient } from "external-clients/grapevine";
import { Nullable } from "nullable-ts";
import * as React from "react";
import { ReaderHeader } from "./ReaderHeader";
import { FeedsList } from "./rss/FeedsList";
import { GroupsList } from "./rss/Groups";
import { ItemsList } from "./rss/ItemsList";

interface Props {
  grapevine: GrapevineClient;
}

interface State {
  selectedGroup: Nullable<number>;
  selectedFeed: Nullable<number>;
}

export class Reader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedFeed: null,
      selectedGroup: null,
    };

    this.handleGroupLinkClick = this.handleGroupLinkClick.bind(this);
    this.handleFeedLinkClick = this.handleFeedLinkClick.bind(this);

  }

  public render() {

    return (
      <div id="reader-container">
        <ReaderHeader grapevine={this.props.grapevine} />
        <GroupsList
          grapevine={this.props.grapevine}
          onClickCallback={this.handleGroupLinkClick}
        />
        <FeedsList
          groupId={this.state.selectedGroup}
          grapevine={this.props.grapevine}
          onClickCallback={this.handleFeedLinkClick}
        />
        <ItemsList
          feedId={this.state.selectedFeed}
          grapevine={this.props.grapevine}
        />
      </div>
    );
  }

  private handleGroupLinkClick(groupId: number): void {
    this.setState({selectedGroup: groupId, selectedFeed: null});
    return;
  }

  private handleFeedLinkClick(feedId: number): void {
    this.setState({selectedFeed: feedId});
    return;
  }
}
