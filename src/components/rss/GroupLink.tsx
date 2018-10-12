import { Button } from "@blueprintjs/core";
import { GroupListResponse } from "external-clients/grapevine";
import * as React from "react";

interface Props {
  group: GroupListResponse;
  onClickCallback: (id: number) => void;
}

export class GroupLink extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return <Button
        icon="folder-close"
        minimal={true}
        text={this.props.group.name}
        style={{display: "block"}}
        onClick={(e) => this.props.onClickCallback(this.props.group.id)}
      />;
  }
}
