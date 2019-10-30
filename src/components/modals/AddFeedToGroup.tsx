import { Button, MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer, MultiSelect } from "@blueprintjs/select";
import { GrapevineClient, RssFeed, RssGroupResponse } from "grapevine-rss-client-javascript";
import * as React from "react";
import * as ReactModal from "react-modal";
import { arrayDiff } from "utils/helpers";

const GroupSelect = MultiSelect.ofType<RssGroupResponse>();

interface Props {
  feed: RssFeed;
  grapevine: GrapevineClient;
  groups: RssGroupResponse[];
  isOpen: boolean;
  close: () => void;
}

interface State {
  originalGroups: RssGroupResponse[];
  currentGroups: RssGroupResponse[];
}

export class AddFeedToGroup extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      currentGroups: [],
      originalGroups: [],
    };

    this.submit = this.submit.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.determineRemovedGroupIds = this.determineRemovedGroupIds.bind(this);
    this.determineAddedGroupIds = this.determineAddedGroupIds.bind(this);
    this.getGroupsForFeed = this.getGroupsForFeed.bind(this);
    this.isGroupSelected = this.isGroupSelected.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getSelectedGroupIndex = this.getSelectedGroupIndex.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    await this.getGroupsForFeed();
    return this.setState({currentGroups: this.state.originalGroups});
  }

  public render() {

    const clearButton = this.state.currentGroups.length > 0 ?
      <Button icon="cross" minimal={true} onClick={this.handleClear} /> : undefined;

    const filterGroups: ItemPredicate<RssGroupResponse> = (query, group) => {
        return `${group.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
    };

    return (
      <ReactModal
        isOpen={this.props.isOpen}
      >
          <p>Add Feed to Group</p>

          <div className="group-selector">
            <GroupSelect
              items={this.props.groups}
              itemPredicate={filterGroups}
              itemRenderer={this.renderItem}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={this.onItemSelect}
              popoverProps={{ minimal: true }}
              selectedItems={this.state.currentGroups}
              tagInputProps={{ onRemove: this.handleTagRemove, rightElement: clearButton }}
              tagRenderer={this.renderOptionTag}
            />
          </div>

          <Button onClick={this.props.close}>Cancel</Button>
          <Button onClick={this.submit}>Add Feed to Group</Button>
      </ReactModal>
    );
  }

  private handleClear(): void {
    return this.setState({currentGroups: []});
  }

  private renderItem: ItemRenderer<RssGroupResponse> = (group,  { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (<MenuItem
      icon={this.isGroupSelected(group) ? "tick" : "blank"}
      key={group.id}
      text={group.name}
      onClick={handleClick}
    />);
  }

  private getSelectedGroupIndex(group: RssGroupResponse): number {
    const groupIds = this.state.currentGroups.map((g) => g.id);
    return groupIds.indexOf(group.id);
  }

  private isGroupSelected(group: RssGroupResponse): boolean {
    return this.getSelectedGroupIndex(group) !== -1;
  }

  private renderOptionTag(group: RssGroupResponse): string {
    return group.name;
  }

  private onItemSelect(group: RssGroupResponse): void {
    const groupIndex = this.getSelectedGroupIndex(group);
    if (groupIndex === -1) {
      this.setState({currentGroups: [...this.state.currentGroups, group]});
    } else {
      const updatedGroups = this.state.currentGroups.filter((g) => g.id !== group.id);
      this.setState({currentGroups: updatedGroups});
    }
    return;
  }

  private handleTagRemove(tag: string, index: number): void {
    const currentGroups = this.state.currentGroups.filter((g, i) => i !== index);
    this.setState({currentGroups});
    return;
  }

  private async submit(): Promise<void> {
    const groupIdsToAdd = this.determineAddedGroupIds();
    const groupIdsToRemove = this.determineRemovedGroupIds();
    const addPromises = groupIdsToAdd.map((id) => {
      return this.props.grapevine.addFeedToGroup(this.props.feed.id, id);
    });
    const removePromises = groupIdsToRemove.map((id) => {
      return this.props.grapevine.removeFeedFromGroup(this.props.feed.id, id);
    });

    await Promise.all(addPromises);
    await Promise.all(removePromises);

    this.props.close();
    return;
  }

  private async getGroupsForFeed(): Promise<void> {
    const originalGroups = await this.props.grapevine.getGroupsForFeed(this.props.feed.id);
    this.setState({originalGroups});
    return;
  }

  private getGroupIdsfromGroups(groups: RssGroupResponse[]): number[] {
    return groups.map((group) => {
      return group.id;
    });
  }

  private determineAddedGroupIds(): number[] {
    return arrayDiff(this.getGroupIdsfromGroups(this.state.currentGroups),
      this.getGroupIdsfromGroups(this.state.originalGroups));
  }

  private determineRemovedGroupIds(): number[] {
    return arrayDiff(this.getGroupIdsfromGroups(this.state.originalGroups),
      this.getGroupIdsfromGroups(this.state.currentGroups));
  }
}
