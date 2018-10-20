import { Button, ButtonGroup, Collapse, Icon } from "@blueprintjs/core";
import { GrapevineClient, RssItem, RssItemFlags } from "external-clients/grapevine";
import * as React from "react";

declare var window: any;

interface Props {
  grapevine: GrapevineClient;
  item: RssItem;
}

interface State {
  expanded: boolean;
  read: boolean;
  starred: boolean;
}

export class Item extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false,
      read: this.props.item.read,
      starred: this.props.item.starred,
    };

    this.expand = this.expand.bind(this);
    this.toggleStarredStatus = this.toggleStarredStatus.bind(this);
    this.toggleReadStatus = this.toggleReadStatus.bind(this);
  }

  public render() {
    const item = this.props.item;
    const starIcon = this.state.starred ? "star" : "star-empty";
    const readDocument = this.state.read ? "saved" : "document";

    return (
      <div className="rss-item">
        <div className="rss-item-header">
          <p
            className="rss-item-title"
            onClick={this.expand}
          ><Icon icon="expand-all" />{item.title}</p>
          <div className="rss-item-toolbar">
            <p className="rss-item-date">{item.published.toString()}</p>
            <ButtonGroup minimal={true} className="rss-item-tools">
              <Button icon={readDocument} onClick={this.toggleReadStatus} />
              <Button icon="share" onClick={() => window.open(item.link)}/>
              <Button icon={starIcon} onClick={this.toggleStarredStatus} />
            </ButtonGroup>
          </div>
        </div>
        <Collapse isOpen={this.state.expanded}>
          {item.description &&
            <div className="rss-item-text" dangerouslySetInnerHTML={{__html: item.description}}></div>
          }
        </Collapse>
      </div>
    );
  }

  private expand(): void {
    this.setState({expanded: !this.state.expanded});
    if (this.state.read === false) {
      this.setState({read: true});
      this.props.grapevine.setItemStatus(this.props.item.id, RssItemFlags.read);
    }
  }

  private toggleStarredStatus(): void {
    const status = this.state.starred ? RssItemFlags.unstarred : RssItemFlags.starred;
    this.props.grapevine.setItemStatus(this.props.item.id, status);
    this.setState({starred: status === RssItemFlags.starred ? true : false});
    return;
  }

  private toggleReadStatus(): void {
    const status = this.state.read ? RssItemFlags.unread : RssItemFlags.read;
    this.props.grapevine.setItemStatus(this.props.item.id, status);
    this.setState({read: status === RssItemFlags.read ? true : false});
  }
}
