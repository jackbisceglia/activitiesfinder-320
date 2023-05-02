import { ParsedUrlQuery } from "querystring";

export const preferenceObjectToString = (
  preferenceRecord: Record<string, string> | ParsedUrlQuery
) => {
  console.log(preferenceRecord);
  if (!preferenceRecord) return "";

  const prefsParsedForUrl = Object.entries(preferenceRecord)
    .map(([cat, pref]) => `${cat}=${pref}`)
    .join("&");

  if (!prefsParsedForUrl) return "";

  return "?" + prefsParsedForUrl;
};
