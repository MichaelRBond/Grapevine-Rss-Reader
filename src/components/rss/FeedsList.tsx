import { GrapevineClient, RssFeed } from "external-clients/grapevine";
import { isNull, Nullable } from "nullable-ts";
import * as React from "react";
import { FeedLink } from "./FeedLink";

interface Props {
  groupId: Nullable<number>;
  grapevine: GrapevineClient;
  onClickCallback: (id: number) => void;
}

interface State {
  feeds: Nullable<RssFeed[]>;
}

export class FeedsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      feeds: [],
    };

    this.getFeeds = this.getFeeds.bind(this);
  }

  public componentDidUpdate(prevProps: Props): void {
     this.getFeeds();
  }

  public render() {
    if (isNull(this.props.groupId) || isNull(this.state.feeds)) {
      return null;
    }
    return (
      <div>
        {this.state.feeds!.map((feed) => {
          return <FeedLink
            feed={feed}
            onClickCallback={this.props.onClickCallback}
            key={`feed-${feed.id}`}
          />;
        })}
      </div>
    );
  }

  private async getFeeds(): Promise<void> {
    if (isNull(this.props.groupId)) {
      return;
    }
    const feeds = await this.props.grapevine.getFeedsForGroup(this.props.groupId!);
    this.setState({feeds});
    return;
  }
}
