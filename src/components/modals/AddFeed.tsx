import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { GrapevineClient } from "grapevine-rss-client-javascript";
import * as React from "react";
import * as ReactModal from "react-modal";
import { isBlank } from "utils/helpers";

interface Props {
  grapevine: GrapevineClient;
  isOpen: boolean;
  close: () => void;
}

interface State {
  title: string;
  url: string;
}

export class AddFeed extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      title: "",
      url: "",
    };

    this.submit = this.submit.bind(this);
  }

  public render() {

    return (
      <ReactModal
        isOpen={this.props.isOpen}
      >
          <p>Add Feed</p>
          <FormGroup
              label="Feed Title"
              labelFor="feed-title"
              labelInfo="(required)"
            >
              <InputGroup
                placeholder=""
                type="text"
                name="feed-title"
                id="feed-title"
                onChange={(e: any) => this.setState({title: e.target.value })}
                />
            </FormGroup>
            <FormGroup
              label="Feed URL"
              labelFor="feed-url"
              labelInfo="(required)"
            >
              <InputGroup
                placeholder=""
                type="text"
                name="feed-url"
                id="feed-url"
                onChange={(e: any) => this.setState({url: e.target.value })}
                />
            </FormGroup>
          <Button onClick={this.props.close}>Cancel</Button>
          <Button onClick={this.submit}>Add Feed</Button>
      </ReactModal>
    );
  }

  private async submit(): Promise<void> {
    if (isBlank(this.state.title) || isBlank(this.state.url)) {
      // TODO: Display Error message here
      return;
    }
    const result = await this.props.grapevine.addFeed(this.state.title, this.state.url);
    if (result !== true) {
      // TODO: Display Error message here
    }
    this.props.close();
  }
}
