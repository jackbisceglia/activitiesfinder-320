import { ParsedUrlQuery } from "querystring";

// export const preferenceObjectToString = (
//   preferenceRecord: Record<string, string> | ParsedUrlQuery
// ) => {
//   if (!preferenceRecord) return "";

//   //   console.log("getting here");
//   //   console.log(
//   //     "obj entries: ",
//   //     Object.entries(preferenceRecord)
//   //       .map(([cat, pref]) => `${cat}=${pref}`)
//   //       .join("&")
//   //   );

//   return Object.entries(preferenceRecord)
//     .map(([cat, pref]) => `${cat}=${pref}`)
//     .join("&");
// };

export const preferenceObjectToString = (
  preferenceRecord: Record<string, string[] | string> | ParsedUrlQuery
) => {
  if (!preferenceRecord) return "";

  return Object.entries(preferenceRecord)
    .flatMap(([cat, prefs]) => {
      if (Array.isArray(prefs)) {
        return prefs.map((pref) => `${cat}=${pref}`);
      } else {
        return [`${cat}=${prefs}`];
      }
    })
    .join("&");
};
