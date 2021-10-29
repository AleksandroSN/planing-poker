import { Issue } from "../features/Socket/types";

export const issuesArrToStr = (arr: Issue[]): string => {
  const arrStr = arr.map((el) => el.title);
  if (arrStr.length === 0) return arrStr.concat("...").join("");
  if (arrStr.length > 3) {
    return arrStr.slice(0, 3).concat("...").join(",");
  }
  return arrStr.join(",");
};
