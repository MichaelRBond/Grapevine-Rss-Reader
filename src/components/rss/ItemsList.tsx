import { GrapevineClient, RssItem } from "external-clients/grapevine";
import { isNull, Nullable } from "nullable-ts";
import * as React from "react";
import { Item } from "./Item";

interface Props {
  grapevine: GrapevineClient;
  feedId: Nullable<number>;
}

interface State {
  items: Nullable<RssItem[]>;
}

export class ItemsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      items: [],
    };

    this.getItems = this.getItems.bind(this);
  }

  public componentDidUpdate(): void {
    this.getItems();
  }

  public render() {
    if (isNull(this.state.items)) {
      return null;
    }
    return (
      <div>
        {this.state.items!.map((item) => {
          return <Item
            item={item}
            key={`item-${item.id}`}
          />;
        })}
      </div>
    );
  }

  private async getItems(): Promise<void> {
    if (isNull(this.props.feedId)) {
      return;
    }
    const items = await this.props.grapevine.getItemsForFeed(this.props.feedId!);
    this.setState({items});
    return;
  }
}
