import * as moment from "moment-timezone";
import config from "../config/index";
import { HttpClient, HttpRequestConfig } from "../utils/http";
import { Logger } from "../utils/logger";

interface VerifyAuthenticationResponse {
  verification: boolean;
}

export interface GroupListResponse {
  id: number;
  name: string;
}

interface RssFeedApiResponse {
  added_on: number;
  id: number;
  last_updated: number;
  title: string;
  url: string;
}

export interface RssFeed {
  addedOn: number;
  id: number;
  lastUpdated: number;
  title: string;
  url: string;
}

export interface RssItemImage {
  title?: string;
  url?: string;
}

interface RssItemApiResponse {
  author?: string;
  categories?: string[];
  comments?: string;
  description?: string;
  enclosures?: string[];
  feed_id: number;
  guid: string;
  id: number;
  image?: RssItemImage;
  link?: string;
  published: string; // Joi.date(),
  read: boolean;
  starred: boolean;
  summary?: string;
  title?: string;
  updated: string; // Joi.date(),
}

export interface RssItem {
  author?: string;
  categories?: string[];
  comments?: string;
  description?: string;
  enclosures?: string[];
  feedId: number;
  guid: string;
  id: number;
  image?: RssItemImage;
  link?: string;
  published: moment.Moment;
  read: boolean;
  starred: boolean;
  summary?: string;
  title?: string;
  updated: moment.Moment;
}

export enum RssItemFlags {
  "unread" = "unread",
  "read" = "read",
  "starred" = "starred",
  "unstarred" = "unstarred",
}

interface RssItemFlagPayload {
  flag: RssItemFlags;
}

interface GrapevineStringResponse {
  message: string;
}

export class GrapevineClient {

  private static AUTH_URL = "/api/v1/account/verify";
  private static LIST_GROUPS_URL = "/api/v1/group";
  private static FEEDS_IN_GROUP_URL = "/api/v1/group/{id}/feeds";
  private static ITEMS_URL = "/api/v1/items/feed/{id}{flags}";
  private static ITEMS_STATUS_URL = "/api/v1/item/{id}/status";

  private username: string;
  private password: string;

  constructor(
    private httpClient: HttpClient,
    private endpoint: string = config.grapevineHost,
  ) { /* */ }

  public async authenticate(username: string, password: string): Promise<boolean> {
    const url = `${this.endpoint}${GrapevineClient.AUTH_URL}`;
    const requestParams: HttpRequestConfig = {
      password,
      url,
      username,
    };
    const response = await this.httpClient.get<VerifyAuthenticationResponse>(requestParams);
    if (response.status === 200 && response.data.verification === true) {
      this.initializeCredentials(username, password);
      return true;
    }
    return false;
  }

  public async getAllGroupsList(): Promise<GroupListResponse[]> {
    const url = `${this.endpoint}${GrapevineClient.LIST_GROUPS_URL}`;
    const requestParams = this.getRequestParams(url);
    const response = await this.httpClient.get<GroupListResponse[]>(requestParams);
    if (response.status !== 200) {
      return [];
    }
    return response.data;
  }

  public async getFeedsForGroup(groupId: number): Promise<RssFeed[]> {
    let url = `${this.endpoint}${GrapevineClient.FEEDS_IN_GROUP_URL}`;
    url = url.replace(/\{id\}/, groupId.toString());
    const requestParams = this.getRequestParams(url);
    const response = await this.httpClient.get<{feeds: RssFeedApiResponse[]}>(requestParams);
    if (response.status !== 200) {
      return [];
    }
    return response.data.feeds.map(this.convertToRssFeed);
  }

  public async getItemsForFeed(feedId: number, flags: RssItemFlags[] = []): Promise<RssItem[]> {
    const flagsString = flags.length > 0 ? `/${flags.join("/")}` : "";
    let url = `${this.endpoint}${GrapevineClient.ITEMS_URL}`;
    url = url.replace(/\{id\}/, feedId.toString());
    url = url.replace(/\{flags\}/, flagsString);

    const requestParams = this.getRequestParams(url);
    const response = await this.httpClient.get<RssItemApiResponse[]>(requestParams);

    if (response.status !== 200) {
      return [];
    }

    return response.data.map(this.convertToRssItem);
  }

  public async setItemStatus(itemId: number, status: RssItemFlags): Promise<void> {
    let url = `${this.endpoint}${GrapevineClient.ITEMS_STATUS_URL}`;
    url = url.replace(/\{id\}/, itemId.toString());
    const requestParams = this.getRequestParams(url);
    const data: RssItemFlagPayload = {flag: status};
    const response = await this.httpClient.post<RssItemFlagPayload, GrapevineStringResponse>(url, data, requestParams);

    if (response.status !== 200) {
      Logger.error(`Unable to set item status, status code=${response.status}`);
    }

    return;
  }

  private initializeCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
    return;
  }

  private convertToRssFeed(feedApi: RssFeedApiResponse): RssFeed {
    return {
      addedOn: feedApi.added_on,
      id: feedApi.id,
      lastUpdated: feedApi.last_updated,
      title: feedApi.title,
      url: feedApi.url,
    };
  }

  private convertToRssItem(itemApi: RssItemApiResponse): RssItem {
    return {
      author: itemApi.author || undefined,
      categories: itemApi.categories || undefined,
      comments: itemApi.comments || undefined,
      description: itemApi.description || undefined,
      enclosures: itemApi.enclosures || undefined,
      feedId: itemApi.feed_id,
      guid: itemApi.guid,
      id: itemApi.id,
      image: itemApi.image || undefined,
      link: itemApi.link || undefined,
      published: moment(itemApi.published),
      read: itemApi.read,
      starred: itemApi.starred,
      summary: itemApi.summary || undefined,
      title: itemApi.title || undefined,
      updated: moment(itemApi.updated),
    };
  }

  private getRequestParams(url: string): HttpRequestConfig {
    return {
      password: this.password,
      url,
      username: this.username,
    };
  }

}
