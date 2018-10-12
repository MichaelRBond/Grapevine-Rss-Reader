import { Button, ButtonGroup, Collapse } from "@blueprintjs/core";
import { RssItem } from "external-clients/grapevine";
import * as React from "react";

interface Props {
  item: RssItem;
}

interface State {
  expanded: boolean;
}

export class Item extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.expand = this.expand.bind(this);
  }

  public render() {
    // document
    // saved
    return (
      <div>
        <div>
          <p
            onClick={this.expand}
            style={{display: "inline-block"}}
          >{this.props.item.title}</p>
          <ButtonGroup minimal={true}>
            <Button icon="document" />
            <Button icon="share" />
            <Button icon="star-empty" />
          </ButtonGroup>
        </div>
        <Collapse isOpen={this.state.expanded}>
          {this.props.item.description && <div dangerouslySetInnerHTML={{__html: this.props.item.description}}></div>}
        </Collapse>
      </div>
    );
  }

  private expand(): void {
    this.setState({expanded: !this.state.expanded});
  }
}
