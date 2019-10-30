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
  name: string;
}

export class AddGroup extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
    };

    this.submit = this.submit.bind(this);
  }

  public render() {

    return (
      <ReactModal
        isOpen={this.props.isOpen}
      >
          <p>Add Group</p>
          <FormGroup
              label="Group Name"
              labelFor="group-name"
              labelInfo="(required)"
            >
              <InputGroup
                placeholder=""
                type="text"
                name="group-name"
                id="group-name"
                onChange={(e: any) => this.setState({name: e.target.value })}
                />
            </FormGroup>
          <Button onClick={this.props.close}>Cancel</Button>
          <Button onClick={this.submit}>Add Group</Button>
      </ReactModal>
    );
  }

  private async submit(): Promise<void> {
    if (isBlank(this.state.name)) {
      // TODO: display error message here
      return;
    }
    const result = await this.props.grapevine.addGroup(this.state.name);
    if (result !== true) {
      // TODO: Display error message here
    }
    this.props.close();
    return;
  }
}
