import { Button } from "@blueprintjs/core";
import { GrapevineClient, RssFeed } from "external-clients/grapevine";
import * as React from "react";
import * as ReactModal from "react-modal";

interface Props {
  feed: RssFeed;
  grapevine: GrapevineClient;
  isOpen: boolean;
  close: () => void;
}

export class DeleteFeedConfirmation extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  public render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
      >
        <p>Delete Feed</p>

        <div className="delete-confirmation">
          Are you sure you want to delete the feed? This cannot be undone.
        </div>

        <Button onClick={this.props.close}>Cancel</Button>
        <Button onClick={this.submit}>Delete Feed</Button>
      </ReactModal>
    );
  }

  private async submit(): Promise<void> {
    await this.props.grapevine.deleteFeed(this.props.feed.id);
    this.props.close();
    return;
  }
}
