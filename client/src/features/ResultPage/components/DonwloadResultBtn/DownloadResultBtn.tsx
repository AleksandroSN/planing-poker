import { FunctionComponent, useEffect, useState } from "react";
import { CSVDownloader } from "react-papaparse";
import { convertResult } from "../../../../lib";
import {
  IssuesRedux,
  ResultRedux,
  useAppSelector,
} from "../../../../redux/store";

type ConvertResult = {
  issueTitle: string;
  cardValue: string;
  resultPercent: string;
}[];

export const DownloadResultBtn: FunctionComponent = (): JSX.Element => {
  const result = useAppSelector(ResultRedux);
  const { issues } = useAppSelector(IssuesRedux);
  const [resultData, setResultData] = useState<ConvertResult>();
  useEffect(() => {
    const data = convertResult(result, issues);
    setResultData(data);
  }, [issues]);
  return (
    <CSVDownloader
      data={resultData}
      type="button"
      filename="result"
      className="button-start"
    >
      Download
    </CSVDownloader>
  );
};
