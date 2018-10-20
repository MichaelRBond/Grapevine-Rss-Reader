import { Button, NonIdealState } from "@blueprintjs/core";
import { GrapevineClient, RssItem, RssItemFlags } from "external-clients/grapevine";
import { isNull, Nullable } from "nullable-ts";
import * as React from "react";
import { Logger } from "utils/logger";
import { Item } from "./Item";

interface Props {
  grapevine: GrapevineClient;
  feedId: Nullable<number>;
}

interface State {
  getStarredOnly: boolean;
  getUnreadOnly: boolean;
  items: Nullable<RssItem[]>;
  sortOrder: "desc" | "asc";
}

export class ItemsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      getStarredOnly: false,
      getUnreadOnly: true,
      items: [],
      sortOrder: "desc",
    };

    this.getItems = this.getItems.bind(this);
    this.changeSortOrder = this.getItems.bind(this);
    this.sortCompare = this.sortCompare.bind(this);
    this.changeGetUnreadOnly = this.changeGetUnreadOnly.bind(this);
    this.markAllRead = this.markAllRead.bind(this);
    this.changeGetStarredOnly = this.changeGetStarredOnly.bind(this);
  }

  public componentDidUpdate(prevProps: Props, prevState: State): void {
    // TODO : Clean up conditionals
    if (this.props.feedId !== prevProps.feedId) {
      this.getItems();
    }
    if (this.state.getUnreadOnly !== prevState.getUnreadOnly) {
      this.getItems();
    }
    if (this.state.getStarredOnly !== prevState.getStarredOnly) {
      this.getItems();
    }
  }

  public render() {
    if (isNull(this.state.items)) {
      return null;
    }

    const unreadLabel = this.state.getUnreadOnly ? "Display All" : "Display Unread Only";
    const starredIcon = this.state.getStarredOnly ? "star-empty" : "star";

    return (
      <div id="items-container">
        <div id="items-container-control-bar">
          <Button icon="sort-asc" text="Sort" onClick={this.changeSortOrder} className="item-container-button" />
          <Button text={unreadLabel} onClick={this.changeGetUnreadOnly} className="item-container-button" />
          <Button icon={starredIcon} onClick={this.changeGetStarredOnly} className="item-container-button" />
          <Button text="Mark All Read" onClick={this.markAllRead} className="item-container-button" />
        </div>
        {this.state.items!.length > 0 && this.state.items!.sort(this.sortCompare).map((item) => {
          return <Item
            grapevine={this.props.grapevine}
            item={item}
            key={`item-${item.id}`}
          />;
        })}
        {this.state.items!.length === 0 &&
          <NonIdealState icon="multi-select" description="No feed selected"></NonIdealState>
        }
      </div>
    );
  }

  private changeSortOrder(): void {
    Logger.debug("Toggle `sortOrder`");
    if (this.state.sortOrder === "desc") {
      this.setState({sortOrder: "asc"});
    } else {
      this.setState({sortOrder: "desc"});
    }
    return;
  }

  private changeGetUnreadOnly(): void {
    Logger.debug("Toggle `getUnreadOnly`");
    if (this.state.getUnreadOnly) {
      this.setState({getUnreadOnly: false});
    } else {
      this.setState({getUnreadOnly: true});
    }
    return;
  }

  private changeGetStarredOnly(): void {
    Logger.debug("Toggle `getStarredOnly`");
    if (this.state.getStarredOnly) {
      this.setState({getStarredOnly: false});
    } else {
      this.setState({getStarredOnly: true});
    }
  }

  private async getItems(): Promise<void> {
    if (isNull(this.props.feedId)) {
      return;
    }

    const statusFlags: RssItemFlags[] = [];
    if (this.state.getUnreadOnly) {
      statusFlags.push(RssItemFlags.unread);
    }
    if (this.state.getStarredOnly) {
      statusFlags.push(RssItemFlags.starred);
    }

    const items = await this.props.grapevine.getItemsForFeed(this.props.feedId!, statusFlags);
    this.setState({items});
    return;
  }

  private sortCompare(a: RssItem, b: RssItem): number {
    if (this.state.sortOrder === "asc") {
      return a.published.unix() - b.published.unix();
    }
    return b.published.unix() - a.published.unix();
  }

  private async markAllRead(): Promise<void> {
    if (isNull(this.state.items)) {
      return;
    }

    const updatePromises = this.state.items!.map((item) => {
      return this.props.grapevine.setItemStatus(item.id, RssItemFlags.read);
    });
    await Promise.all(updatePromises);
    await this.getItems();
  }
}
