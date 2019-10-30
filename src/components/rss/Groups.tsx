import { GrapevineClient, RssGroupResponse } from "grapevine-rss-client-javascript";
import { isNull, Nullable } from "nullable-ts";
import * as React from "react";
import { sortGroupsCompare } from "../../utils/helpers";
import { GroupLink } from "./GroupLink";

interface Props {
  grapevine: GrapevineClient;
  onClickCallback: (id: number) => void;
}

interface State {
  groups: Nullable<RssGroupResponse[]>;
}

export class GroupsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      groups: [],
    };

    this.getGroups = this.getGroups.bind(this);
  }

  public componentDidMount(): void {
     this.getGroups();
  }

  public render() {
    if (isNull(this.state.groups)) {
      return null;
    }
    return (
      <div id="groups-container">
        {this.state.groups!.map((group) => {
          return <GroupLink
            group={group}
            onClickCallback={this.props.onClickCallback}
            key={`group-${group.id}`}
          />;
        })}
      </div>
    );
  }

  private async getGroups(): Promise<void> {
    const groups = await this.props.grapevine.getAllGroupsList();
    groups.sort(sortGroupsCompare);
    this.setState({groups});
    return;
  }
}
