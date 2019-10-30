import { RssGroupResponse } from "grapevine-rss-client-javascript";
import { isNullOrUndefined } from "nullable-ts";

export function isBlank(str: string): boolean {
  return isNullOrUndefined(str) || str === "" || /^\s*$/.test(str);
}

export function isNotBlank(str: string): boolean {
  return !isBlank(str);
}

export function arrayDiff(array1: any[], array2: any[]) {
  return array1.filter((i) => array2.indexOf(i) < 0);
}

export function sortGroupsCompare(a: RssGroupResponse, b: RssGroupResponse): number {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
}
