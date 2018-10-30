import { GrapevineClient, RssFeed, RssGroupResponse } from "external-clients/grapevine";
import { RssFeedIdentifiers } from "models/rss";
import { isNull, Nullable } from "nullable-ts";
import * as React from "react";
import { sortGroupsCompare } from "../../utils/helpers";
import { FeedLink } from "./FeedLink";

interface Props {
  groupId: Nullable<number>;
  grapevine: GrapevineClient;
  onClickCallback: (id: number) => void;
}

interface State {
  feeds: Nullable<RssFeed[]>;
  groups: RssGroupResponse[];
}

export class FeedsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      feeds: [],
      groups: [],
    };

    this.getFeeds = this.getFeeds.bind(this);
  }

  public componentDidMount(): void {
    this.getFeeds();
    this.getGroups();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (this.props.groupId === prevProps.groupId) {
      return;
    }
    this.getFeeds();
  }

  public render() {
    if (isNull(this.state.feeds)) {
      return null;
    }
    return (
      <div id="feeds-container">
        <FeedLink
          feed={{
            id: RssFeedIdentifiers.ALL_UNREAD,
            title: "Show all unread",
          } as RssFeed}
          grapevine={this.props.grapevine}
          groups={this.state.groups}
          key={`feed--1`}
          onClickCallback={this.props.onClickCallback}
        />
        <FeedLink
          feed={{
            id: RssFeedIdentifiers.ALL_STARRED,
            title: "Show all starred",
          } as RssFeed}
          grapevine={this.props.grapevine}
          groups={this.state.groups}
          key={`feed--2`}
          onClickCallback={this.props.onClickCallback}
        />

        <hr id="feeds-list-divider" />

        {this.state.feeds!.sort(this.sortCompare).map((feed) => {
          return <FeedLink
            feed={feed}
            grapevine={this.props.grapevine}
            groups={this.state.groups}
            key={`feed-${feed.id}`}
            onClickCallback={this.props.onClickCallback}
          />;
        })}
      </div>
    );
  }

  private async getFeeds(): Promise<void> {
    let feeds: RssFeed[];
    if (isNull(this.props.groupId)) {
      feeds = await this.props.grapevine.getAllFeeds();
    } else {
      feeds = await this.props.grapevine.getFeedsForGroup(this.props.groupId!);
    }
    this.setState({feeds});
    return;
  }

  private async getGroups(): Promise<void> {
    const groups = await this.props.grapevine.getAllGroupsList();
    groups.sort(sortGroupsCompare);
    this.setState({groups});
    return;
  }

  private sortCompare(a: RssFeed, b: RssFeed): number {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  }
}
