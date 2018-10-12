import { Button } from "@blueprintjs/core";
import { RssFeed } from "external-clients/grapevine";
import * as React from "react";

interface Props {
  feed: RssFeed;
  onClickCallback: (id: number) => void;
}

export class FeedLink extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return <Button
        icon="document"
        minimal={true}
        text={this.props.feed.title}
        style={{display: "block"}}
        onClick={(e) => this.props.onClickCallback(this.props.feed.id)}
      />;
  }
}
