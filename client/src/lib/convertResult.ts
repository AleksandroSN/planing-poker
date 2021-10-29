import { Issue } from "../features/Socket/types";
import { ResultState } from "../redux/ResultReducer/reducer";

type ConvertResult = {
  issueTitle: string;
  cardValue: string;
  resultPercent: string;
}[];

export const convertResult = (
  results: ResultState,
  issues: Issue[]
): ConvertResult => {
  const convResult: ConvertResult = [];
  Object.keys(results).forEach((currentIssue) => {
    const currentResult = results[currentIssue].results;
    const issueIndex = issues.findIndex((issue) => issue.id === currentIssue);
    const issueObj = issues[issueIndex];
    Object.keys(currentResult).forEach((cardValueKey) => {
      const resultElement = {
        issueTitle: issueObj.title,
        cardValue: cardValueKey,
        resultPercent: `${currentResult[cardValueKey]}`,
      };
      convResult.push(resultElement);
    });
  });
  return convResult;
};
